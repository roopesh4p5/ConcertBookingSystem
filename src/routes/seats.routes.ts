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
 *               userId:
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


// add quesry filter for available seats
/**
 * openapi
 * @swagger
 * /api/seats:
 *   get:
 *     tags:
 *       - Seats
 *     summary: Get all seats
 *     parameters:
 *       - name: available
 *         in: query
 *         description: Filter seats by availability
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of seats
 *       500:
 *         description: Internal server error
 */
router.get('/seats', getSeats);

export default router;