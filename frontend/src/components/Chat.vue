<script setup>
import Borders from './Borders.vue'
</script>

<script>

let id = 0

export default {
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
          this.msg.push({ id: id++, text: this.text, me: true, username: 'me' }),
          this.text = ''
      },
      send_msg_test() {
          this.msg.push({ id: id++, text: this.text_test, me: false, username: 'user' }),
          this.text_test = ''
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
                    <form @submit.prevent="send_msg_test" className="type_msg_test">
                        <input className="type_msg_test" v-model="text_test" placeholder='reponse'>
                    </form>
                </div>
                <!-- <input className="type_msg_test" v-model="text" placeholder='Type a message ...'> -->
            </div>
            <!-- <div className="chat_msg_div">
                <li v-for="chat in msg" :key="chat.id" className="msg_form">
                    <h1 v-if="chat.me" className="test_msg">{{ chat.text }}</h1>
                    <h1 v-else className="msg_user_test">{{ chat.text }}</h1>
                </li>
            </div> -->
            <div className="chat_msg_div">
                <li v-for="chat in msg" :key="chat.id" className="msg_form">
                    <div v-if="chat.me" className="test_msg">
                        <!-- <p className="username_msg">me</p> -->
                        <h4>{{ chat.text }}</h4>
                    </div>
                    <div v-else className="msg_user_test">
                        <h4>{{ chat.text }}</h4>
                        <p className="username_msg">{{ chat.username }}</p>
                    </div>
                </li>
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















































<!-- 


<!DOCTYPE html>
<html>
<head>
  <title>Fireside Chat</title>
  <link rel="stylesheet" href="/style/style.css">
</head>
<body>
  <h1>Fireside Chat</h1>
  <div id="app">
    <div v-if="state == 0">
      <h3>Welcome! Please choose a username</h3>
      <form @submit.prevent="setUsername">
        <input type="text" placeholder="Username..." v-model:value="username" />
        <input type="submit" value="Join" />
      </form>
      <button @click="continueWithoutUsername">Join as a Guest</button>
    </div>
    <div v-if="state == 1">
      <ul id="chatbox">
        <li v-for="message in messages">
          <b>{{ message.user }}:</b> {{ message.message }}
        </li>
      </ul>
      <form @submit.prevent="sendMessage">
        <input type="text" placeholder="Message..." v-model:value="message" />
        <input type="submit" value="Send" />
      </form>
    </div>
  </div>
  <script src="/socket.io/socket.io.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script>
    var socket = null;
    var app = new Vue({
      // State 0: select username
      // State 1: chat application
      el: '#app',
      data: {
        messages: [],
        message: '',
        username: '',
        state: 0
      },
      methods: {
        sendMessage: function () {
          socket.emit('message', this.message);
          this.message = '';
        },
        setUsername: function () {
          socket.emit('join', this.username);
          this.username = '';
          this.state = 1;
        },
        continueWithoutUsername: function () {
          socket.emit('join', null);
          this.state = 1;
        }
      },
      created: function () {
        socket = io();
      },
      mounted: function () {
        socket.on('message', function (message) {
          app.messages.push(message);
          // this needs to be done AFTER vue updates the page!!
          app.$nextTick(function () {
            var messageBox = document.getElementById('chatbox');
            messageBox.scrollTop = messageBox.scrollHeight;
          });
        });
      }
    });
  </script>
</body>
</html> -->