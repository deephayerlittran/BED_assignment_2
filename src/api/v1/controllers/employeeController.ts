import { Request, Response } from "express";
import * as service from "../services/employeeService";
import { ApiResponse } from "../models/response/ApiResponse";

export const getEmployees = async (req: Request, res: Response) => {
    try {
        const employees = await service.getAllEmployees();
        return res.status(200).json(ApiResponse.success(employees));
    } catch (error: any) {
        return res.status(500).json(ApiResponse.error("Failed to fetch employees", error));
    }
};

export const getEmployeeById = async (req: Request, res: Response) => {
    try {
        const employee = await service.getEmployeeById(req.params.id);

        if (!employee) {
            return res.status(404).json(ApiResponse.error("Employee not found"));
        }

        return res.status(200).json(ApiResponse.success(employee));
    } catch (error) {
        return res.status(500).json(ApiResponse.error("Failed to fetch employee", error));
    }
};

export const createEmployee = async (req: Request, res: Response) => {
    try {
        const employee = await service.createEmployee(req.body);
        return res.status(201).json(ApiResponse.success(employee));
    } catch (error) {
        return res.status(500).json(ApiResponse.error("Failed to create employee", error));
    }
};

export const updateEmployee = async (req: Request, res: Response) => {
    try {
        const updated = await service.updateEmployee(req.params.id, req.body);

        if (!updated) {
            return res.status(404).json(ApiResponse.error("Employee not found"));
        }

        return res.status(200).json(ApiResponse.success(updated));
    } catch (error) {
        return res.status(500).json(ApiResponse.error("Failed to update employee", error));
    }
};

export const deleteEmployee = async (req: Request, res: Response) => {
    try {
        const deleted = await service.deleteEmployee(req.params.id);

        if (!deleted) {
            return res.status(404).json(ApiResponse.error("Employee not found"));
        }

        return res.status(200).json(ApiResponse.success({ deleted: true }));
    } catch (error) {
        return res.status(500).json(ApiResponse.error("Failed to delete employee", error));
    }
};
