import asyncHanlder from 'express-async-handler'
import RegularUserModel from '../model/RegularUserModel';
import { Request, Response } from 'express';

const createRegularUser = asyncHanlder(async (req: Request, res: Response) => {
    const { firstName, lastName, email, password, address, birthDate, profileImageUrl } = req.body;

    const findByEmail = await RegularUserModel.findOne({ email })

    if (!findByEmail) {
        const newRegularUser = new RegularUserModel({
            firstName,
            lastName,
            email,
            password,
            address,
            birthDate,
            profileImageUrl
        })

        const savedRegularUser = await newRegularUser.save()

        res.status(201).json(savedRegularUser)
    }
    res.status(400).json("Usuário já cadastrado")
})

const getOneRegularUser = asyncHanlder(async (req: Request, res: Response) => {
    const { id } = req.body;

    const findById = await RegularUserModel.findOne({ id })

    if (!findById) {
        res.status(400).json("Usuário não encontrado")
    }
    res.status(200).json(findById)
})

const getAllRegularUser = asyncHanlder(async (req: Request, res: Response) => {
    const findAll = await RegularUserModel.find()

    if (!findAll) {
        res.status(400).json("Usuários não encontrados")
    }
    res.status(200).json(findAll)
})

const updateOneRegularUser = asyncHanlder(async (req: Request, res: Response) => {
    const { id } = req.params
    const { firstName, lastName, email, password, address, birthDate, profileImageUrl } = req.body;
    try {
        const updatedUser = await RegularUserModel.findByIdAndUpdate(id, {
            firstName,
            lastName,
            email,
            password,
            address,
            birthDate,
            profileImageUrl,
        }, { new: true })

        res.status(200).json(updatedUser)
    } catch (err) {
        console.error(err)
        res.status(400).json("Usuário não encontrado")
    }
})

const DeleteOneRegularUser = asyncHanlder(async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const deletedUser = await RegularUserModel.findByIdAndDelete(id)
        res.status(200).json(deletedUser)
    } catch (err) {
        console.error(err)
        res.status(400).json("Usuário não encontrado")
    }
})



export {
    createRegularUser,
    getOneRegularUser,
    getAllRegularUser,
    updateOneRegularUser,
    DeleteOneRegularUser
}