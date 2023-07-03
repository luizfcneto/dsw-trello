import express from "express";
import UserBoardController from "../controllers/UserBoardController.js";
import { protectedEndpoint } from "./middlewares/auth.js";

const router = express.Router();

router.post('/board/:boardId/user/:userId', UserBoardController.postUserBoard);
router.get('/user/:userId/boards', UserBoardController.getBoards);

export default router;