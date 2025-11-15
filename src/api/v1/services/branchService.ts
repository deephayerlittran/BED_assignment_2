import { Branch } from "../models/Branch";
import { FirestoreRepository } from "../repositories/firestoreRepository";

const repo = new FirestoreRepository<Branch>("branches");

export const getAllBranches = () => {
    return repo.getAll();
};

export const getBranchById = (id: string) => {
    return repo.getById(id);
};

export const createBranch = (data: Branch) => {
    return repo.create(data);
};

export const updateBranch = (id: string, data: Partial<Branch>) => {
    return repo.update(id, data);
};

export const deleteBranch = (id: string) => {
    return repo.delete(id);
};
