import express from "express";
import CardController from "../controllers/CardController.js";
import { protectedEndpoint } from "./middlewares/auth.js";

const router = express.Router();

//Card
router.post("/save/:cardId", protectedEndpoint, CardController.save);
router.post("/save/", protectedEndpoint, CardController.save);

export default router;