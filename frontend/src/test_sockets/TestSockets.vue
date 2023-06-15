<!--
    src/components/ConnectionState.vue
-->

<template>
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
</script>




<!--
    src/components/ConnectionManager.vue
-->

<template>
    <button @click="connect()">Connect</button>
    <button @click="disconnect()">Disconnect</button>
  </template>
  
  <script>
  import { socket } from "@/socket";
  
  export default {
    name: "ConnectionManager",
  
    methods: {
      connect() {
        socket.connect();
      },
      disconnect() {
        socket.disconnect();
      }
    }
  }
  </script>




<!-- 
    src/components/MyForm.vue
-->

<template>
    <form @submit.prevent="onSubmit">
        <input v-model="value" />

        <button type="submit" :disabled="isLoading">Submit</button>
    </form>
    </template>

    <script>
    import { socket } from "@/socket";

    export default {
    name: "MyForm",

    data() {
        return {
        isLoading: false,
        value: ""
        }
    },

    methods: {
        onSubmit() {
        this.isLoading = true;

        socket.timeout(5000).emit("create-something", this.value, () => {
            this.isLoading = false;
        });
        },
    }
    }
    </script>




<!-- 
    src/components/MyComponent.vue
-->

<script>
import { socket } from "@/socket";

export default {
  name: "MyComponent",

  data() {
    return {
      fooEvents: []
    }
  },

  mounted() {
    // BAD
    socket.on("foo", (...args) => {
      this.fooEvents.push(args);
    });
  }
}
</script>
