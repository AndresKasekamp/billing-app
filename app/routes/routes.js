import { Router } from "express";
import { getOrders } from "../controllers/orderController.js";

export const router = Router();

router.get("/", getOrders);
