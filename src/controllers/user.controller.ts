
import { Request, Response } from 'express';
import { User } from '../models/user.model';
import * as XLSX from 'xlsx';


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



export const bulkuploadUsers = async (req: Request, res: Response) => {

    try {
        const users = req.body;
        const createdUsers = await User.bulkCreate(users);
        console.log('Bulk users created successfully:', createdUsers);
        res.status(201).json({ message: 'Bulk users created successfully', data: createdUsers });
    } catch (error) {
        console.error('Error bulk creating users:', error);
        res.status(500).json({ error: 'Failed to bulk create users' });
    }  
};

export const bulkUploadUsersFromXLS =  async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({
        message: 'No file uploaded. Please upload an Excel file.',
      });
      return;
    }

    // Read the Excel workbook from memory buffer
    const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const rawData = XLSX.utils.sheet_to_json<any>(worksheet); 

    if (!rawData || rawData.length === 0) {
      res.status(400).json({
        message: 'The uploaded Excel file is empty.',
      });
      return;
    }

    // Map spreadsheet headers to model properties (case-insensitive and trimmed)
    const validUsers = rawData
      .map((row: any) => {
        const emailKey = Object.keys(row).find((k) => k.trim().toLowerCase() === 'email');
        const nameKey = Object.keys(row).find((k) => k.trim().toLowerCase() === 'name');

        return {
          email: emailKey ? String(row[emailKey]).trim() : '',
          name: nameKey ? String(row[nameKey]).trim() : null,
        };
      })
      .filter((u) => u.email); // Filter out rows without email

    if (validUsers.length === 0) {
      res.status(400).json({
        message: 'No valid user rows with "Email" column found.',
      });
      return;
    }

    // Get all unique emails we are trying to insert from payload
    const emailsToInsert = Array.from(new Set(validUsers.map((u: any) => u.email)));

    // Find which of these already exist in DB
    const existingUsers = await User.findAll({
      where: {
        email: emailsToInsert,
      },
    });

    const existingEmails = new Set(existingUsers.map((u) => u.email));

    // Filter out users whose email is already in the database, and also de-duplicate within payload
    const uniqueUsersToCreate: any[] = [];
    const seenEmails = new Set<string>();

    for (const u of validUsers) {
      if (!existingEmails.has(u.email) && !seenEmails.has(u.email)) {
        seenEmails.add(u.email);
        uniqueUsersToCreate.push(u);
      }
    }

    if (uniqueUsersToCreate.length === 0) {
      res.status(400).json({
        message: 'All user emails in the Excel file already exist in the database.',
      });
      return;
    }

    const createdUsers = await User.bulkCreate(
      uniqueUsersToCreate.map((u: any) => ({
        email: u.email,
        name: u.name || null,
      }))
    );

    res.status(201).json({
      message: 'bulk upload user created',
      users: createdUsers,
      skippedCount: validUsers.length - uniqueUsersToCreate.length,
    });
  } catch (error) {
    console.error('Error bulk uploading users:', error);
    res.status(500).json({
      message: 'Failed to bulk upload users',
      error: error instanceof Error ? error.message : String(error),
    });
  }
};


