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
      
            this.message = (response.data.message + response.data.role);

            localStorage.setItem('ruoloUtente', response.data.role);

            setTimeout(() => {
              if (response.data.role === 'admin') {
                this.$router.push('/admin');
              } 
              else if (response.data.role === 'operatore') {
                this.$router.push('/appointments');
              }
            }, 1000);
          })

          .catch(error => {
            this.message = 'Ti è andata male me sa, ' + error.response.data.message;
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
        <input type="email" v-model="credentials.username" class="input" required>
      </div> 

      <div class="my-5">
        <div>
          <label for="password" class="label-custom mb-3">Password</label>
        </div>
        <input type="password" v-model="credentials.password" class="input" required>
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
    .input{
      width: 50%;
    }
</style>