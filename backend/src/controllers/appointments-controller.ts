import type { Request, Response } from "express";
import { connection } from "../utils/db.js";

async function allAppointments(req: Request, res: Response) {
    connection.execute(
        'SELECT appointment_id, date, initial_time, duration, note, state, patient_cf FROM appointments',
        [],
        function(err, results, fields) {
            res.json(results);
        }
    );
}

async function createAppointment(req: Request, res: Response) {
    connection.execute(
        'SELECT * FROM appointments WHERE date = ? AND initial_time = ?',
        [req.body.date, req.body.initial_time],
        function(err, results, fields) {
            if (err) {
                return res.status(500);
            }

            connection.execute(
                'INSERT INTO appointments (date, initial_time, duration, note, patient_cf, state) VALUES (?, ?, ?, ?, ?, ?)',
                [req.body.date, req.body.initial_time, req.body.duration, req.body.note, req.body.patient_cf, 'programmato'],
                function(err, results, fields) {
                    res.json({ message: "event created" });
                }
            )
        }
    );
}

export { allAppointments, createAppointment}