<script lang="ts">
import router from '@/router';
import Borders from './Borders.vue';
import { accountService } from '@/_services';


////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
//           PRENDRE TOUS LES CHANNELS PAS QUE DAMS USERME            //
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

export default {
    data() {
        return {
            me: '',
            list: '',
            isInChannel: '',
            joinChannelMsg: false,
            channel: ''
        };
    },
    components: { Borders },
    methods: {
        joinChannel(channel) {
            console.log(channel)
            this.isInChannel = channel.users.find(t => t === this.me.login)
            console.log(this.isInChannel)
            if (this.isInChannel)
                router.push('/channel/' + channel.name)
            else {
                this.joinChannelMsg = true
                this.channel = channel
            }
        },
        yes() {

            accountService.editChannel({ name: this.channel.name, users: [ this.me.login ] })
            let dto: RoomChannelDto = { name: this.me.login, users: [ this.channel.name ] }
            accountService.addChannel(dto)

            this.joinChannelMsg = false
            router.push('/channel/' + this.channel.name)
        },
        no() {
            this.joinChannelMsg = false
        }
    },
    created() {
        accountService.usersMe()
            .then(res => {
                this.me = res.data
            })

        accountService.publicsChannels()
            .then(res => {
                console.log(res.data)
                this.list = res.data
                console.log(this.list)
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
            <!-- <RouterLink :to="'/channel/' + channel" className="channel_public">{{ channel.name }}</RouterLink> -->
            <button @click="joinChannel(channel)" className="channel_public">{{ channel.name }}</button>
        </li>
        <div v-if="joinChannelMsg" className="joinChannelMsg">
            <div className="joinChannelMsg2">
                <h1>Do you want to join this channel?</h1>
                <button @click="yes()" className="button_join_channel">yes</button>
                <button @click="no()" className="button_join_channel">no</button>
            </div>
        </div>
    </div>
</template>
