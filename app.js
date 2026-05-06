import express from 'express';

const app = express();
const port = 3000;

app.get('/login', function(req, res){
    res.send("nome utente e password");
})

app.get('/registrati', function(req, res){
    res.send("inserisci i tuoi dati per la registrazione");
})

app.get('/pronota', function(req, res){
    res.send("quando vuoi prenotare?");
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

// login
// registrati
// prenota appuntamento
// visualizza appuntamenti
// schermata admin cancella e manipola appuntamenti

app.listen(port, function(){
    console.log("porta" + port);
})
