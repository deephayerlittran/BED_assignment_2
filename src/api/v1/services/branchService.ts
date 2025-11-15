import { branches, Branch } from "../../data/branches";

export const getAllBranches = () => {
  return branches;
};

export const getBranchById = (id: number) => {
  return branches.find((b) => b.id === id);
};

export const createBranch = (data: Omit<Branch, "id">) => {
  const newBranch: Branch = {
    id: branches.length + 1,
    ...data,
  };

  branches.push(newBranch);
  return newBranch;
};

export const updateBranch = (id: number, updates: Partial<Branch>) => {
  const branch = branches.find((b) => b.id === id);

  if (!branch) {
    return null;
  }

  Object.assign(branch, updates);
  return branch;
};

export const deleteBranch = (id: number) => {
  const index = branches.findIndex((b) => b.id === id);

  if (index === -1) {
    return false;
  }

  branches.splice(index, 1);
  return true;
};
