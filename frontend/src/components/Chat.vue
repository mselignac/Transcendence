<script setup>
import Borders from './Borders.vue'
</script>

<script>

let id = 0

export default {
    props: ['id'],
    data() {
        return {
            text: '',
            text_test: '',
            msg: [],
            msg_test: [],
        }
    },
    methods: {
      send_msg() {
        if (this.validateInput(this.text)) {
          this.msg.push({ id: id++, text: this.text, me: true, username: 'me' }),
          this.text = ''
        }
      },
      send_msg_test() {
        if (this.validateInput(this.text_test)) {
          this.msg.push({ id: id++, text: this.text_test, me: false, username: 'user' }),
          this.text_test = ''
        }
      },
      validateInput(text) {
        return text.length > 0
      }
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
                <h1 className="chat_name">{{ this.id }}</h1>
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
                        <input className="type_msg_test" v-model="text_test" placeholder='reponse'>
                    </form>
                </div>
            </div>
            <div className="chat_msg_div">
                <li v-for="chat in msg" :key="chat.id" className="msg_form">
                    <div v-if="chat.me" className="test_msg">
                        <h4>{{ chat.text }}</h4>
                    </div>
                    <div v-else className="msg_user_test">
                        <h4 className="msg_user_testt">{{ chat.text }}</h4>
                        <p className="username_msg">{{ chat.username }}</p>
                    </div>
                </li>
            </div>
        </div>
      </div>
  </template>
