import express from "express";
import session from "express-session";
import userRouter from "./routes/userRouter.js";

let app = express();
const PORT = 3000;
const HOSTNAME = "localhost";

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/users', userRouter);

app.listen(PORT, HOSTNAME, (error) => {
    if(error){
        console.log("Aconteceu alguma coisa inesperada");
        return;
    }else {
        console.log(`Servidor rodando em: http://${HOSTNAME}:${PORT}`);
    }
});