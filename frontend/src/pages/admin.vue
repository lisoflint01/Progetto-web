<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import type { Appointment } from '@/types';

export default defineComponent({
    data() {
        return {
            userRole: localStorage.getItem('ruoloUtente') || '',
            
            dataAppointment: [] as Appointment[],
            message: '',
            isModalOpen: false,
            
            appointment: {
                appointment_id: undefined as number | undefined,
                patient_cf: '',
                date: null as Date | null, 
                initial_time: '',
                duration: 30, 
                note: ''
            },

            view: 'settimana' as 'settimana' | 'giorno', 
            dayIndex: 0,
            currentDate: new Date(), 
            days: [] as Array<{ nome: string; dataIso: string }>, 
            times: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00']
        }
    },
    computed: {
        giorniVisibili(): Array<{ nome: string; dataIso: string }> {
            return this.view === 'giorno' ? [this.days[this.dayIndex]] : this.days;
        }
    },
    methods: {
        getAppointment() {
            axios.get("/api/appointments")
                .then(response => {
                    this.dataAppointment = response.data;
                })
                .catch(error => {
                    console.error("Errore durante il recupero degli appuntamenti:", error);
                });
        },

        selezionaAppuntamento(appuntamento: Appointment) {
            this.message = '';
            
            const dataPulita = appuntamento.date.toString().substring(0, 10);

            this.appointment = {
                appointment_id: appuntamento.appointment_id,
                patient_cf: appuntamento.patient_cf,
                date: dataPulita as unknown as Date,
                initial_time: appuntamento.initial_time.substring(0, 5),
                duration: appuntamento.duration,
                note: appuntamento.note || '',
            };

            this.isModalOpen = true;
        },

        chiudiModal() {
            this.isModalOpen = false;
        },

        modificaAppuntamento() {
            this.message = '';
            const id = this.appointment.appointment_id;

            axios.put(`/api/admin/update/${id}`, this.appointment)
                .then(response => {
                    this.message = response.data;
                    this.getAppointment();
                })
                .catch(error => {
                    console.log(error);
                    this.message = error.response?.data
                });
        },

        cancellaAppuntamento() {
            const id = this.appointment.appointment_id;

            this.message = '';
            axios.delete(`/api/admin/delete/${id}`)
                .then((response) => {
                    this.message = response.data;
                    this.getAppointment();
                    setTimeout(() => {
                        this.chiudiModal();
                        this.message = '';
                    }, 1000);
                })
                .catch(error => {
                    this.message = error.response?.data;
                    console.log(error);
                });
        },

        trovaAppuntamento(dataIso: string, ora: string): Appointment | undefined {
            if (!Array.isArray(this.dataAppointment)) return undefined;

            return this.dataAppointment.find(appuntamento => {
                if (!appuntamento || !appuntamento.date || !appuntamento.initial_time) return false;

                const dataAppuntamentoIso = appuntamento.date.toString().substring(0, 10);
                const stessoGiorno = (dataAppuntamentoIso === dataIso);
                
                const oraDb = appuntamento.initial_time.substring(0, 2);
                const oraCella = ora.substring(0, 2);

                return stessoGiorno && (oraDb === oraCella);
            });
        },

        calcolaSettimana() {
            const giornoSett = this.currentDate.getDay();
            const diffLun = giornoSett === 0 ? -6 : 1 - giornoSett;
            
            const lunedi = new Date(this.currentDate);
            lunedi.setDate(this.currentDate.getDate() + diffLun);

            const nomi = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì'];
            this.days = nomi.map((nome, i) => {
                const d = new Date(lunedi);
                d.setDate(lunedi.getDate() + i);
                
                const anno = d.getFullYear();
                const mese = String(d.getMonth() + 1).padStart(2, '0');
                const giorno = String(d.getDate()).padStart(2, '0');
                
                return { nome, dataIso: `${anno}-${mese}-${giorno}` };
            });
        },

        naviga(passo: number) {
            if (this.view === 'giorno') {
                let nuovoIdx = this.dayIndex + passo;
                if (nuovoIdx >= 0 && nuovoIdx <= 4) {
                    this.dayIndex = nuovoIdx;
                    return;
                }
                this.currentDate.setDate(this.currentDate.getDate() + (passo * 7));
                this.dayIndex = passo === 1 ? 0 : 4;
            } else {
                this.currentDate.setDate(this.currentDate.getDate() + (passo * 7));
            }
            this.calcolaSettimana();
            this.getAppointment();
        }
    },
    mounted() {
        this.calcolaSettimana();
        this.getAppointment();
    }
});
</script>

<template>
    <div>

        <h1>Gestione Admin</h1>
        
        <div class="row mb-3">
            <div class="col-4 text-start">
                <button @click="naviga(-1)"> indietro </button>
                <button @click="naviga(1)"> avanti </button>
            </div>

            <div class="col-4"></div>
            
            <div class="col-4 text-end">
                <button class="button-calendar" @click="view = 'settimana'">Settimana</button>
                <button class="button-calendar" @click="view = 'giorno'">Giorno</button>
            </div>
        </div>

        <div class="table-responsive">
            <table class="mb-0">
                <thead>
                    <tr>
                        <th class="hour">Ora</th>
                        <th v-for="day in days" :key="day?.dataIso">
                            {{ day?.nome }} <br> {{ day?.dataIso}}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="hour in times" :key="hour">
                        <td class="hour">{{ hour }}</td>
                        
                        <td v-for="day in days" :key="day?.dataIso" style="position: relative;">
                            <div v-for="appointment in [trovaAppuntamento(day?.dataIso, hour)]" :key="appointment?.appointment_id">  
                                <div v-if="appointment" class="appointment-client small" @click="selezionaAppuntamento(appointment)" style="cursor: pointer;">

                                    <div class="fw-bold" :title="appointment.patient_cf">

                                        {{ appointment.patient_cf }}

                                    </div>

                                    <div>

                                        {{ appointment.initial_time.substring(0, 5) }} ({{ appointment.duration }} min)

                                    </div>

                                    <div v-if="appointment.note" :title="appointment.note">

                                        {{ appointment.note }}

                                    </div>

                                </div>
                            </div>
                        </td>
                    </tr>
                 </tbody>
            </table>
        </div>

        <div v-if="isModalOpen" class="modal show d-block" @click="chiudiModal">
    
            <div class="modal-dialog" style="max-width: 90%; width: 90%; margin: auto;" @click.stop>
                <div class="modal-content modal-dialog-centered">
                    
                    <div class="modal-header">
                        <h2>Dettagli Appuntamento</h2>
                    </div>
                    
                    <div class="modal-body">
                        
                        <div class="mb-3">
                            <label>Codice Fiscale Paziente</label>
                            <input type="text" class="input" v-model="appointment.patient_cf" readonly>
                        </div>
                        
                        <div class="mb-3">
                            <label>Data</label>
                            <input type="date" class="input" v-model="appointment.date">
                        </div>
                        
                        <div class="row">
                            <div class="col-6">
                                <label>Orario Inizio</label>
                                <input type="time" class="input" v-model="appointment.initial_time">
                            </div>
                            <div class="col-6">
                                <label>Durata (min)</label>
                                <input type="number" class="input" v-model="appointment.duration">
                            </div>
                        </div>
                        
                        <div class="mb-3">
                            <label>Note</label>
                            <textarea v-model="appointment.note" rows="3"></textarea>
                        </div>
                        
                        <div v-if="message">{{ message }}</div>
                        
                    </div>
                    
                    <div class="my-3" style="width: 95%">
                        <button type="button" id="DELETE" @click="cancellaAppuntamento" :disabled="userRole !== 'admin'">Cancella</button>
                        <button type="button" id="PUT" @click="modificaAppuntamento" :disabled="userRole !== 'admin'">Modifica</button>
                    </div>
            
        </div>
    </div>
</div>

    
    </div>
</template>

<style scoped>
    @import "./css/style.css";
    
    label{
        font-weight: bold;
        margin-bottom: 1%;
    }

    textarea {
        border: 2px solid #320A9E;
        border-radius: 20px;
        width: 100%;           
        margin: 0 auto;       
        min-height: 15vh;
        display: block;        
    }

    .modal {
        background: rgba(0,0,0,0.5);
    }

    .modal-body {
        width: 100%
    }
</style>