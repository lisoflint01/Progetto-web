import express from 'express';
import path from 'path';
import type { Express } from 'express';

import { appointmentsRouter } from './routes/appointments-router.js';
import { patientRouter } from './routes/patient-router.js';
import { adminRouter } from './routes/admin-router.js';
import { loginRouter } from './routes/login-router.js';
import historyApiFallback from 'connect-history-api-fallback' 

const __dirname: string = import.meta.dirname;
const publicPath = path.join(__dirname, '..', 'public');

const app: Express = express();
const port: number = 3000;

app.use(historyApiFallback());

app.use(express.static('dist-frontend'));
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(appointmentsRouter);
app.use(patientRouter);
app.use(adminRouter);
app.use(loginRouter);

app.get('/login', function(req, res){
    res.sendFile(path.join(publicPath, 'login.html'));
})

app.get('/patient', function(req, res){
    res.sendFile(path.join(publicPath, 'patient.html'));  
})

app.get('/appointments', function(req, res){
    res.sendFile(path.join(publicPath, 'appointments.html'));
})

app.get('/admin', function(req, res){
    res.sendFile(path.join(publicPath, 'admin.html'));
})

app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/html');
    res.status(404).send("<b>pagina non trovata, mi dispiace<b>");
})

app.listen(port, function(){
    console.log("porta" + port);
})
