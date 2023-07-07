import express from "express";
import BoardController from "../controllers/BoardController.js";
import { protectedEndpoint } from "./middlewares/auth.js";

const router = express.Router();

router.get("/:id", protectedEndpoint,  BoardController.getBoardById);

router.post("/", protectedEndpoint, BoardController.createBoard);

export default router;