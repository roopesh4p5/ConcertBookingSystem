
import { Request, Response } from 'express';
import { User } from '../models/user.model';

export const getUsers =async (req: Request, res: Response) => {
    try{
        const users =await User.findAll();
        res.json(users);
    }catch(error){
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};
