import { Request, Response } from "express";
import * as service from "../services/employeeService";
import { ApiResponse } from "../models/response/ApiResponse";
import { Employee } from "../models/Employee";

export const getEmployees = async (req: Request, res: Response) => {
    try {
        const employees = await service.getAllEmployees();

        const response: ApiResponse<Employee[]> = {
            success: true,
            data: employees,
        };

        res.status(200).json(response);
    } catch {
        res.status(500).json({ success: false, message: "Failed to fetch employees" });
    }
};

export const getEmployeeById = async (req: Request, res: Response) => {
    try {
        const employee = await service.getEmployeeById(req.params.id);

        if (!employee) {
            return res.status(404).json({ success: false, message: "Employee not found" });
        }

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
        const newEmployee = await service.createEmployee(req.body);

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
        const updated = await service.updateEmployee(req.params.id, req.body);

        if (!updated) {
            return res.status(404).json({ success: false, message: "Employee not found" });
        }

        const response: ApiResponse<Employee> = {
            success: true,
            data: updated,
        };

        res.status(200).json(response);
    } catch {
        res.status(500).json({ success: false, message: "Failed to update employee" });
    }
};

export const deleteEmployee = async (req: Request, res: Response) => {
    try {
        const deleted = await service.deleteEmployee(req.params.id);

        if (!deleted) {
            return res.status(404).json({ success: false, message: "Employee not found" });
        }

        res.status(200).json({ success: true, message: "Employee deleted" });
    } catch {
        res.status(500).json({ success: false, message: "Failed to delete employee" });
    }
};
