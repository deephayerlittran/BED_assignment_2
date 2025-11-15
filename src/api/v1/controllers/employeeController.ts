import { Request, Response } from "express";
import * as service from "../services/employeeService";
import { ApiResponse } from "../models/response/ApiResponse";
import { Employee } from "../models/Employee";

export const getEmployees = async (req: Request, res: Response) => {
    const employees = await service.getAllEmployees();

    const response: ApiResponse<Employee[]> = {
        success: true,
        data: employees
    };

    res.status(200).json(response);
};

export const getEmployeeById = async (req: Request, res: Response) => {
    const employee = await service.getEmployeeById(req.params.id);

    if (!employee) {
        return res.status(404).json({
            success: false,
            data: null,
            message: "Employee not found"
        });
    }

    const response: ApiResponse<Employee | null> = {
        success: true,
        data: employee
    };

    res.status(200).json(response);
};

export const createEmployee = async (req: Request, res: Response) => {
    const employee = await service.createEmployee(req.body);

    const response: ApiResponse<Employee | null> = {
        success: true,
        data: employee
    };

    res.status(201).json(response);
};

export const updateEmployee = async (req: Request, res: Response) => {
    const updated = await service.updateEmployee(req.params.id, req.body);

    if (!updated) {
        return res.status(404).json({
            success: false,
            data: null,
            message: "Employee not found"
        });
    }

    const response: ApiResponse<Employee | null> = {
        success: true,
        data: updated
    };

    res.status(200).json(response);
};

export const deleteEmployee = async (req: Request, res: Response) => {
    const deleted = await service.deleteEmployee(req.params.id);

    if (!deleted) {
        return res.status(404).json({
            success: false,
            data: null,
            message: "Employee not found"
        });
    }

    res.status(200).json({
        success: true,
        data: null
    });
};
