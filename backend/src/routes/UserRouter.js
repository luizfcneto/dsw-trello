import express from "express";
import UserController from "../controllers/UserController.js";
import { protectedEndpoint } from "./middlewares/auth.js";

const router = express.Router();

router.get("/:id",  UserController.getUserById);

router.post("/", UserController.createUser);

router.post("/login", UserController.login);

/**
 *  protectedEndpoint é um middleware que é executado antes do UserController.logout
 *  no fim da execução do protectedEndpoint é feito um foward
*/ 
router.post("/logout", protectedEndpoint, UserController.logout);

export default router;