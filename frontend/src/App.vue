<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      userRole: localStorage.getItem('ruoloUtente') || ''
    };
  },
  
  watch: {
    $route() {
      this.userRole = localStorage.getItem('ruoloUtente') || '';
    }
  },

  methods: {
    logout() {
      localStorage.removeItem('ruoloUtente');
      this.userRole = '';
      this.$router.push('/login');
    }
  }
});
</script>

<template>
  
  <nav>
    <div class="h1">
      MedicFit
    </div>

    <div class="bar">
      <RouterLink v-if="userRole === 'admin'" class="router" to="/admin">Admin</RouterLink>
      <RouterLink v-if="userRole === 'admin' || userRole === 'operatore'" class="router" to="/appointments">Appointments</RouterLink>
      <RouterLink v-if="userRole === 'admin' || userRole === 'operatore'" class="router" to="/patient">Patient</RouterLink>
      <RouterLink v-if="userRole != 'admin' && userRole != 'operatore'" class="router" to="/login">Login</RouterLink>

      <a v-if="userRole === 'admin' || userRole === 'operatore'" class="router" href="#" @click.prevent="logout">Logout</a>
    </div>
  </nav>

  <RouterView/>

</template>

<style scoped>

  .router-link-exact-active {
    border: 4px solid black;
    border-radius: 10px;
    padding-inline-start: 1%;
    padding-inline-end: 1%;
  }

  nav {
    padding-bottom: 2ch;
    background-color: #320A9E;
  }

  .h1{
    text-align: center;
    color: white;
  }

  .bar{
    text-align: center;
  }  

  .router{
    color: white;
    text-decoration: none;
    margin-left: 2%;
    margin-right: 2%;
    font-weight: 700;
    font-size: 1.15rem;
  }
</style>