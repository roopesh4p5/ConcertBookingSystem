import { Router } from "express";
import { createSeats, getSeats } from "../controllers/seats.controller";
const router = Router();



/**
 * openapi
 * @swagger
 * /api/seats:
 *   post:
 *     tags:
 *       - Seats
 *     summary: Create a new seat
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               seatNumber:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: Seat created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/seats', createSeats);



/**
 * openapi
 * @swagger
 * /api/seats:
 *   get:
 *     tags:
 *       - Seats
 *     summary: Get all seats
 *     responses:
 *       200:
 *         description: A list of seats
 *       500:
 *         description: Internal server error
 */
router.get('/seats', getSeats);

export default router;