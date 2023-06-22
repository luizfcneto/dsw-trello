import express from "express";
import BoardController from "../controllers/BoardController.js";

const router = express.Router();

router.get("/:id",  BoardController.getBoardById);

router.post("/", BoardController.createBoard);

export default router;