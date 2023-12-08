import asyncHandler from 'express-async-handler'
import { Request, Response } from 'express';
import bcrypt from "bcrypt";
import { generateRefreshToken, generateToken } from '../config/jwt';
import RegularUser, { RegularUserInterface } from '../model/RegularUserModel';


const createRegularUser = asyncHandler(async (req: Request, res: Response) => {
    const { firstName, lastName, email, password, address, birthDate, rg, cpf, phoneNumber } = req.body as RegularUserInterface;
    try {
        const findByEmail = await RegularUser.findOne({ email })
        if (!findByEmail) {
            const hashedPassword = await bcrypt.hash(password, 15)
            const newRegularUser = new RegularUser({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                address,
                birthDate: new Date(birthDate),
                phoneNumber,
                rg,
                cpf,
                type: 'regular'
            })
            const savedRegularUser = await newRegularUser.save()
            res.status(201).json({ success: true, data: savedRegularUser })
        }
        res.status(400).json({ success: false, data: "Usuário já cadastrado" })
    } catch (ex: any) {
        throw ex;
    }
})

const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const findUser = await RegularUser.findOne({ email });
    console.log(findUser)

    if (findUser && await bcrypt.compare(password, findUser.password)) {
        const refreshToken = generateRefreshToken(findUser._id)
        await RegularUser.findByIdAndUpdate(
            findUser._id,
            {
                refreshToken: refreshToken,
            },
            { new: true }
        );
        res.status(200).json({
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

const getOneRegularUser = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.body;
    const findById = await RegularUser.findOne({ id })
    if (!findById) {
        res.status(400).json({ success: false, data: "Usuário não cadastrado" })
    }
    res.status(200).json({ success: true, data: findById })
})

const getAllRegularUser = asyncHandler(async (req: Request, res: Response) => {
    const findAll = await RegularUser.find()

    if (!findAll || findAll.length === 0) {
        res.status(400).json({ success: false, data: "Usuários não cadastrados" })
    }
    res.status(200).json({ success: true, data: findAll })
})

const updateOneRegularUser = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params
    const { firstName, lastName, email, password, address, birthDate, profileImageUrl } = req.body;
    try {
        const updatedUser = await RegularUser.findByIdAndUpdate(id, {
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

const DeleteOneRegularUser = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        await RegularUser.findByIdAndDelete(id)
        res.status(200).json({ success: true, data: "Usuário deletado" })
    } catch (err) {
        console.error(err)
        res.status(400).json({ success: false, data: "Usuário deletado" })
    }
})



export {
    createRegularUser,
    loginUser,
    getOneRegularUser,
    getAllRegularUser,
    updateOneRegularUser,
    DeleteOneRegularUser
}