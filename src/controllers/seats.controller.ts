import { Request, Response } from 'express';
import { Seat } from '../models/seat.model';

export const createSeats = async (req: Request, res: Response) => {
    try {
        const { rows, columns } = req.body;
        const seatsToCreate = [];
        console.log('Creating seats with rows:', rows, 'and columns:', columns);

        for (let row = 1; row <= rows; row++) {
            const rowLetter = String.fromCharCode(64 + row); 

            for (let column = 1; column <= columns; column++) {
                const seatNumber = `${rowLetter}${column
                    .toString()
                    .padStart(2, '0')}`; 

                const seat = {
                    seatNumber,
                    isAvailable: true
                };

                seatsToCreate.push(seat);
                console.log('Prepared seat for creation:', seat);
            }
        }

        const createdSeats = await Seat.bulkCreate(seatsToCreate);

        console.log('Seats created successfully:', createdSeats.length);

        res.status(201).json({
            message: 'Seats created successfully',
            data: createdSeats
        });
    } catch (error) {
        console.error('Error creating seats:', error);

        res.status(500).json({
            error: 'Failed to create seats'
        });
    }
};

export const getSeats = async (req: Request, res: Response) => {
  try {
    const { available } = req.query;

    const whereClause: any = {};

    if (available !== undefined) {
      whereClause.isAvailable = available === 'true';
    }

    const seats = await Seat.findAll({
      where: whereClause,
    });

    res.status(200).json({
      message: 'Seats fetched successfully',
      data: seats,
    });
  } catch (error) {
    console.error('Error fetching seats:', error);

    res.status(500).json({
      error: 'Failed to fetch seats',
    });
  }
};