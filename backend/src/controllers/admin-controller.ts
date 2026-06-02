import type { Request, Response } from "express";
import { connection } from "../utils/db.js";

async function updateAppointment(req: Request, res: Response) {
    connection.execute(
        'SELECT * FROM appointments WHERE date = ? AND initial_time = ? AND appointment_id != ?',
        [req.body.date, req.body.initial_time, req.params.id],
        function(err, results, fields) {
            if ((results as any[]).length > 0) {
            return res.status(400).send("Il dottore è già occupato alle " + req.body.initial_time);
        }
            connection.execute(
                'UPDATE appointments SET date = ?, initial_time = ?, duration = ?, note = ? WHERE appointment_id = ?',
                [req.body.date, req.body.initial_time, req.body.duration, req.body.note, req.params.id],
                function(err, results, fields) {
                    res.status(200).send("Correttamente Modificato")
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
                return res.status(500).send("andata male, cancelazzione non avvenuta");
            }
            res.status(200).send("cancellazzione avvenuta con successo");
        }
    );
}

export {updateAppointment, deleteAppointment}