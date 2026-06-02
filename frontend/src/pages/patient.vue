<script>
import axios from 'axios';

export default {
    data() {
        return {
            userRole: localStorage.getItem('ruoloUtente') || '',

            name: '',
            surname: '',
            cf: '',
            email: '',
            tel: '',
            date_birth: '',
            anamnesis: '',

            message: ''
        }
    },

    methods: {
        creaPaziente() {
            this.message= '';

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
                this.message = response.data;
            })
            .catch(error => {
                this.message = error.response.data;
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

                    <div>
                        <label>Nome</label>
                        <div>
                            <input type="text" v-model="name" class="input" required>
                        </div>
                    </div>
                    
                    <div>
                        <label>Cognome</label>
                        <div>
                            <input type="text" v-model="surname" class="input" required>
                        </div>
                    </div>

                    <div>
                        <label>Codice Fiscale</label>
                        <div>
                            <input type="text" v-model="cf" class="input" required>
                        </div>
                    </div>
                </div>

                <div class="col-5">
                    <div>
                        <label>Email</label>
                        <div>
                            <input type="email" v-model="email" class="input">
                        </div>
                    </div>

                    <div>
                        <label>Telefono</label>
                        <div>
                            <input type="tel" v-model="tel" class="input" required>
                        </div>
                    </div>
                    
                    <div>
                        <label>Data Nascita</label>
                        <div>
                            <input type="date" v-model="date_birth" class="input" required>
                        </div>
                    </div>
                </div>
                <div class="col-1"></div>
            </div>

            <div>
                <label>Anamnesi</label>
                <textarea v-model="anamnesis"></textarea>
            </div> 

            <div class="mt-4">
                <button type="submit" :disabled="userRole !== 'admin' && userRole !== 'operatore'">Conferma</button>
            </div>

            <div v-if="message">{{ message }}</div>
            
        </form>
    </div>
</template>


<style scoped>
    @import "./css/style.css";

    textarea {
        border: 2px solid #320A9E;
        border-radius: 20px;
        width: 80%;           
        margin: 0 auto;       
        min-height: 20vh;
        display: block;        
    }
</style>