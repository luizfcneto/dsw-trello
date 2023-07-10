import express from "express";
import UserCollectionBoardController from "../controllers/UserCollectionBoardController.js";
import { protectedEndpoint } from "./middlewares/auth.js";

const router = express.Router();

// Traz todas as coleções de usuário contendo os quadros
router.get('/user/boards', protectedEndpoint, UserCollectionBoardController.getAllUserCollectionBoards);


export default router;