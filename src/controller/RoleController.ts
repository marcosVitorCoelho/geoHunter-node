import asyncHandler from 'express-async-handler'
import { Request, Response } from 'express';
import Role, { RoleInterface } from '../model/roleModel';

const createRole = asyncHandler(async (req: Request, res: Response) => {
  const { title, description } = req.body as RoleInterface;
  try {
    const findByEmail = await Role.findOne({ title })
    if (!findByEmail) {
      const newRole = new Role({
        title, description
      })
      const savedRole = await newRole.save()
      res.status(201).json({ success: true, data: savedRole })
    }
    res.status(400).json({ success: false, data: "Categoria já cadastrada" })
  } catch (ex: any) {
    throw ex;
  }
})

const getOneRole = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const findById = await Role.findById(id);

    if (!findById) {
      res.status(404).json({ success: false, data: "Role not found" });
    } else {
      res.status(200).json({ success: true, data: findById });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, data: "Error finding role" });
  }
});

const getAllRoles = asyncHandler(async (req: Request, res: Response) => {
  try {
    const findAll = await Role.find();

    if (!findAll || findAll.length === 0) {
      res.status(404).json({ success: false, data: "No roles found" });
    } else {
      res.status(200).json({ success: true, data: findAll });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, data: "Error fetching roles" });
  }
});

const updateOneRole = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const updatedRole = await Role.findByIdAndUpdate(
      id,
      {
        title,
        description,
      },
      { new: true }
    );

    if (!updatedRole) {
      res.status(404).json({ success: false, data: "Role not found" });
    } else {
      res.status(200).json({ success: true, data: updatedRole });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, data: "Error updating role" });
  }
});

const deleteOneRole = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await Role.findByIdAndDelete(id);
    res.status(200).json({ success: true, data: "Role deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, data: "Error deleting role" });
  }
});

export {
  createRole,
  getOneRole,
  getAllRoles,
  updateOneRole,
  deleteOneRole,
};