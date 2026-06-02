<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import type { Appointment } from '@/types';

export default defineComponent({
    name: 'AppointmentManager',
    data() {
        return {
            userRole: localStorage.getItem('ruoloUtente') || '',
            
            dataAppointment: [] as Appointment[],
            messaggio: '',
            
            newAppointment: {
                patient_cf: '',
                date: '', 
                initial_time: '',
                duration: 30, 
                note: '',
 
            },

            view: 'settimana' as 'settimana' | 'giorno', 
            dayIndex: 0,
            currentDate: new Date(), 
            days: [] as Array<{ nome: string; dataIso: string }>, 
            times: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00']
        }
    },
    computed: {
        days(): Array<{ nome: string; dataIso: string }> {
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

        createAppointment() {
            this.messaggio = '';
            axios.post("/api/appointments/create", this.newAppointment)
                .then(response => {
                    this.messaggio = response.data;
                    this.getAppointment();
                })
                .catch(error => {
                    this.messaggio = error.response?.data?.error || "Errore durante il salvataggio";
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
                // Se superi i confini della settimana (Lun-Ven), sposta la settimana di riferimento
                this.currentDate.setDate(this.currentDate.getDate() + (passo * 7));
                this.dayIndex = passo === 1 ? 0 : 4;
            } else {
                this.currentDate.setDate(this.currentDate.getDate() + (passo * 7));
            }
            this.calcolaSettimana();
            this.getAppointment();
        },

        esportaDati() {
            const csvContent = "data:text/csv;charset=utf-8," 
                + "ID,Data,Ora,Durata,Paziente,Note\n"
                + this.dataAppointment.map(r => `${r.appointment_id},${r.date},${r.initial_time},${r.duration},${r.patient_cf},"${r.note || ''}"`).join("\n");

            const link = document.createElement("a");
            link.setAttribute("href", encodeURI(csvContent));
            link.setAttribute("download", "appuntamenti.csv");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
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

        <h1>Creazione Appuntamento</h1>
        
        <div class="row">
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
                        
                        <td v-for="g in days" :key="g?.dataIso" style="position: relative;">
                            
                            <div v-for="appointment in [trovaAppuntamento(g?.dataIso, hour)]" :key="appointment?.appointment_id">
                                
                                <div v-if="appointment" class="appointment-client small">
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

        <form>
            <div class="row mt-0"> 
                <div class="col-9 mt-0">

                    <div class="row mb-3">
                        <div class="col-3">
                            <label>giorno</label>
                            <input type="date" v-model="newAppointment.date" class="input">
                        </div>

                        <div class="col-3">
                            <label>ora</label>
                            <input type="time" v-model="newAppointment.initial_time" class="input">
                        </div>

                        <div class="col-3">
                            <label>durata</label>
                            <input type="number" v-model.number="newAppointment.duration" class="input">
                        </div>

                        <div class="col-3">
                            <label>paziente</label>
                            <input type="text" v-model="newAppointment.patient_cf" class="input" required>
                        </div>
                        <div class="col-12 mt-3">
                            <label>nota</label>
                            <textarea v-model="newAppointment.note" class="textarea_appointments"></textarea>
                        </div>
                    </div>

                </div>
                <div class="col-3">
                    <div>
                        <button type="button" @click="createAppointment" class="mb-2" :disabled="userRole !== 'admin' && userRole !== 'operatore'">Conferma</button>
                    </div>

                    <div>
                        <button type="button" @click="esportaDati">Esporta</button>
                    </div>
                    <div v-if="messaggio" class="small">{{ messaggio }}</div>
                </div>
            </div>
        </form>

    </div>
</template>

<style scoped>
    @import "./css/style.css";
</style>