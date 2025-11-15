import { Request, Response } from "express";
import * as branchService from "../services/branchService";
import { ApiResponse } from "../models/response/ApiResponse";


export const createBranch = async (req: Request, res: Response) => {
    try {
        const newBranch = await branchService.createBranch(req.body);
        return res.status(201).json(ApiResponse.success(newBranch));
    } catch (error: any) {
        return res.status(500).json(ApiResponse.error(error.message));
    }
};

export const getBranches = async (req: Request, res: Response) => {
    try {
        const branches = await branchService.getAllBranches();
        return res.status(200).json(ApiResponse.success(branches));
    } catch (error: any) {
        return res.status(500).json(ApiResponse.error(error.message));
    }
};

export const getBranchById = async (req: Request, res: Response) => {
    try {
        const branch = await branchService.getBranchById(req.params.id);

        if (!branch) {
            return res.status(404).json(ApiResponse.error("Branch not found"));
        }

        return res.status(200).json(ApiResponse.success(branch));
    } catch (error: any) {
        return res.status(500).json(ApiResponse.error(error.message));
    }
};

export const updateBranch = async (req: Request, res: Response) => {
    try {
        const updated = await branchService.updateBranch(req.params.id, req.body);

        if (!updated) {
            return res.status(404).json(ApiResponse.error("Branch not found"));
        }

        return res.status(200).json(ApiResponse.success(updated));
    } catch (error: any) {
        return res.status(500).json(ApiResponse.error(error.message));
    }
};

export const deleteBranch = async (req: Request, res: Response) => {
    try {
        const success = await branchService.deleteBranch(req.params.id);

        if (!success) {
            return res.status(404).json(ApiResponse.error("Branch not found"));
        }

        return res.status(200).json(ApiResponse.success({ deleted: true }));
    } catch (error: any) {
        return res.status(500).json(ApiResponse.error(error.message));
    }
};
