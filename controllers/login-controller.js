import { connection } from "../utils/db.js";

async function login(req, res) {
    connection.execute(
        'SELECT user_id, username, fullname, role FROM users WHERE username = ? AND password = ?',
        [req.body.username, req.body.password],
        function(err, results){
            if (results.length > 0) {
                res.json("login success")
            }
            else{
                res.status(400).json("login  not success")
            }
        }
    )
}

export { login };