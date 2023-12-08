import asyncHandler from 'express-async-handler'
import { Request, Response } from 'express';
import bcrypt from "bcrypt";
import { generateRefreshToken, generateToken } from '../config/jwt';
import ProUser, { ProUserInterface } from '../model/ProUserModel';
import Role, { RoleInterface } from '../model/roleModel';


const createProUser = asyncHandler(async (req: Request, res: Response) => {
    const { firstName, lastName, email, password, address, birthDate, rg, cpf, phoneNumber, role } = req.body as ProUserInterface;
    try {
        const findByEmail = await ProUser.findOne({ email })
        if (!findByEmail) {
            const hashedPassword = await bcrypt.hash(password, 15)
            const newProUser = new ProUser({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                address,
                birthDate,
                phoneNumber,
                rg,
                cpf,
                role,
                type: 'pro'
            })
            const savedProUser = await newProUser.save()
            res.status(201).json({ success: true, data: savedProUser })
        }
        res.status(400).json({ success: false, data: "Usuário já cadastrado" })
    } catch (ex: any) {
        throw ex;
    }
})

const loginProUser = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const findUser = await ProUser.findOne({ email });

    if (findUser && await bcrypt.compare(password, findUser.password)) {
        const refreshToken = generateRefreshToken(findUser._id)
        await ProUser.findByIdAndUpdate(
            findUser._id,
            {
                refreshToken: refreshToken,
            },
            { new: true }
        );
        res.json({
            success: true, data: {
                _id: findUser?._id,
                firstName: findUser?.firstName,
                lastName: findUser?.lastName,
                email: findUser?.email,
                token: generateToken(findUser?._id),
            }
        });
    } else {
        throw new Error("Invalid Credentials!");
    }
});

const getOneProUser = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.body;
    const findById = await ProUser.findOne({ id }).populate('role').exec()

    if (!findById) {
        res.status(400).json({ success: false, data: "Usuário não cadastrado" })
    } else {
        res.status(200).json({ success: true, data: findById })
    }
})

const getAllProUser = asyncHandler(async (req: Request, res: Response) => {
    const findAll = await ProUser.find().populate('role').exec()
    if (!findAll || findAll.length === 0) {
        res.status(400).json({ success: false, data: "Usuários não cadastrados" })
    }
    res.status(200).json({ success: true, data: findAll })
})

const updateOneProUser = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params
    const { firstName, lastName, email, password, address, birthDate, profileImageUrl } = req.body;
    try {
        const updatedUser = await ProUser.findByIdAndUpdate(id, {
            firstName,
            lastName,
            email,
            password,
            address,
            birthDate,
            profileImageUrl,
        }, { new: true })

        res.status(200).json({ success: true, data: updatedUser })
    } catch (err) {
        console.error(err)
        res.status(400).json({ success: false, data: "Usuário não encotrado" })
    }
})

const DeleteOneProUser = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        await ProUser.findByIdAndDelete(id)
        res.status(200).json({ success: true, data: "Usuário deletado" })
    } catch (err) {
        console.error(err)
        res.status(400).json({ success: false, data: "Usuário deletado" })
    }
})



export {
    createProUser,
    loginProUser,
    getOneProUser,
    getAllProUser,
    updateOneProUser,
    DeleteOneProUser
}