import type { Request, Response } from "express";
import { connection } from "../utils/db.js";


async function allAppointments(req: Request, res: Response) {
    connection.execute(
        'SELECT appointment_id, date, initial_time, duration, note, state, patient_cf, first_name, last_name FROM appointments JOIN patients ON patient_cf = cf ORDER BY date, initial_time',
        [],
        function(err, results, fields) {
            res.json(results);
        }
    );
}

async function updateAppointment(req: Request, res: Response) {
    connection.execute(
        'SELECT * FROM appointments WHERE date = ? AND initial_time = ? AND appointment_id != ?',
        [req.body.date, req.body.initial_time, req.params.id],
        function(err, results, fields) {
            if ((results as any[]).length > 0) {
            return res.status(400).send("Errore: Il dottore è già occupato alle " + req.body.initial_time);
        }
            connection.execute(
                'UPDATE appointments SET date = ?, initial_time = ?, duration = ?, note = ?, state = ? WHERE appointment_id = ?',
                [req.body.date, req.body.initial_time, req.body.duration, req.body.note, req.body.state, req.params.id],
                function(err, results, fields) {
                    res.json({ message: "event update" });
                }
            )
        }
    );
}

async function deleteAppointment(req: Request, res: Response) {
    connection.execute(
        'DELETE FROM appointments WHERE appointment_id = ?',
        [req.params.id as string],
        function(err, results, fields) {
            if (err) {
                return res.status(500).json(err);
            }
            res.sendStatus(200);
        }
    );
}

export { allAppointments, updateAppointment, deleteAppointment}