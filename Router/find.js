import express from "express";
import { getHistory, getStockByName, getTopStocks } from "../Controllers/find.js";


const router = express.Router();

router.get("/top/:limit",getTopStocks);

router.get("/name/:name",getStockByName);

router.get("/history/:code/:limit",getHistory);


export default router;