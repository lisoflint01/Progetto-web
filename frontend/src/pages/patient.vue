<script setup>

</script>


<template>
    <div>
        <h1>Registra Paziente</h1>

        <form method="POST" action="/api/patient/create">
            <div class="row">
                <div class="col-1"></div>
                <div class="col-md-5">

                    <div class="row mb-4 align-items-center">
                        <label for="name" class="col-sm-4 text-end">Nome</label>
                        <div class="col-8">
                            <input type="text" id="name" name="name" class="input" required>
                        </div>
                    </div>
                    
                    <div class="row mb-4 align-items-center">
                        <label for="surname" class="col-sm-4 text-end">Cognome</label>
                        <div class="col-8">
                            <input type="text" id="surname" name="surname" class="input" required>
                        </div>
                    </div>

                    <div class="row mb-4 align-items-center">
                        <label for="cf" class="col-sm-4 text-end">Codice Fiscale</label>
                        <div class="col-8">
                            <input type="text" id="cf" name="cf" class="input" required>
                        </div>
                    </div>
                </div>

                <div class="col-md-5">
                    <div class="row mb-4 align-items-center">
                        <label for="email" class="col-sm-4 text-end">Email</label>
                        <div class="col-8">
                            <input type="email" id="email" name="email" class="input">
                        </div>
                    </div>

                    <div class="row mb-4 align-items-center">
                        <label for="tel" class="col-sm-4 text-end">Telefono</label>
                        <div class="col-8">
                            <input type="tel" id="tel" name="tel" class="input" required>
                        </div>
                    </div>
                    
                    <div class="row mb-4 align-items-center">
                        <label for="date_birth" class="col-sm-4 text-end">Data Nascita</label>
                        <div class="col-8">
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