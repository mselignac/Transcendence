<script setup lang="ts">
import Borders from './Borders.vue';
import { accountService } from '@/_services';
import router from '@/router';
</script>

<script lang=ts>
export default {
    data() {
        return {
            friends_requests: [],
            me: '',
            friends: '',
        }
    },
    methods: {

        async getLogin(friend) {
            await accountService.getLogin( { login: friend } )
            .then(res => {
                this.friends = res.data
            });
            return (this.friends);
        },

        async acceptFriend(friend) {
            let room: RoomDto = { name: 'room', user_one: this.me.id, user_two: friend.id }
            await accountService.createRoom(room)
              .catch(res => console.log(res))

            let dto: RoomChannelDto = { name: this.me.id, users: [ friend.id ] }
            await accountService.addFriend(dto)
                .catch(res => console.log(res))
            let dto2: RoomChannelDto = { name: friend.id, users: [ this.me.id ] }
            await accountService.addFriend(dto2)
                .catch(res => console.log(res))
            await accountService.removeRequest({ name: this.me.login, user_one: friend.id })
                .catch(res => console.log(res))
            router.go()
            this.friends_requests = this.friends_requests.filter((t) => t !== friend)
        }
    },
    async created() {
        await accountService.usersMe()
            .then(res => {
                this.me = res.data
            })
            .catch(res => console.log(res))


        for (let i = 0; this.me.requests[i]; i++) {
            let login = await this.getLogin(this.me.requests[i])
            this.friends_requests.push( login )
        }
    }
}
</script>

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
                            <h1 className="request">{{ friend.login }}</h1>
                            <button className="button_request" @click="acceptFriend(friend)"><font-awesome-icon icon="fa-solid fa-square-plus" /></button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
