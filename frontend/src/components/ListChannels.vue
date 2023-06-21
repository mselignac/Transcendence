<script lang="ts">
import router from '@/router';
import Borders from './Borders.vue';
import { accountService } from '@/_services';

export default {
    data() {
        return {
            me: '',
            list: '',
            isInChannel: '',
            joinChannelMsg: false,
            channel: '',
            password: false,
            check_password: ''
        };
    },
    components: { Borders },
    methods: {
        joinChannel(channel) {
            this.isInChannel = channel.users.find(t => t === this.me.login)
            if (this.isInChannel)
                router.push('/channel/' + channel.name)
            else {
                this.joinChannelMsg = true
                this.channel = channel
            }
        },

        yes() {
            if (this.channel.is_password == true)
              this.password = true
            else {
                accountService.editChannel({ name: this.channel.name, users: [ this.me.login ] })
                let dto: RoomChannelDto = { name: this.me.login, users: [ this.channel.name ] }
                accountService.addChannel(dto)

                this.joinChannelMsg = false
                router.push('/channel/' + this.channel.name)
            }
        },

        no() {
            this.joinChannelMsg = false
        },

        async checkPassword() {
            let dto = { name: this.channel.name, users: [ this.check_password ] }
            await accountService.checkPassword(dto)
            .then((res) => this.check_password = res.data )
            .catch((res) => console.log(res))

            if (this.check_password == true) {
                accountService.editChannel({ name: this.channel.name, users: [ this.me.login ] })
                let dto: RoomChannelDto = { name: this.me.login, users: [ this.channel.name ] }
                accountService.addChannel(dto)
                router.push('/channel/' + this.channel.name)
            }
            this.check_password = ''
            this.password = false
        },

    },
    created() {
        accountService.usersMe()
            .then(res => { this.me = res.data })

        accountService.publicsChannels()
            .then(res => { this.list = res.data })
    } 
}
</script>

<template>
    <Borders/>
    <div className="main_public_channel">
        <h1 className="no_public_channel" v-if="!this.list.length">no public channel yet</h1>
        <h1 className="no_public_channel" v-else>publics channels:</h1>
        <li v-for="channel in this.list" className="list_channels">
            <button @click="joinChannel(channel)" className="channel_public">{{ channel.name }}</button>
        </li>
        <div v-if="joinChannelMsg" className="joinChannelMsg">
            <div className="joinChannelMsg2">
                <h1>Do you want to join this channel?</h1>
                <button @click="yes()" className="button_join_channel">yes</button>
                <button @click="no()" className="button_join_channel">no</button>
            </div>
        </div>


        <div v-if="password" className="joinChannelMsg">
            <div className="joinChannelMsg2">
                <h1>Password?</h1>
                <form @submit.prevent="checkPassword">
                    <input  className="placeholder_password" v-model="check_password" pattern="[a-zA-Z]+" title="only letters accepted" placeholder='password' :maxlength="9">
                </form>

            </div>
        </div>



    </div>
</template>
