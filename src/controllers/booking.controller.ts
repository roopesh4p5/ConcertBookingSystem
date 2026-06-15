import { Request, Response } from 'express';
import { Seat } from '../models/seat.model';
import { User } from '../models/user.model';
import { booking } from '../models/booking.model';
import { sequelize } from '../config/dbconfig';


// export const createBooking = async (req: Request, res: Response) => {
//     try {
//         const { seatId, userId } = req.body;

//         console.log('response:', seatId, userId);
//         const seat = await Seat.findOne({
//             where: {
//                 seatNumber: seatId
//             }
//         });
//         if (!userId) {
//             return res.status(400).json({ error: 'User ID is required' });
//         }
//         if (userId) {
//             const user = await User.findOne({
//                 where: {
//                     uuid: userId
//                 }
//             });
//             if (!user) {
//                 return res.status(404).json({ error: 'User not found' });
//             }
//         }
//         if (!seat) {
//             return res.status(404).json({ error: 'Seat not found' });
//         }
//         if (!seat.isAvailable) {
//             return res.status(400).json({ error: 'Seat is already booked' });
//         }


//         await new Promise(resolve => setTimeout(resolve, 50));
//         seat.isAvailable = false;
//         await seat.save();
//         await booking.create({
//             seatNumber: seatId,
//             UserId: userId,
//             bookingStatus: 'booked'
//         });


//         res.status(201).json({
//             message: 'Booking created successfully',
//         });
//     } catch (error) {
//         console.error('Error creating booking:', error);
//         res.status(500).json({ error: 'Failed to create booking' });
//     }
// };


export const createBooking = async (req: Request, res: Response) => {
    const { seatId, userId } = req.body;
    console.log('response:', seatId, userId);

    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    const transaction = await sequelize.transaction();
    try {
       
        const user = await User.findOne({
            where: {
                uuid: userId
            },
            transaction
        });
        if (!user) {
            await transaction.rollback();
            return res.status(404).json({ error: 'User not found' });
        }

        const seat = await Seat.findOne({
            where: {
                seatNumber: seatId
            },
            lock: transaction.LOCK.UPDATE,

            transaction
        });

        if (!seat) {
            await transaction.rollback();
            return res.status(404).json({ error: 'Seat not found' });
        }
        if (!seat.isAvailable) {
            await transaction.rollback();
            return res.status(400).json({ error: 'Seat is already booked' });
        }

      
        seat.isAvailable = false;
        await seat.save({ transaction });

        await booking.create({
            seatNumber: seatId,
            UserId: userId,
            bookingStatus: 'booked'
        }, { transaction });

        await transaction.commit();
     

        res.status(201).json({
            message: 'Booking created successfully',
        });
    } catch (error) {
        try {
            await transaction.rollback();
        } catch (rollbackError) {
            // Ignore rollback errors if transaction was already finished or connection closed
        }
        console.error('Error creating booking:', error);
        res.status(500).json({ error: 'Failed to create booking' });
    }
};


export const getBookings = async (req: Request, res: Response) => {
    try {
        const bookings = await booking.findAll();
        res.status(200).json({
            message: 'Bookings fetched successfully',
            data: bookings
        });
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ error: 'Failed to fetch bookings' });
    }
}


export const cancelBooking = async (req: Request, res: Response) => {
    const { seatId, userId } = req.body;
    try {
        const seat = await Seat.findOne({
            where: {
                seatNumber: seatId
            }
        });
        if (!seat) {
            return res.status(404).json({ error: 'Seat not found' });
        }
        seat.isAvailable = true;
        await seat.save();
        res.status(200).json({
            message: 'Booking cancelled successfully',
        });
    } catch (error) {
        console.error('Error cancelling booking:', error);
        res.status(500).json({ error: 'Failed to cancel booking' });
    }
}   
        