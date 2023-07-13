import express from "express";
import BoardController from "../controllers/BoardController.js";
// import ListController from "../controllers/ListController.js";
// import CardController from "../controllers/CardController.js";
import { protectedEndpoint } from "./middlewares/auth.js";

const router = express.Router();

// Board
router.get("/list/:boardId", protectedEndpoint,  BoardController.getListsByBoardId);
router.post("/", protectedEndpoint, BoardController.createBoard);

//List
// router.get("/list/:id", protectedEndpoint, ListController.createList);

export default router;