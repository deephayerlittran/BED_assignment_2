import { FirestoreRepository } from "../repositories/firestoreRepository";

export interface Employee {
    id?: string;
    name: string;
    email: string;
    position: string;
    branchId: string;
}

const repo = new FirestoreRepository<Employee>("employees");

export const getAllEmployees = async () => {
    return await repo.getAll();
};

export const getEmployeeById = async (id: string) => {
    return await repo.getById(id);
};

export const createEmployee = async (data: Employee) => {
    return await repo.create(data);
};

export const updateEmployee = async (id: string, updates: Partial<Employee>) => {
    return await repo.update(id, updates);
};

export const deleteEmployee = async (id: string) => {
    return await repo.delete(id);
};
