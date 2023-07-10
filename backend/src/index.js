import express from "express";
import session from "express-session";
import UserRouter from "./routes/UserRouter.js";
import { enableCors } from "./routes/middlewares/cors.js";
import BoardRouter from "./routes/BoardRouter.js";
import UserBoardRouter from "./routes/UserBoardRouter.js";

let app = express();
const PORT = 3000;
const HOSTNAME = "localhost";

// server configuration
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Routes:
app.use('/user', enableCors, UserRouter);
app.use('/board', enableCors, BoardRouter);
app.use('/userBoard', enableCors, UserBoardRouter);

app.listen(PORT, HOSTNAME, (error) => {
    if(error){
        console.log("Aconteceu alguma coisa inesperada");
        return;
    }else {
        console.log(`Servidor rodando em: http://${HOSTNAME}:${PORT}`);
    }
});
