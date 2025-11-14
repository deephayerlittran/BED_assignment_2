import { employees } from "../../data/employees";

export const getEmployeesByBranch = (branchId: number) => {
  return employees.filter((emp) => emp.branchId === branchId);
};

export const getEmployeesByDepartment = (department: string) => {
  return employees.filter(
    (emp) => emp.department.toLowerCase() === department.toLowerCase()
  );
};
