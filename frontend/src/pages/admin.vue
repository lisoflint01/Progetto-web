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
    <div class="main-wrapper">
        
        <h1 class="text-center admin-title">Gestione Admin</h1>

        <div class="d-flex justify-content-end gap-2 mb-2">
            <button id="calendar-week" class="button-calendar" @click="changeView ('timeGridWeek')">Settimana</button>
            <button id="calendar-day" class="button-calendar" @click="changeView ('timeGridDay')">Giorno</button>
        </div>


        <div class="calendar calendar-admin">
            <div class="calendar-header">
                <button class="nav-arrow" @click="prev">Indietro</button>
                <div class="calendar-title">{{ currentTitle }}</div>
                <button class="nav-arrow" @click="next">Avanti</button>
            </div>

            
            <FullCalendar ref="fullCalendarRef" :options="calendarOptions" />
        </div>
        
        <div class="mt-3">
            <button id="PUT">Modifica</button>
            <button id="DELETE">Cancella</button>
        </div>
    </div>
</template>

<style scoped>
    @import "./css/style.css";
</style>


<style>

.calendar-admin .fc {
    height: 60vh;
}

.fc {
    display: flex !important;
    flex-direction: column !important;
    width: 100%;
}

.fc .fc-timegrid-slot {
    height: 6vh !important; 
}
.calendar .fc {
    margin-top: 0 !important;
    align-items: stretch !important;
}

.calendar-header {
    justify-content: space-between !important;
    margin-bottom: 1%;
}
.calendar-header div.calendar-title {
    margin-top: 0 !important;
    font-weight: 600;
}
.fc-col-header-cell-cushion {
    color: black;
    text-decoration: none;
}

.fc .fc-scrollgrid {
    border: none !important;      
    border-collapse: collapse !important;
}
.fc-theme-standard td, 
.fc-theme-standard th {
    border: 1px solid #320A9E !important; 
}

.fc .fc-scroller-col-header { border-top: none !important; }
.fc-theme-standard tr:last-child td { border-bottom: none !important; }
.fc-theme-standard tr th:first-child, .fc-theme-standard tr td:first-child { border-left: none !important; }
.fc-theme-standard tr th:last-child, .fc-theme-standard tr td:last-child { border-right: none !important; }

.fc .fc-timegrid-slot-label { border-right: none !important; }
.fc-theme-standard .fc-timegrid-slots tr td:first-child { border-top: none !important; border-bottom: none !important; }
</style>