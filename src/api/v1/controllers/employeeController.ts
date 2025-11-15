import { Request, Response } from "express";
import * as service from "../services/employeeService";
import { ApiResponse } from "../models/response/ApiResponse";

export const getEmployees = async (req: Request, res: Response) => {
    const employees = await service.getAllEmployees();

    const response: ApiResponse<typeof employees> = {
        success: true,
        data: employees,
    };

    res.status(200).json(response);
};

export const getEmployeeById = async (req: Request, res: Response) => {
    const employee = await service.getEmployeeById(req.params.id);

    if (!employee) {
        return res.status(404).json({
            success: false,
            data: null,
            message: "Employee not found",
        });
    }

    const response: ApiResponse<typeof employee> = {
        success: true,
        data: employee,
    };

    res.status(200).json(response);
};

export const createEmployee = async (req: Request, res: Response) => {
    const newEmployee = await service.createEmployee(req.body);

    const response: ApiResponse<typeof newEmployee> = {
        success: true,
        data: newEmployee,
    };

    res.status(201).json(response);
};

export const updateEmployee = async (req: Request, res: Response) => {
    const updated = await service.updateEmployee(req.params.id, req.body);

    if (!updated) {
        return res.status(404).json({
            success: false,
            data: null,
            message: "Employee not found",
        });
    }

    const response: ApiResponse<typeof updated> = {
        success: true,
        data: updated,
    };

    res.status(200).json(response);
};

export const deleteEmployee = async (req: Request, res: Response) => {
    const deleted = await service.deleteEmployee(req.params.id);

    if (!deleted) {
        return res.status(404).json({
            success: false,
            data: null,
            message: "Employee not found",
        });
    }

    const response: ApiResponse<null> = {
        success: true,
        data: null,
        message: "Employee deleted",
    };

    res.status(200).json(response);
};
