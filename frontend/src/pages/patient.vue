<script>
import axios from 'axios';

export default {
    data() {
        return {
        name: '',
        surname: '',
        cf: '',
        email: '',
        tel: '',
        date_birth: '',
        anamnesis: '',

        messaggioSuccesso: ''
        }
    },

    methods: {
        creaPaziente() {
            this.messaggioSuccesso= '';

            axios.post('/api/patient/create', {
                name: this.name,
                surname: this.surname,
                cf: this.cf,
                email: this.email,
                tel: this.tel,
                date_birth: this.date_birth,
                anamnesis: this.anamnesis
            })

            .then(response => {
                this.messaggioSuccesso = "Paziente registrato con successo!";
            })
            .catch(error => {
                this.messaggioSuccesso = "Errore durante il salvataggio.";
                console.error(error);
            });
        }
    }
}
</script>

<template>
    <div>
        <h1>Registra Paziente</h1>

        <form @submit.prevent="creaPaziente">
            <div class="row">
                <div class="col-1"></div>
                <div class="col-5">

                    <div class="mb-2 align-items-center">
                        <label for="name">Nome</label>
                        <div>
                            <input type="text" id="name" v-model="name" class="input" required>
                        </div>
                    </div>
                    
                    <div class="mb-2 align-items-center">
                        <label for="surname">Cognome</label>
                        <div>
                            <input type="text" id="surname" v-model="surname" class="input" required>
                        </div>
                    </div>

                    <div class="mb-2 align-items-center">
                        <label for="cf">Codice Fiscale</label>
                        <div>
                            <input type="text" id="cf" v-model="cf" class="input" required>
                        </div>
                    </div>
                </div>

                <div class="col-5">
                    <div class="mb-2 align-items-center">
                        <label for="email" class="col-sm-4 ">Email</label>
                        <div>
                            <input type="email" id="email" v-model="email" class="input">
                        </div>
                    </div>

                    <div class="mb-2 align-items-center">
                        <label for="tel" class="col-sm-4 ">Telefono</label>
                        <div class="">
                            <input type="tel" id="tel" v-model="tel" class="input" required>
                        </div>
                    </div>
                    
                    <div class="mb-2 align-items-center">
                        <label for="date_birth" class="">Data Nascita</label>
                        <div>
                            <input type="date" id="date_birth" v-model="date_birth" class="input" required>
                        </div>
                    </div>
                </div>
                <div class="col-1"></div>
            </div>

            <div class="mt-3 text-center">
                <label for="anamnesis" class="d-block mb-3">Anamnesi</label>
                <textarea v-model="anamnesis" id="anamnesis" class="textarea_patient"></textarea>
            </div> 

            <div class="text-center mt-4">
                <button type="submit">Conferma</button>
            </div>
            <div v-if="messaggioSuccesso">{{ messaggioSuccesso }}</div>
        </form>
    </div>
</template>


<style scoped>
    @import "./css/style.css";
</style>