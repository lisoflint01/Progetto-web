import mysql, { type Connection } from 'mysql2';

const connection: Connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'medicfit'
});

export { connection };