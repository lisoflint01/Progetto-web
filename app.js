import express from 'express';

const app = express();
const port = 3000;

app.get('/login', function(req, res){
    res.send("nome utente e password");
})

app.get('/newpatient', function(req, res){
    res.send("inserisci i tuoi dati per la registrazione");
})

app.get('/appuntamenti', function(req, res){
    res.send("1 febbraio, 2 febbraio, 3 febbraio");
})

app.get('/admin', function(req, res){
    res.setHeader('Content-Type', 'text/html');
    res.send("gestione appuntamenti admin");
})

app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/html');
    res.status(404).send("<b>pagina non trovata, mi dispiace<b>");
})

app.listen(port, function(){
    console.log("porta" + port);
})
