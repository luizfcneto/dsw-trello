import express from "express";
import ListController from "../controllers/ListController.js";
import { protectedEndpoint } from "./middlewares/auth.js";

const router = express.Router();

//Card
router.post("/save/:boardId", protectedEndpoint, ListController.save);
router.post("/save/", protectedEndpoint, ListController.save);

export default router;