<script setup lang="ts">
import Borders from './Borders.vue'
import Cookies from 'js-cookie';
import { accountService } from '@/_services'
import Toggle from '@vueform/toggle'
import router from '../router';
import { Axios } from '@/_services/caller.service';
</script>

<script lang="ts">
export default {
  components: {
      Toggle,
    },

  data() {
        return {
            users: [],
            text: '',
            value: false,
            qrCodeData: '',
            code:'',
            file: '',
            popup: false,
            popupActive: false,
        }
    },
    watch: {
   async value(newVal) {
      if (newVal) {
        // Perform your desired action here
        if (this.users.twofactor == false) {
         await accountService.generateQr()
        .then((res) => {
          const b64 = btoa(String.fromCharCode(...new Uint8Array(res.data)));
          this.qrCodeData = "data:" + res.headers['content-type'] + ";base64," + b64;
        })
        .catch((err) => {
          console.log(err)
        })
      }
      } else {
        // Toggle switch is turned off
        await accountService.turnOffTwoFactorAuth()
        .then( () => {
          this.users.twofactor = false,
          localStorage.removeItem('2faToken'),
          localStorage.removeItem('validate'),
          Cookies.remove('2fajwt')
          this.qrCodeData = ''
        })
        .catch((err) => {
          console.log(err)
        })
      }
    }
  },

  methods: {
    handleFileUpload( event ) {
      this.file = event.target.files[0];
    },

    async upload() {
      const formData = new FormData();
      formData.append('picture', this.file);
      await accountService.uptadeAvatar(formData)
      .then(() => {
        router.go()
      })
      .catch((err) => {
        console.log(err)
      })

    },

    async change_username() {
      // await accountService.updateUsername(this.text)
      //   .then((res) => {
      //     this.username = res.data.login
      //   })
      //   .catch (res => console.log(res))
      //   this.text = ''
      await accountService.changeUsername( { old: this.users.login, new: this.text })
        .then((res) => {
          this.username = res.data.login
        })
        .catch (res => console.log(res))
        this.text = '';
        router.go();
      },

      async logout() {
        Cookies.remove('jwt');
        Cookies.remove('2fajwt');
        accountService.logout()
        // .catch (res => console.log(res))
        await router.push('/');
      },

      async turnOn2fa() {
        await accountService.turnOnTwoFactorAuth(this.code)
        .then(() => {
          localStorage.setItem('validate', 'true')
          this.code = ''
          this.qrCodeData = ''
        })
        .catch((err) => {
          console.log(err)
          this.code = ''
        })
      },

      closePopup() {
        this.popup = false
      },

      handleKeyDown(event) {
        if (event.key === 'Escape') {
          this.closePopup();
        }
      },
    },

    async created() {
      document.addEventListener('keydown', this.handleKeyDown);

      await accountService.usersMe()
      .then((res) => {
        this.users = res.data,
        this.value = res.data.twofactor
      })
      .catch((err) => {
        console.log(err)
      })
    },

    beforeUnmount() {
      document.removeEventListener('keydown', this.handleKeyDown);
    },
}

</script>

<template>
  <Borders/>

  <div className="main_div" @click="handleClickOutside">
    <div className="profile_div">

      <div className="profile_picture">
        <button @click="popup = true" className="profile_picture_button"><img className="profile_picture_img" :src="users.avatarUrl" class="profile_picture_img"/></button>
        <div v-if="popup" className="test_popup" >
          <div className="test_popup2">
            <form v-on:submit.prevent="upload" enctype="multipart/form-data" ref="upload_form" >
              <label for="picture" >Séléctionnez une image</label><br>
              <input type="file" id="picture" name="picture" required accept=".jpg,.png,.gif" @change="handleFileUpload( $event )"/>
              <button type="submit">change Avatar</button>
            </form>
          </div>
        </div>
        <!-- <button className="profile_picture_button"><img className="" src=""/></button> -->
        <h1 className="profile_user">{{ users.login }}</h1>
        <!-- <button class="button_change_login" @click="test_popup2">Change login</button>
        <div v-if="popup" className="test_popup"> -->
      <!-- <div v-if="button_change_login" className="test_popup2">
          <form @submit.prevent="change_username">
            <input pattern="[a-zA-Z]+" title="only letters accepted" v-model="login" placeholder='new login' :maxlength="9">
            <button @click="change_username_close" className="button_no">cancel</button>
          </form>
      </div> -->
      
      <div className="profile_username">
        <form @submit.prevent="change_username" className="border_right_bottom_two">
          <input className="profile_change_username" v-model="text" placeholder='change username' :maxlength="9" pattern="[a-zA-Z]+" title="only letters accepted">
        </form>
      </div>
      <!-- <div className="profile_username">
        <form @submit.prevent="change_username" className="border_right_bottom_two">
          <input className="profile_change_username" v-model="text" placeholder='change username' :maxlength="9" pattern="[a-zA-Z]+" title="only letters accepted">
          <input className="profile_change_username" v-on:keypress="isLetter($event)" v-model="text" placeholder='change username' :maxlength="9">
        </form>
          <h1>{{ this.username }}</h1>
        <input className="profile_change_username" v-model="text" placeholder='change username'> -->
      <!-- </div> -->
      
      <!-- <div className="profile_bottom"> -->
      <!-- <div className="profile_username">
        <form @submit.prevent="change_username" className="border_right_bottom_two">
          <input className="profile_change_username" v-model="text" placeholder='change username' :maxlength="9" pattern="[a-zA-Z]+" title="only letters accepted">
        </form>
        <h1>{{ this.username }}</h1>
        <input className="profile_change_username" v-model="text" placeholder='change username'>
      </div> -->
    <!-- </div> -->
      <!-- </div> -->
      </div>
      
      <div className="profile_two">
        <h1 className="profile_user">{{ users.email }}</h1>
      </div>
      <div className="profile_three">
        <!-- <h1 className="profile_user">{{ users.name }}</h1>
          <h1 className="profile_user">{{ users.phone }}</h1> -->
        <RouterLink to="/stats" className="button_access_profile">stats</RouterLink>
        <RouterLink to="/game-mode" className="button_access_profile">play</RouterLink>
        <button @click="logout" className="button_access_profile">logout</button>
      </div>
      <div className="profile_bottom">
        <div className="twofactor">
          <h1 className="twofactor_auth"> twofactor auth </h1>
          <Toggle
          v-model="value"
          on-label="On"
          off-label="Off"
          />
        </div>
        <div v-if="qrCodeData" className="code">
            <img v-bind:src="qrCodeData"/>
            <form @submit.prevent="turnOn2fa">
              <input className="profile_change_username" v-model="code" placeholder='2fa code' :maxlength="6" pattern="[0-9]+" title="only numbers accepted">
            </form>
          </div>
        </div>
      </div>
    </div>
	<!-- <div className="profile_div">
	  <div className="profile_picture">
		<button className="profile_picture_button"><img className="" src=""/></button>
		<h1 className="profile_user">{{ this.username }}</h1>
	  </div>
	  <div className="profile_username">
		<form @submit.prevent="change_username" className="border_right_bottom_two">

		  <input className="profile_change_username" v-model="text" placeholder='change username' :maxlength="9" pattern="[a-zA-Z]+" title="only letters accepted">
		</form>
	  </div>
	  <div className="profile_bottom">
		  <h1 className="profile_user">{{ users.email }}</h1>
		  <button @click="logout">log out</button>
		  <RouterLink to="/stats" className="button_access_profile">stats</RouterLink>
		  <RouterLink to="/game-mode" className="button_access_profile">play</RouterLink>
	  </div> -->

	<!-- </div> -->
  <!-- </div> -->

  	<!-- Le formulaire d'upload avec la référence "upload_form" -->
</template>

<style src="@vueform/toggle/themes/default.css"></style>