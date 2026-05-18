<script setup>

</script>


<template>
    <div>
        <h1>Registra Paziente</h1>

        <form method="POST" action="/api/patient/create">
            <div class="row">
                <div class="col-1"></div>
                <div class="col-5">

                    <div class="mb-2 align-items-center">
                        <label for="name">Nome</label>
                        <div>
                            <input type="text" id="name" name="name" class="input" required>
                        </div>
                    </div>
                    
                    <div class="mb-2 align-items-center">
                        <label for="surname">Cognome</label>
                        <div>
                            <input type="text" id="surname" name="surname" class="input" required>
                        </div>
                    </div>

                    <div class="mb-2 align-items-center">
                        <label for="cf">Codice Fiscale</label>
                        <div>
                            <input type="text" id="cf" name="cf" class="input" required>
                        </div>
                    </div>
                </div>

                <div class="col-5">
                    <div class="mb-2 align-items-center">
                        <label for="email" class="col-sm-4 ">Email</label>
                        <div>
                            <input type="email" id="email" name="email" class="input">
                        </div>
                    </div>

                    <div class="mb-2 align-items-center">
                        <label for="tel" class="col-sm-4 ">Telefono</label>
                        <div class="">
                            <input type="tel" id="tel" name="tel" class="input" required>
                        </div>
                    </div>
                    
                    <div class="mb-2 align-items-center">
                        <label for="date_birth" class="">Data Nascita</label>
                        <div>
                            <input type="date" id="date_birth" name="date_birth" class="input" required>
                        </div>
                    </div>
                </div>
                <div class="col-1"></div>
            </div>

            <div class="mt-3 text-center">
                <label for="anamnesis" class="d-block mb-3">Anamnesi</label>
                <textarea name="anamnesis" id="anamnesis" class="textarea_patient"></textarea>
            </div> 

            <div class="text-center mt-5">
                <button type="submit">Conferma</button>
            </div>
        </form>
    </div>
</template>


<style scoped>
    @import "./css/style.css";
</style>