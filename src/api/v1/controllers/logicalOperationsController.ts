import { Request, Response } from "express";
import * as logicService from "../services/logicalOperationsService";

export const getEmployeesByBranch = (req: Request, res: Response) => {
  const branchId = Number(req.params.branchId);
  const employees = logicService.getEmployeesByBranch(branchId);

  res.status(200).json(employees);
};

export const getEmployeesByDepartment = (req: Request, res: Response) => {
  const { department } = req.params;
  const employees = logicService.getEmployeesByDepartment(department);

  res.status(200).json(employees);
};
