import { Request, Response } from "express";
import { db } from "../../../../config/firebaseConfig";
import { Branch } from "../models/Branch";
import { ApiResponse } from "../models/response/ApiResponse";

const collection = db.collection("branches");

export const getBranches = async (req: Request, res: Response) => {
    try {
        const snapshot = await collection.get();
        const branches: Branch[] = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as Branch[];

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
        const ref = await collection.doc(req.params.id).get();

        if (!ref.exists) {
            return res.status(404).json({ success: false, message: "Branch not found" });
        }

        const branch = { id: ref.id, ...ref.data() } as Branch;

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
        const docRef = await collection.add(req.body);
        const newBranch = { id: docRef.id, ...req.body } as Branch;

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
        const ref = collection.doc(req.params.id);
        const existing = await ref.get();

        if (!existing.exists) {
            return res.status(404).json({ success: false, message: "Branch not found" });
        }

        await ref.update(req.body);

        const updatedBranch = { id: ref.id, ...req.body } as Branch;

        const response: ApiResponse<Branch> = {
            success: true,
            data: updatedBranch,
        };

        res.status(200).json(response);
    } catch {
        res.status(500).json({ success: false, message: "Failed to update branch" });
    }
};

export const deleteBranch = async (req: Request, res: Response) => {
    try {
        const ref = collection.doc(req.params.id);
        const existing = await ref.get();

        if (!existing.exists) {
            return res.status(404).json({ success: false, message: "Branch not found" });
        }

        await ref.delete();

        const response: ApiResponse<null> = {
            success: true,
            message: "Branch deleted",
        };

        res.status(200).json(response);
    } catch {
        res.status(500).json({ success: false, message: "Failed to delete branch" });
    }
};
