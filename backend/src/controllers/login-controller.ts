import type { Request, Response } from "express";
import { connection } from "../utils/db.js";

async function login(req: Request, res: Response) {
    connection.execute(
        'SELECT user_id, username, fullname, role FROM users WHERE username = ? AND password = ?',
        [req.body.username, req.body.password],
        function(err, results) {

            if (err) {
                console.error("Errore di sistema:", err);
                return res.status(500).json({ message: "Errore col database, i'm afraid Brucius" });
            }

            if (results && (results as any[]).length > 0) {
                const userRole = (results as any[])[0].role;
                return res.status(200).json({ message: "login approvato come ", role: userRole });
            } 
            
            else {
                return res.status(401).json({ message: "EMAIL o PASSWORD errate" });
            }
        }
    )
}

export { login };