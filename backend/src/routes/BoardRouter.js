import express from "express";
import BoardController from "../controllers/BoardController.js";
import { protectedEndpoint } from "./middlewares/auth.js";

const router = express.Router();

// Board
router.get("/list/:boardId", protectedEndpoint,  BoardController.getListsByBoardId);
router.post("/", protectedEndpoint, BoardController.createBoard);
router.delete("/:boardId", protectedEndpoint, BoardController.removeBoard);

export default router;