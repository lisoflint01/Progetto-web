<script lang="ts">

  import { defineComponent } from 'vue';  
  import axios from 'axios';
  import type { User } from '@/types';

  export default defineComponent({
    data() {
      return{
        dataUser: [] as User[],

        credentials: {
          username: '',
          password: ''
        },
        
        message: '',
      };
    },

    methods: {
      login(){
        this.message = '';

        axios.post('/api/login', this.credentials)
          .then(response => {
            this.dataUser = response.data;

            if (response.data.role === 'admin') {
              this.message = 'sei un admin, andiamo a fare qualche danno?';
              console.log(response);
            }

            else if (response.data.role === 'operatore'){
              this.message = 'sei un classicone, benvenuto operatore';
              console.log(response);
            }

          })
          .catch(error => {
            this.message = 'Andata male me sa, Nome utente o password sbagliati';
            console.log(error);
          });
      }
    },

    mounted() {
    }
  });

</script>


<template>
  <div class="py-5"> 
    <h1>Accedi</h1>

    <form @submit.prevent="login">

      <div class="my-5"> 
        <div>
          <label for="email" class="label-custom mb-3">Email</label>
        </div>
        <input type="email" v-model="credentials.username" class="input w-50" required>
      </div> 

      <div class="my-5">
        <div>
          <label for="password" class="label-custom mb-3">Password</label>
        </div>
        <input type="password" v-model="credentials.password" class="input w-50" required>
      </div>

      <div class="mt-5">
          <button class="mt-5" type="submit">Accedi</button>
      </div>

      <div v-if="message">{{ message }}</div>

    </form>
  </div>
</template>


<style scoped>
    @import "./css/style.css";
</style>