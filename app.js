import express from 'express';
import { appointmentsRouter } from './routes/appointments-router.js';
import { patientRouter } from './routes/patient-router.js';
import { adminRouter } from './routes/admin-router.js';
import { loginRouter } from './routes/login-router.js';

const __dirname = import.meta.dirname;

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

app.use(appointmentsRouter);
app.use(patientRouter);
app.use(adminRouter);
app.use(loginRouter);

app.get('/login', function(req, res){
    //res.sendFile(__dirname+'/pages/login.html');
    res.sendFile(__dirname+'/public/login.html');
})

app.get('/newpatient', function(req, res){
    //res.sendFile(__dirname+'/pages/newpatient.html');
    res.sendFile(__dirname+'/public/newpatient.html');  
})

app.get('/appointments', function(req, res){
    //res.sendFile(__dirname+'/pages/appointments.html');
    res.sendFile(__dirname+'/public/appointments.html');
})

app.get('/admin', function(req, res){
    //res.sendFile(__dirname+'/pages/admin.html');
    res.sendFile(__dirname+'/public/admin.html');
})

app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/html');
    res.status(404).send("<b>pagina non trovata, mi dispiace<b>");
})

app.listen(port, function(){
    console.log("porta" + port);
})
