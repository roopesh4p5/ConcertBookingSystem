
import { Request, Response } from 'express';
import { User } from '../models/user.model';

export const getUsers =async (req: Request, res: Response) => {
    try{
        const users =await User.findAll();
        res.json({ message: 'Users fetched successfully', data: users });
        console.log('Users fetched successfully:', users);
    }catch(error){
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};

export const createUser = async (req: Request, res: Response) => {
    try{
        const { name, email } = req.body;
        const newUser = await User.create({ name, email });
        console.log('User created successfully:', newUser);
        res.status(201).json({ message: 'User created successfully', data: newUser });
    }catch(error){
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Failed to create user' });
    }
};

// Bulk upload users from an xls file
export const bulkuploadUsers = async (req: Request, res: Response) => {
    try{
        // Logic to handle bulk upload from xls file
        res.status(200).json({ message: 'Bulk upload successful' });
    }catch(error){
        console.error('Error in bulk upload:', error);
        res.status(500).json({ error: 'Failed to bulk upload users' });
    }
};