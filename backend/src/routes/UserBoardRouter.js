import express from "express";
import UserBoardController from "../controllers/UserBoardController.js";
import { protectedEndpoint } from "./middlewares/auth.js";

const router = express.Router();

router.get('/user/boards', protectedEndpoint, UserBoardController.getAllUserBoards);

export default router;