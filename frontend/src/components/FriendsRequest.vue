<script setup lang="ts">
import Borders from './Borders.vue';
import { accountService } from '@/_services';
</script>

<script lang=ts>
export default {
    data() {
        return {
            friends_requests: '',
            me: ''
        }
    },
    methods: {
        acceptFriend(friend) {
            console.log('friend = ', friend)
            let room: RoomDto = { name: 'room', user_one: this.me.login, user_two: friend }
            accountService.createRoom(room)
              .catch(res => console.log(res))

            let dto: RoomChannelDto = { name: this.me.login, users: [ friend ] }
            accountService.addFriend(dto)
                .catch(res => console.log(res))
            let dto2: RoomChannelDto = { name: friend, users: [ this.me.login ] }
            accountService.addFriend(dto2)
                .catch(res => console.log(res))
            accountService.removeRequest({ name: this.me.login, user_one: friend })
                .catch(res => console.log(res))
                
            this.friends_requests = this.friends_requests.filter((t) => t !== friend)
        }
    },
    created() {
        accountService.usersMe()
            .then(res => {
                this.me = res.data
                this.friends_requests = res.data.requests
                console.log(this.friends_request)
            })
            .catch(res => console.log(res))
    }
}
</script>

<!-- <template>
    <Borders/>
    <div className="main_div">
        <div className="friends_requests_div">
            <h1 v-if="!this.friends_requests.length" className="no_friends_requests">You don't have any friends requests</h1>
            <div v-else>
                <ul>
                    <li v-for="friend in friends_requests">
                    <h1><font-awesome-icon icon="fa-solid fa-user" />{{ friend }}</h1>
                    <button className="connected" @click="acceptFriend(friend)">add</button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template> -->

<template>
    <Borders/>
    <div className="main_div">
        <div className="infos">
            <h1 v-if="!this.friends_requests.length" className="no_friends_requests">You don't have any friends requests</h1>
            <h1 v-else className="no_friends_requests">friends requests</h1>

            <div className="list_requests">
                <ul>
                    <li v-for="friend in friends_requests">
                        <div className="user_request">
                            <h1 className="request">{{ friend }}</h1>
                            <button className="button_request" @click="acceptFriend(friend)">add</button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
