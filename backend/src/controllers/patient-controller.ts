import type { Request, Response } from "express";
import { connection } from "../utils/db.js";

async function createPatient(req: Request, res: Response) {
    if (!req.body.cf || req.body.cf.trim().length !== 16) {
        return res.status(400).send("Codice fiscale non valido, colpa tua vecchio");
    }
    connection.execute(
        'INSERT INTO patients (cf, first_name, last_name, email, phone, birth_date, medical_history) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [req.body.cf, req.body.name, req.body.surname, req.body.email, req.body.tel, req.body.date_birth, req.body.anamnesis],
        function(err, results, fields) {
            if (err) {
                console.error(err);
                return res.status(500).send("Errore col database, i'm afraid Brucius");
            }
            res.send("Paziente creato con successo Bro");
        }
    );
}

async function singlePatient (req: Request, res: Response) {
    
    connection.execute(
        'SELECT * FROM patients WHERE cf = ?',
        [req.params.cf as string],
        function(err, results, fields) {
            res.json(results);
        }
    );
}

export { createPatient, singlePatient }