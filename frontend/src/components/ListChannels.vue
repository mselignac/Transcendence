<script lang="ts">
import Borders from './Borders.vue';
import { accountService } from '@/_services';

export default {
    data() {
        return {
          list: [] as string[],
        };
    },
    components: { Borders },
    created() {
        accountService.usersMe()
            .then(res => {
                this.list = res.data.channels
            })
    } 
}
</script>

<template>
    <Borders/>
    <div className="main_public_channel">
        <h1 className="no_public_channel" v-if="!this.list.length">no public channel yet</h1>
        <h1 className="no_public_channel" v-else>publics channels:</h1>
        <li v-for="channel in this.list" className="list_channels">
            <RouterLink :to="'/channel/' + channel" className="channel_public">{{ channel }}</RouterLink>
        </li>
    </div>
</template>
