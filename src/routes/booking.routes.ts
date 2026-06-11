import { Router } from "express";
import { createBooking, getBookings  } from "../controllers/booking.controller";
// 
// swagger
import swaggerJsdoc from 'swagger-jsdoc';
const router = Router();


/**
 * openapi
 * @swagger
 * /api/bookings:
 *   post:
 *     summary: Create a new booking
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               seatId:
 *                 type: string
 *               userId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Booking created successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: User or Seat not found
 *       500:
 *         description: Internal server error
 */
router.post('/bookings', createBooking);



/** 
 * openapi
 * @swagger
 * /api/bookings:
 *   get:
 *     summary: Get all bookings
 *     responses:
 *       200:
 *         description: A list of bookings
 *       500:
 *         description: Internal server error
 */
router.get('/bookings', getBookings);

export default router;