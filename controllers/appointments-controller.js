import { connection } from "../utils/db.js";

async function allAppointments(req, res) {
    connection.execute(
        'SELECT appointment_id, date, initial_time, duration, note, state, patient_cf FROM appointments',
        [],
        function(err, results, fields) {
            res.json(results);
        }
    );
}

async function deleteAppointment(req, res) {
    connection.execute(
        'DELETE FROM appointments WHERE appointment_id = ?',
        [req.params.id],
        function(err, results, fields) {
            if (err) {
                return res.status(500).json(err);
            }
            res.sendStatus(200);
        }
    );
}

export { allAppointments, deleteAppointment}