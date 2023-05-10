<script setup lang="ts">
import Borders from './Borders.vue'
import { accountService } from '@/_services';
import io from "socket.io-client"
import { RoomChannelDto }  from '@/_services/room.channel.dto'
</script>

<script lang="ts">

let id = 0
let $socket_chat = io('ws://localhost:3000/chat',
{ 
    transports: ["websocket"],
    forceNew: true,
    upgrade: false,
}
);

export type message_type = {
    id: number,
    text: string,
    username: string,
    socketid: string
}

export default {
    props: ['idchannel'],
    data() {
        let room: string = ''
        return {
            text: '',
            text_test: '',
            msg: [] as message_type[],
            my_username: '',
            room: room,
        }
    },
    methods: {
      check_username(username: string) {
        return (username == this.my_username)
      },
      check_invite(text: string) {
        return (text == 'invite')
      },
      send_msg() {
        
        
        
        //////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////
        // let dto: RoomChannelDto = { name: this.idchannel, users: [ this.my_username ] }
        // accountService.editChannel(dto) 
        //     .then(res => {
        //         console.log(res)
        //     })
        //     .catch(err => console.log(err))
        //////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////






        if (this.validateInput(this.text)) {
              const message = {
                  id: id++,
                  text: this.text,
                  username: this.my_username,
                  socketid: $socket_chat.id,
                  room: 'room_channel'
              }
              $socket_chat.emit('msgToServer', this.room, message)
              this.text = ''
        }
      },
      send_msg_test() {
        if (this.validateInput(this.text_test)) {
              this.my_username = this.text_test,
              this.text_test = ''
        }
      },
      receivedMessage(message: message_type) {
          this.msg.push(message)
      },
      validateInput(text: string) {
          return text.length > 0
      }
    },
    created() {
        let dto: RoomChannelDto = { name: this.idchannel, users: ['elisa'] }
        accountService.findRoomChannel(dto) 
            .then(res => {
                console.log('ca marcheeeee')
                console.log(res.data.name)
                this.room = res.data.name
                console.log('room = ', this.room)


                $socket_chat.on('msgToClient', (message: message_type) => {
                    console.log(message)
                    console.log($socket_chat.id)
                    console.log(message.socketid)
                    this.receivedMessage(message)
                })
                console.log(this.room)
                $socket_chat.emit('joinRoomChat', this.room)
            })
            .catch(err => console.log(err))
    }
}
</script>

<template>
      <Borders/>
      <div className="main_div">
        <div className="chat_div_test">
            <div className="chat_top_test">
                <div className="logo_chat_profile_test">
                    <font-awesome-icon icon="fa-solid fa-users" />
                </div>
                <RouterLink :to="'/infos/' + idchannel" className="chat_name">{{ idchannel }}</RouterLink>
            </div>
            <div className="chat_bottom_test">
                <div className="logo_chat_test">
                    <font-awesome-icon icon="fa-regular fa-face-laugh-beam" />
                </div>
                <div className="type_msg">
                    <form @submit.prevent="send_msg" className="type_msg_test">
                        <input className="type_msg_test" v-model="text" placeholder='Type a message ...'>
                    </form>
                    <form @submit.prevent="send_msg_test" className="type_msg_test">
                        <input className="type_msg_test" v-model="text_test" placeholder='name'>
                    </form>
                </div>
            </div>
            <div className="chat_msg_div">
                <li v-for="chat in msg" :key="chat.id" className="msg_form">
                    <div v-if="check_username(chat.username)" className="test_msg">
                        <RouterLink to="/pong" v-if="check_invite(chat.text)">play</RouterLink>
                        <h4 v-else>{{ chat.text }}</h4>
                    </div>
                    <div v-else className="msg_user_test">
                        <RouterLink to="/pong" v-if="check_invite(chat.text)" className="msg_user_testt">play</RouterLink>
                        <h4 v-else className="msg_user_testt">{{ chat.text }}</h4>
                        <p className="username_msg">{{ chat.username }}</p>
                    </div>
                </li>
            </div>
        </div>
      </div>
  </template>


