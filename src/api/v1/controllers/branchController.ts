import { Request, Response } from "express";
import * as branchService from "../services/branchService";

export const getBranches = (req: Request, res: Response) => {
  res.status(200).json(branchService.getAllBranches());
};

export const getBranchById = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const branch = branchService.getBranchById(id);

  if (!branch) {
    return res.status(404).json({ message: "Branch not found" });
  }

  res.status(200).json(branch);
};

export const createBranch = (req: Request, res: Response) => {
  const newBranch = branchService.createBranch(req.body);
  res.status(201).json(newBranch);
};

export const updateBranch = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const updated = branchService.updateBranch(id, req.body);

  if (!updated) {
    return res.status(404).json({ message: "Branch not found" });
  }

  res.status(200).json(updated);
};

export const deleteBranch = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const deleted = branchService.deleteBranch(id);

  if (!deleted) {
    return res.status(404).json({ message: "Branch not found" });
  }

  res.status(200).json({ message: "Branch deleted successfully" });
};
