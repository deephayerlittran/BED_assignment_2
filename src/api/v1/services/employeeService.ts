import { Employee } from "../models/Employee";
import { FirestoreRepository } from "../repositories/firestoreRepository";

const repo = new FirestoreRepository<Employee>("employees");

export const getAllEmployees = () => {
    return repo.getAll();
};

export const getEmployeeById = (id: string) => {
    return repo.getById(id);
};

export const createEmployee = (data: Employee) => {
    return repo.create(data);
};

export const updateEmployee = (id: string, data: Partial<Employee>) => {
    return repo.update(id, data);
};

export const deleteEmployee = (id: string) => {
    return repo.delete(id);
};
