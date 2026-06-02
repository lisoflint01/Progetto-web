import type { Request, Response } from "express";
import { connection } from "../utils/db.js";

async function allAppointments(req: Request, res: Response) {
    connection.execute(
        "SELECT appointment_id, DATE_FORMAT(date, '%Y-%m-%d') AS date, initial_time, duration, note,  patient_cf FROM appointments",
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
        function(err, results: any, fields) {
            if (results.length > 0) {
                return res.status(400).json({ error: "Il dottore è già occupato alle " + req.body.initial_time });
            }

            connection.execute(
                'SELECT * FROM patients WHERE cf = ?',
                [req.body.patient_cf],
                function(err, results: any, fields) {
                  if (results.length === 0) {
                        return res.status(404).json({ error: "Il codice fiscale inserito non è registrato" });
                    }

                    connection.execute(
                        'INSERT INTO appointments (date, initial_time, duration, note, patient_cf) VALUES (?, ?, ?, ?, ?)',
                        [req.body.date, req.body.initial_time, req.body.duration, req.body.note, req.body.patient_cf],
                        function(err, results, fields) {
                            res.json("Appuntamento Creato");
                        }
                    )
                }
            )

            
        }
    );
}

export { allAppointments, createAppointment}