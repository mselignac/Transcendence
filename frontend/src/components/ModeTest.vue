<script setup lang="ts">
import Borders from './Borders.vue'
</script>

<script lang="ts">
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
    <Borders/>
    <div className="main_div">
        <div className="mode">
            <h1>MODE</h1>
            <h1>(a changer, c'etait juste pour tester)</h1>
        </div>
    </div>

</template>

<style>
.mode {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    color: beige;
    background-color: rgb(64, 63, 66);
    width: 100%;
    border-radius: 20px 20px 20px 20px;
}
</style>
