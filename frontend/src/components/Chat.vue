<script setup>
import Borders from './Borders.vue'
</script>

<script>
export default {
    data() {
        return {
            msg: 'test log',
            count: 0,
            titleClass: 'title',
        }
    }
}
</script>

<template>
  <div className="game_div">
    <Borders/>
    <div className="chat_div">
        <div className="chat_top">
            <h1 className="chat_name">Nom du User ou du Channel</h1>
        </div>
        <div className="chat_bottom">
            <input className="type_msg" v-model="text" placeholder='Type a message ...'>
        </div>
    </div>
  </div>

</template>