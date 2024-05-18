import express from "express";
import { addToFav, getFav, removeFev } from "../Controllers/favourite.js";


const router = express.Router();

router.post("/add",addToFav);

router.get("/see/:userId",getFav);

router.delete("/remove",removeFev);

export default router;