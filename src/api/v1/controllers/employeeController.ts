import { Request, Response } from "express";
import * as employeeService from "../services/employeeService";

export const getEmployees = (req: Request, res: Response) => {
  const data = employeeService.getAllEmployees();
  res.status(200).json(data);
};

export const getEmployeeById = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const employee = employeeService.getEmployeeById(id);

  if (!employee) {
    return res.status(404).json({ message: "Employee not found" });
  }

  res.status(200).json(employee);
};

export const createEmployee = (req: Request, res: Response) => {
  const newEmployee = employeeService.createEmployee(req.body);
  res.status(201).json(newEmployee);
};

export const updateEmployee = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const updated = employeeService.updateEmployee(id, req.body);

  if (!updated) {
    return res.status(404).json({ message: "Employee not found" });
  }

  res.status(200).json(updated);
};

export const deleteEmployee = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const deleted = employeeService.deleteEmployee(id);

  if (!deleted) {
    return res.status(404).json({ message: "Employee not found" });
  }

  res.status(200).json({ message: "Employee deleted successfully" });
};
