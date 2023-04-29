<template>
  <div className="app">
      <RouterView/>
  </div>
</template>



















 <!-- TEST SOCKETS -->











<!-- 

<template>
  <div>
    <form @submit.prevent="sendMessage" className="border_right_bottom_two">
      <input className="placeholder_search_friends" v-model="text" placeholder='send'>
    </form>
  </div>
</template>

<script>

import io from "socket.io-client";

export default {
  data() {
    return {
      title: 'Nestjs Websockets Chat',
      name: '',
      text: '',
      messages: [],
      socket: null
    }
  },
  methods: {
    sendMessage() {
        if(this.validateInput()) {
            const message = {
                name: this.name,
                text: this.text
            }
            this.socket.emit('msgToServer', message)
            this.text = ''
        }
    },
    receivedMessage(message) {
        this.messages.push(message)
    },
    validateInput() {
        return this.text.length > 0
    }
  },
  created() {
    this.socket = io('http://localhost:3000')
    this.socket.on('msgToClient', (message) => {
      console.log(message),
        this.receivedMessage(message)
    })
  }
}
</script>




 -->




<!-- <template>
  <p>State: {{ connected }}</p>
</template>

<script>
import { state } from "@/socket";

export default {
  name: "ConnectionState",

  computed: {
    connected() {
      return state.connected;
    }
  }
}
</script> -->












<!-- <template>
  <button @click="connect()">Connect</button>
  <button @click="disconnect()">Disconnect</button>
  <p>State: {{ connected }}</p>
</template>

<script>
import { socket } from "@/socket";
import { state } from "@/socket";

export default {
  name: "ConnectionManager",
  computed: {
    connected() {
      return state.connected;
    }
  },
  methods: {
    connect() {
      socket.connect();
    },
    disconnect() {
      socket.disconnect();
    }
  }
}
</script> -->
