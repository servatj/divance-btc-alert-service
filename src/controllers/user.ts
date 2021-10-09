import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { User } from '../models/user'

const prisma = new PrismaClient()

const getUsers = async (req: Request, res: Response)  => {
    const users = await prisma.user.findMany();
    return res.status(200).json({
        message: users
    });
}

export default { getUsers }