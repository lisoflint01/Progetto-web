import type { Request, Response } from "express";
import { connection } from "../utils/db.js";

async function login(req: Request, res: Response) {
    connection.execute(
        'SELECT user_id, username, fullname, role FROM users WHERE username = ? AND password = ?',
        [req.body.username, req.body.password],
        function(err, results){

            if ((results as any[]).length > 0) {
                // Recuperiamo il ruolo reale dal primo utente trovato nei risultati
                const userRole = (results as any[])[0].role;

                res.status(200).json({ message: "login success", role: userRole });
            }       
            else{
                res.status(400).json("login not success");
            }
        }
    )
}

export { login };