import express from "express";
import AuthController from "../controllers/Auth.js";
import { protectedEndpoint } from "./middlewares/auth.js";

const router = express.Router();

router.post("/login", AuthController.login);

/**
 *  protectedEndpoint é um middleware que é executado antes do AuthController.logout
 *  no fim da execução do protectedEndpoint é feito um foward
*/ 
router.post("/logout", protectedEndpoint, AuthController.logout);

export default router;