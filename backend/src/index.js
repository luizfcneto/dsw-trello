import express from "express";
import session from "express-session";
import userRouter from "./routes/user.js";
import authRouter from "./routes/auth.js";

let app = express();
const PORT = 3000;
const HOSTNAME = "localhost";

// server configuration
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Routes:
app.use('/users', userRouter);
app.use("/", authRouter);

app.listen(PORT, HOSTNAME, (error) => {
    if(error){
        console.log("Aconteceu alguma coisa inesperada");
        return;
    }else {
        console.log(`Servidor rodando em: http://${HOSTNAME}:${PORT}`);
    }
});