import { Request, Response } from 'express';
import { Seat } from '../models/seat.model';
import { User } from '../models/user.model';

export const createBooking = async (req: Request, res: Response) => {
    try {
        const { seatId, userId } = req.body;

        console.log('response:', seatId, userId);
        const seat = await Seat.findOne({
            where: {
                seatNumber: seatId
            }
        });
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        if (userId) {
            const user = await User.findOne({
                where: {
                    uuid: userId
                }
            });
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
        }
        if (!seat) {
            return res.status(404).json({ error: 'Seat not found' });
        }
        if (!seat.isAvailable) {
            return res.status(400).json({ error: 'Seat is already booked' });
        }
        seat.isAvailable = false;
        await seat.save();

        res.status(201).json({
            message: 'Booking created successfully',
        });
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ error: 'Failed to create booking' });
    }
};


export const getBookings = async (req: Request, res: Response) => {
    try {
        const bookings = await Seat.findAll({
            where: {
                isAvailable: false
            }
        });
        res.status(200).json({
            message: 'Bookings fetched successfully',
            data: bookings
        });
    }catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ error: 'Failed to fetch bookings' });
    }
}