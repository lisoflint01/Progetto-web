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
            
            newAppointment: {
                patient_cf: '',
                date: '', 
                initial_time: '',
                duration: 30, 
                note: '',
 
            },

            view: 'week' as 'week' | 'day', 
            dayIndex: 0,
            currentDate: new Date(), 
            days: [] as Array<{ name: string; dayDate: string }>, 
            times: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00']
        }
    },
    computed: {
        dayVisible(): Array<{ name: string; dayDate: string }> {
            return this.view === 'day' ? [this.days[this.dayIndex]] : this.days;
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
            this.message = '';
            axios.post("/api/appointments/create", this.newAppointment)
                .then(response => {
                    this.message = response.data;
                    this.getAppointment();
                })
                .catch(error => {
                    this.message = error.response?.data?.error || "Errore durante il salvataggio";
                });
        },

        checkAppointment(dayDate: string, time: string): Appointment | undefined {
            if (!Array.isArray(this.dataAppointment)) return undefined;

            return this.dataAppointment.find(appointment => {
                if (!appointment || !appointment.date || !appointment.initial_time) return false;

                const appointmentDate = appointment.date.toString().substring(0, 10);
                const isSameDay = (appointmentDate === dayDate);
                
                const dbHour = appointment.initial_time.substring(0, 2);
                const cellHour = time.substring(0, 2);

                return isSameDay && (dbHour === cellHour);
            });
        },

        calculateWeek() {
            const dayWeek = this.currentDate.getDay();

            const shiftLunedi = dayWeek === 0 ? -6 : 1 - dayWeek;
            
            const lunedi = new Date(this.currentDate);
            lunedi.setDate(this.currentDate.getDate() + shiftLunedi);

            const dayName = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì'];
            this.days = dayName.map((name, i) => {
                const currentDay = new Date(lunedi);
                currentDay.setDate(lunedi.getDate() + i);
                
                const year = currentDay.getFullYear();
                const month = String(currentDay.getMonth() + 1).padStart(2, '0');
                const day = String(currentDay.getDate()).padStart(2, '0');
                
                return { name, dayDate: `${year}-${month}-${day}` };
            });
        },

        navigate(step: number) {
            if (this.view === 'day') {
                let newIndex = this.dayIndex + step;
                if (newIndex >= 0 && newIndex <= 4) {
                    this.dayIndex = newIndex;
                    return;
                }

                // Se superati confini (Lun-Ven)
                this.currentDate.setDate(this.currentDate.getDate() + (step * 7));
                this.dayIndex = step === 1 ? 0 : 4;
            } else {
                this.currentDate.setDate(this.currentDate.getDate() + (step * 7));
            }
            this.calculateWeek();
            this.getAppointment();
        },

        exportData() {
            const csvContent = "data:text/csv;charset=utf-8," 
                + "ID,Data,Ora,Durata,Paziente,Note\n"
                + this.dataAppointment.map(row => `${row.appointment_id},${row.date},${row.initial_time},${row.duration},${row.patient_cf},"${row.note || ''}"`).join("\n");

            const link = document.createElement("a");
            link.setAttribute("href", encodeURI(csvContent));

            link.setAttribute("download", "appuntamenti.csv");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    },
    mounted() {
        this.calculateWeek();
        this.getAppointment();
    }
});
</script>

<template>
    <div>

        <h1>Creazione Appuntamento</h1>
        
        <div class="row">
            <div class="col-4 text-start">
                <button @click="navigate(-1)"> indietro </button>
                <button @click="navigate(1)"> avanti </button>
            </div>

            <div class="col-4"></div>
            
            <div class="col-4 text-end">
                <button class="button-calendar" @click="view = 'week'">Settimana</button>
                <button class="button-calendar" @click="view = 'day'">Giorno</button>
            </div>
        </div>  

        <div class="table-responsive">
            <table class="mb-0">
                <thead>
                    <tr>
                        <th class="hour">Ora</th>
                        <th v-for="day in dayVisible" :key="day?.dayDate">
                            {{ day?.name }} <br> {{ day?.dayDate}}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="hour in times" :key="hour">
                        <td class="hour">{{ hour }}</td>
                        
                        <td v-for="day in dayVisible" :key="day?.dayDate" style="position: relative;">
                            
                            <div v-for="appointment in [checkAppointment(day?.dayDate, hour)]" :key="appointment?.appointment_id">
                                
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
                            <textarea v-model="newAppointment.note"></textarea>
                        </div>
                    </div>

                </div>
                <div class="col-3">
                    <div>
                        <button type="button" @click="createAppointment" class="mb-2" :disabled="userRole !== 'admin' && userRole !== 'operatore'">Conferma</button>
                    </div>

                    <div>
                        <button type="button" @click="exportData">Esporta</button>
                    </div>
                    <div v-if="message" class="small">{{ message }}</div>
                </div>
            </div>
        </form>

    </div>
</template>

<style scoped>
    @import "./css/style.css";

    textarea {
        border: 2px solid #320A9E;
        border-radius: 20px;
        width: 99%;           
        margin: 0 auto;       
        min-height: 10vh;
        display: block;
    }
</style>