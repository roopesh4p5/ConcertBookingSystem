import { Router } from "express";
import { createBooking, getBookings, cancelBooking  } from "../controllers/booking.controller";
// 
// swagger
import swaggerJsdoc from 'swagger-jsdoc';
const router = Router();


/**
 * openapi
 * @swagger
 * /api/bookings:
 *   post:
 *     tags:
 *       - Bookings
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
 *     tags:
 *       - Bookings
 *     summary: Get all bookings
 *     responses:
 *       200:
 *         description: A list of bookings
 *       500:
 *         description: Internal server error
 */
router.get('/bookings', getBookings);


/**
 * openapi
 * @swagger
 * /api/bookings/cancel:
 *   delete:
 *     tags:
 *       - Bookings
 *     summary: Cancel a booking
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
 *       200:
 *         description: Booking cancelled successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: User or Seat not found
 *       500:
 *         description: Internal server error
 */
router.delete('/bookings/cancel', cancelBooking);






export default router;