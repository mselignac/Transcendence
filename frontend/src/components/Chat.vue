<script setup>
import Borders from './Borders.vue'
</script>

<script>
export default {
    data() {
        return {
            msg: 'test log',
            text: '',
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
                <h1 className="chat_name">Nom du User ou du Channel</h1>
            </div>
            <div className="chat_bottom_test">
                <div className="logo_chat_test">
                    <font-awesome-icon icon="fa-regular fa-face-laugh-beam" />
                </div>
                <input className="type_msg_test" v-model="text" placeholder='Type a message ...'>
            </div>
        </div>
      </div>
  
  </template>
