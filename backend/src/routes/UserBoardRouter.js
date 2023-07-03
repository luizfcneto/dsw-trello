import express from "express";
import UserBoardController from "../controllers/UserBoardController.js";
import { protectedEndpoint } from "./middlewares/auth.js";

const router = express.Router();

router.post('/board/:boardId/user/:userId', protectedEndpoint, UserBoardController.saveUserBoard);
router.get('/user/:userId/boards', protectedEndpoint, UserBoardController.getUserBoards);

export default router;