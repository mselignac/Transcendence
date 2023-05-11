<script lang="ts">
import Borders from './Borders.vue';
import { accountService } from '@/_services';

// export type list_type = 

export default {
    data() {
        return {
            // list: ''
          list: [] as string[],
        };
    },
    components: { Borders },
    created() {
        accountService.usersMe()
            .then(res => {
                this.list = res.data.channels
                console.log('list => ', this.list)
                console.log(res.data.channels)
            })
    } 
}
</script>

<template>
    <Borders/>
    <div className="main_div">
        <!-- <h1>hello</h1> -->
        <li v-for="channel in this.list" className="friends_usernames">
            <button className="friends_usernames">{{ channel }}</button>
        </li>
    </div>
</template>



