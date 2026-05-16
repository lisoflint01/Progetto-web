<script setup>

</script>


<template>
  <div class="py-5"> 
    <h1>Accedi</h1>

    <form method="POST">

        <div class="my-5"> 
          <div>
            <label for="email" class="label-custom mb-3">Email</label>
          </div>
          <input type="email" name="email" class="input w-50" required>
        </div> 

        <div class="my-5">
          <div>
            <label for="password" class="label-custom mb-3">Password</label>
          </div>
          <input type="password" name="password" class="input w-50" required>
        </div>

      <div class="my-5">
          <button class="mt-5" type="submit">Accedi</button>
      </div>

    </form>
  </div>
</template>


<style scoped>
    @import "./css/style.css";
</style>