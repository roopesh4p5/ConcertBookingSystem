import { Router } from "express";
import { createSeats, getSeats } from "../controllers/seats.controller";
const router = Router();

router.post('/seats', createSeats);
router.get('/seats', getSeats);

export default router;