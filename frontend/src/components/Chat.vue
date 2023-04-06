<script setup>
import Borders from './Borders.vue'
</script>

<script>

let id = 0

export default {
    data() {
        return {
            text: '',
            msg: [],
        }
    },
    methods: {
      send_msg() {
          this.msg.push({ id: id++, text: this.text }),
          this.text = ''
      },
    }
}
</script>


<template>
      <Borders/>
      <div className="main_div">
        <div className="chat_div_test">
            <div className="chat_top_test">
                <div className="logo_chat_profile_test">
                    <font-awesome-icon icon="fa-regular fa-circle-user" />
                </div>
                <h1 className="chat_name">Nom du User ou du Channel</h1>
            </div>
            <div className="chat_bottom_test">
                <div className="logo_chat_test">
                    <font-awesome-icon icon="fa-regular fa-face-laugh-beam" />
                </div>
                <div className="type_msg">
                    <form @submit.prevent="send_msg" className="type_msg_test">
                        <input className="type_msg_test" v-model="text" placeholder='Type a message ...'>
                    </form>
                </div>
                <!-- <input className="type_msg_test" v-model="text" placeholder='Type a message ...'> -->
            </div>
            <div className="chat_msg_div">
                <!-- <div className="msg_me"> -->
                    <ul>
                        <li v-for="chat in msg" :key="chat.id" className="msg">
                        <h1 className="msg_test">{{ chat.text }}</h1>
                        </li>
                    </ul>
                <!-- </div> -->
                <!-- <div className="msg_other"></div> -->
            </div>
        </div>
      </div>
  </template>













<!-- <script setup>
    import { Chat } from "@chat-ui/vue3";
    function handleMessage(message){
        console.log(message)
    }
</script>
<template>
    <Chat :chat="[]" :onSend="handleMessage" />
</template> -->
<!-- https://vuejsexamples.com/fully-customizable-chat-ui-for-different-frameworks/ -->
