import type { Request, Response } from "express";
import { connection } from "../utils/db.js";

async function login(req: Request, res: Response) {
    connection.execute(
        'SELECT user_id, username, fullname, role FROM users WHERE username = ? AND password = ?',
        [req.body.username, req.body.password],
        function(err, results){
            if ((results as any[]).length > 0) {
                res.json("login success");
            }       
            else{
                res.status(400).json("login  not success")
            }
        }
    )
}

export { login };