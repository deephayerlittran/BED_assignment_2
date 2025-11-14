import { employees, Employee } from "../../data/employees";

export const getAllEmployees = () => {
  return employees;
};

export const getEmployeeById = (id: number) => {
  return employees.find((emp) => emp.id === id);
};

export const createEmployee = (data: Omit<Employee, "id">) => {
  const newEmployee: Employee = {
    id: employees.length + 1,
    ...data,
  };

  employees.push(newEmployee);
  return newEmployee;
};

export const updateEmployee = (id: number, updates: Partial<Employee>) => {
  const employee = employees.find((emp) => emp.id === id);

  if (!employee) {
    return null;
  }

  Object.assign(employee, updates);
  return employee;
};

export const deleteEmployee = (id: number) => {
  const index = employees.findIndex((emp) => emp.id === id);

  if (index === -1) {
    return false;
  }

  employees.splice(index, 1);
  return true;
};
