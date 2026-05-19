<template>
  
  <nav>
    <div class="h1">
      MedicFit
    </div>

    <div class="barra">
      <RouterLink class="router" to="/admin">Admin</RouterLink>
      <RouterLink class="router" to="/appointments">Appointments</RouterLink>
      <RouterLink class="router" to="/login">Login</RouterLink>
      <RouterLink class="router" to="/patient">Patient</RouterLink>
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

  .barra{
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