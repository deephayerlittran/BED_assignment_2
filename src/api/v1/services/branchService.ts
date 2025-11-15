import { FirestoreRepository } from "../repositories/firestoreRepository";

export interface Branch {
    id?: string;
    name: string;
    address: string;
    phone: string;
}


const repo = new FirestoreRepository<Branch>("branches");

export const getAllBranches = async () => {
    return await repo.getAll();
};

export const getBranchById = async (id: string) => {
    return await repo.getById(id);
};

export const createBranch = async (data: Branch) => {
    return await repo.create(data);
};

export const updateBranch = async (id: string, updates: Partial<Branch>) => {
    return await repo.update(id, updates);
};

export const deleteBranch = async (id: string) => {
    return await repo.delete(id);
};
