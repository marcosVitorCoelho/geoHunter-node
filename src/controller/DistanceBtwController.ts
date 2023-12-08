import asyncHandler from 'express-async-handler'
import { Request, Response } from 'express';
import ProUser, { ProUserInterface } from '../model/ProUserModel';
import { calculateDistance } from '../utils/getDistance';


const getDistance = asyncHandler(async (req: Request, res: Response) => {
    const { userLatitude, userLongitude, role, distance } = req.query;
    console.log(req.query)
    const maxKmDistance = Number(distance) || 1
    const userCoords = { latitude: Number(userLatitude), longitude: Number(userLongitude) }

    try {
        const proUsers = await ProUser.find({ role }).populate('role').exec();
        if (!proUsers || proUsers.length === 0) {
            res.status(404).send({ success: false, data: 'Não foram encontrados profissionais' })
        }
        const proUsersWithDistance = proUsers.map((proUser: ProUserInterface) => {
            const { latitude, longitude } = proUser.address
            const proUserCoords = { latitude, longitude }
            return {
                address: proUser.address,
                firstName: proUser.firstName,
                lastName: proUser.lastName,
                role: proUser.role,
                phoneNumber: proUser.phoneNumber,
                email: proUser.email,
                cpf: proUser.cpf,
                rg: proUser.rg,
                birthDate: proUser.birthDate,
                distance: calculateDistance(userCoords, proUserCoords)
            }
        }) as ProUserInterface[]
        console.log("PRO pela role  ", proUsersWithDistance)

        const filteredProUsersWithDistance = proUsersWithDistance.filter((proUser: ProUserInterface) => {
            return !proUser.distance || proUser.distance <= maxKmDistance
        })
        res.status(200).json({ success: true, data: filteredProUsersWithDistance })
    } catch (ex: any) {
        throw ex;
    }
})

export {
    getDistance
}