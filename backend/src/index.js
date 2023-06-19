import express from "express";
import bodyParser from "body-parser";
import session from "express-session";

let app = express();
const PORT = 3000;
const HOSTNAME = "localhost";

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res, next) {
    res.json({
        message: "Ola Mundo"
    });
});


app.listen(PORT, HOSTNAME, (error) => {
    if(error){
        console.log("Aconteceu alguma coisa inesperada");
        return;
    }else {
        console.log(`Servidor rodando em: http://${HOSTNAME}:${PORT}`);
    }
});