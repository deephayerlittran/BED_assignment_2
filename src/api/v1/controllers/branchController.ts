import { Request, Response } from "express";
import * as service from "../services/branchService";
import { ApiResponse } from "../models/response/ApiResponse";
import { Branch } from "../models/Branch";

export const getBranches = async (req: Request, res: Response) => {
    try {
        const branches = await service.getAllBranches();

        const response: ApiResponse<Branch[]> = {
            success: true,
            data: branches,
        };

        res.status(200).json(response);
    } catch {
        res.status(500).json({ success: false, message: "Failed to fetch branches" });
    }
};

export const getBranchById = async (req: Request, res: Response) => {
    try {
        const branch = await service.getBranchById(req.params.id);

        if (!branch) {
            return res.status(404).json({ success: false, message: "Branch not found" });
        }

        const response: ApiResponse<Branch> = {
            success: true,
            data: branch,
        };

        res.status(200).json(response);
    } catch {
        res.status(500).json({ success: false, message: "Failed to fetch branch" });
    }
};

export const createBranch = async (req: Request, res: Response) => {
    try {
        const newBranch = await service.createBranch(req.body);

        const response: ApiResponse<Branch> = {
            success: true,
            data: newBranch,
        };

        res.status(201).json(response);
    } catch {
        res.status(500).json({ success: false, message: "Failed to create branch" });
    }
};

export const updateBranch = async (req: Request, res: Response) => {
    try {
        const updated = await service.updateBranch(req.params.id, req.body);

        if (!updated) {
            return res.status(404).json({ success: false, message: "Branch not found" });
        }

        const response: ApiResponse<Branch> = {
            success: true,
            data: updated,
        };

        res.status(200).json(response);
    } catch {
        res.status(500).json({ success: false, message: "Failed to update branch" });
    }
};

export const deleteBranch = async (req: Request, res: Response) => {
    try {
        const deleted = await service.deleteBranch(req.params.id);

        if (!deleted) {
            return res.status(404).json({ success: false, message: "Branch not found" });
        }

        res.status(200).json({ success: true, message: "Branch deleted" });
    } catch {
        res.status(500).json({ success: false, message: "Failed to delete branch" });
    }
};
