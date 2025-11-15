import { Request, Response } from "express";
import * as service from "../services/branchService";
import { ApiResponse } from "../models//response/ApiResponse";

export const getBranches = async (req: Request, res: Response) => {
    const branches = await service.getAllBranches();

    const response: ApiResponse<typeof branches> = {
        success: true,
        data: branches,
    };

    res.status(200).json(response);
};

export const getBranchById = async (req: Request, res: Response) => {
    const branch = await service.getBranchById(req.params.id);

    if (!branch) {
        return res.status(404).json({
            success: false,
            data: null,
            message: "Branch not found",
        });
    }

    const response: ApiResponse<typeof branch> = {
        success: true,
        data: branch,
    };

    res.status(200).json(response);
};

export const createBranch = async (req: Request, res: Response) => {
    const newBranch = await service.createBranch(req.body);

    const response: ApiResponse<typeof newBranch> = {
        success: true,
        data: newBranch,
    };

    res.status(201).json(response);
};

export const updateBranch = async (req: Request, res: Response) => {
    const updated = await service.updateBranch(req.params.id, req.body);

    if (!updated) {
        return res.status(404).json({
            success: false,
            data: null,
            message: "Branch not found",
        });
    }

    const response: ApiResponse<typeof updated> = {
        success: true,
        data: updated,
    };

    res.status(200).json(response);
};

export const deleteBranch = async (req: Request, res: Response) => {
    const deleted = await service.deleteBranch(req.params.id);

    if (!deleted) {
        return res.status(404).json({
            success: false,
            data: null,
            message: "Branch not found",
        });
    }

    const response: ApiResponse<null> = {
        success: true,
        data: null,
        message: "Branch deleted",
    };

    res.status(200).json(response);
};
