import express from "express";
import UserController from "../controllers/UserController.js";
import { protectedEndpoint } from "./middlewares/auth.js";

const router = express.Router();

router.get("/:id",  UserController.getUserById);
router.get("/", protectedEndpoint, UserController.getUserByToken);

router.post("/", UserController.createUser);

router.post("/login", UserController.login);

router.post("/recoverPassword", UserController.recoverPassword);
router.post("/savePassword", UserController.savePassword);


/**
 *  protectedEndpoint é um middleware que é executado antes do UserController.logout
 *  no fim da execução do protectedEndpoint é feito um foward
*/ 
router.post("/logout", protectedEndpoint, UserController.logout);

export default router;