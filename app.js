import express from 'express';

const __dirname = import.meta.dirname;

const app = express();
const port = 3000;

app.get('/login', function(req, res){
    res.sendFile(__dirname+'/pages/login.html');
})

app.get('/newpatient', function(req, res){
    res.sendFile(__dirname+'/pages/newpatient.html');
})

app.get('/appointments', function(req, res){
    res.sendFile(__dirname+'/pages/appointments.html');
})

app.get('/admin', function(req, res){
    res.sendFile(__dirname+'/pages/admin.html');
})

app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/html');
    res.status(404).send("<b>pagina non trovata, mi dispiace<b>");
})

app.listen(port, function(){
    console.log("porta" + port);
})
