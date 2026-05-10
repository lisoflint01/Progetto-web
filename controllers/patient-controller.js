import { connection } from "../utils/db.js";

async function createPatient(req, res) {
    connection.execute(
        'INSERT INTO patients (cf, first_name, last_name, email, phone, birth_date, medical_history) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [req.body.cf, req.body.name, req.body.surname, req.body.email, req.body.tel, req.body.date_birth, req.body.anamnesis],
        function(err, results, fields) {
            if (err) {
                console.error(err);
                return res.status(500).send("Error in save patient");
            }
            res.send("patient crated with succes");
        }
    );
}

export { createPatient }