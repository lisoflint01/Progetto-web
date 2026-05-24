<script setup>
    import { ref, reactive, onMounted } from 'vue'
    import FullCalendar from '@fullcalendar/vue3'
    import interactionPlugin from '@fullcalendar/interaction' 
    import timeGridPlugin from '@fullcalendar/timegrid'

    const fullCalendarRef = ref(null)
    const currentTitle = ref('') // settimana

    const calendarOptions = reactive({
        plugins: [timeGridPlugin, interactionPlugin],
        initialView: 'timeGridWeek',
        headerToolbar: false,
        weekends: false,
        locale: 'it',
        slotMinTime: '08:00:00',
        slotMaxTime: '18:00:00',
        allDaySlot: false,

        dayHeaderFormat: { weekday: 'short' },
        slotDuration: '01:00:00',

        events: [],
        datesSet: (arg) => {
            currentTitle.value = arg.view.title.toLowerCase()
        }
    })

    const changeView = (viewName) => {
        fullCalendarRef.value?.getApi().changeView(viewName)
    }

    const prev = () => {
        fullCalendarRef.value?.getApi().prev()
    }

    const next = () => {
        fullCalendarRef.value?.getApi().next()
    }
</script>


<template>
    <div class="main-container py-1">
        
        <h1 class="text-center page-title">Creazione Appuntamento</h1>

        <div class="d-flex justify-content-end gap-2 mb-2">
            <button id="calendar-week" class="button-calendar" @click="changeView ('timeGridWeek')">Settimana</button>
            <button id="calendar-day" class="button-calendar" @click="changeView ('timeGridDay')">Giorno</button>
        </div>

        <div class="calendar calendar-appointments">
            <div class="calendar-header">
                <button class="nav-arrow" @click="prev">Indietro</button>
                <div class="calendar-title">{{ currentTitle }}</div>
                <button class="nav-arrow" @click="next">Avanti</button>
            </div>
            
            <FullCalendar ref="fullCalendarRef" :options="calendarOptions" />
        </div>
        
        <form id="appointmentForm" action="/api/appointments/create" method="POST" class="mt-4">
    <div class="row justify-content-center"> <div class="col-md-9"> 
            
            <div class="row">
                <div class="col-3 d-flex flex-column align-items-center">
                    <label class="label-custom">giorno</label>
                    <input type="date" name="date" class="form-control input" required>
                </div>

                <div class="col-3 d-flex flex-column align-items-center">
                    <label class="label-custom">ora</label>
                    <input type="time" name="initial_time" class="form-control input" required>
                </div>

                <div class="col-3 d-flex flex-column align-items-center">
                    <label class="label-custom">durata</label>
                    <input type="number" name="duration" class="form-control input" required>
                </div>

                <div class="col-3 d-flex flex-column align-items-center">
                    <label class="label-custom">paziente</label>
                    <input type="text" name="patient_cf" class="form-control input" required>
                </div>
            </div>

            <div class="col-12 text-center">
                <label class="label-custom">nota</label>
                <textarea name="note" class="form-control textarea_appointments"></textarea>
            </div>
        </div>

        <div class="col-3">
            <div>
                <button type="submit" class="btn-confirm w-100 mb-4">Conferma</button>
            </div>

            <div>
                <button type="button" class="btn-export w-100">Esporta</button>
            </div>
        </div>
    </div>
</form>
    </div>
</template>


<style scoped>
    @import "./css/style.css";
</style>



<style>
    .calendar-appointments .fc {
        height: 35vh;
    }
</style>