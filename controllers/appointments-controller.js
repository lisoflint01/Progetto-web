import { connection } from "../utils/db.js";

async function allAppointments(req, res) {
    connection.execute(
        'SELECT appointment_id, date, initial_time, duration, note, state, patient_cf, first_name, last_name FROM appointments JOIN patients ON patient_cf = cf ORDER BY date, initial_time',
        [],
        function(err, results, fields) {
            res.json(results);
        }
    );
}

async function createAppointment(req, res) {
    connection.execute(
        'SELECT * FROM appointments WHERE date = ? AND initial_time = ?',
        [req.body.date, req.body.initial_time],
        function(err, results, fields) {
            if (results.length > 0) {
                return res.status(400).send("Errore: Il dottore è già occupato alle " + req.body.initial_time);
            }
            connection.execute(
                'INSERT INTO appointments (date, initial_time, duration, note, patient_cf, state) VALUES (?, ?, ?, ?, ?, ?)',
                [req.body.date, req.body.initial_time, req.body.duration, req.body.note, req.body.patient_cf, 'programmato'],
                function(err, results, fields) {
                    res.redirect('/calendar');
                }
            )
        }
    );
}

export { allAppointments, createAppointment }