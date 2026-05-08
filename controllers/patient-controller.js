import { connection } from "../utils/db";

async function allAppointments(req, res) {
    connection.execute(
        'SELECT appointment_id, date, initial_time, duration, note, state, patient_cf FROM appointments'
    );
}