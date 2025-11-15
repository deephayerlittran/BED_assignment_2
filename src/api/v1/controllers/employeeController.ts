import { Request, Response } from "express";
import { db } from "../../../../config/firebaseConfig";
import { Employee } from "../models/Employee";
import { ApiResponse } from "../models/response/ApiResponse";

const collection = db.collection("employees");

export const getEmployees = async (req: Request, res: Response) => {
    try {
        const snapshot = await collection.get();
        const employees: Employee[] = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as Employee[];

        const response: ApiResponse<Employee[]> = {
            success: true,
            data: employees,
        };

        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to fetch employees" });
    }
};

export const getEmployeeById = async (req: Request, res: Response) => {
    try {
        const ref = await collection.doc(req.params.id).get();

        if (!ref.exists) {
            return res.status(404).json({ success: false, message: "Employee not found" });
        }

        const employee = { id: ref.id, ...ref.data() } as Employee;

        const response: ApiResponse<Employee> = {
            success: true,
            data: employee,
        };

        res.status(200).json(response);
    } catch {
        res.status(500).json({ success: false, message: "Failed to fetch employee" });
    }
};

export const createEmployee = async (req: Request, res: Response) => {
    try {
        const docRef = await collection.add(req.body);
        const newEmployee = { id: docRef.id, ...req.body } as Employee;

        const response: ApiResponse<Employee> = {
            success: true,
            data: newEmployee,
        };

        res.status(201).json(response);
    } catch {
        res.status(500).json({ success: false, message: "Failed to create employee" });
    }
};

export const updateEmployee = async (req: Request, res: Response) => {
    try {
        const ref = collection.doc(req.params.id);
        const existing = await ref.get();

        if (!existing.exists) {
            return res.status(404).json({ success: false, message: "Employee not found" });
        }

        await ref.update(req.body);

        const updatedEmployee = { id: ref.id, ...req.body } as Employee;

        const response: ApiResponse<Employee> = {
            success: true,
            data: updatedEmployee,
        };

        res.status(200).json(response);
    } catch {
        res.status(500).json({ success: false, message: "Failed to update employee" });
    }
};

export const deleteEmployee = async (req: Request, res: Response) => {
    try {
        const ref = collection.doc(req.params.id);
        const existing = await ref.get();

        if (!existing.exists) {
            return res.status(404).json({ success: false, message: "Employee not found" });
        }

        await ref.delete();

        const response: ApiResponse<null> = {
            success: true,
            message: "Employee deleted",
        };

        res.status(200).json(response);
    } catch {
        res.status(500).json({ success: false, message: "Failed to delete employee" });
    }
};
