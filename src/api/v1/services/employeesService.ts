export type Employee = {
    id: string;
    name: string;
    position: string;
    email:string;
    phone:string;
    branchId: number;
    department: string;
};

const employees: Employee[] = [];

export const serviceGetAllEmployees = async (): Promise<Employee[]> => {
    return employees;
};

export const serviceCreateEmployee = async (employee: {
    
    name: string;
    position: string;
    email:string;
    phone:string;
    branchId: number;
    department: string;
}): Promise<Employee> => {
    
    const newEmployee: Employee = { id: Date.now().toString(), ...employee };

    
    employees.push(newEmployee);
    return newEmployee;
};

export const serviceUpdateEmployee = async (
    id: string,
    employeeUpdate: Employee
): Promise<Employee> => {
    
    const index: number = employees.findIndex((i) => i.id === id);
    
    if (index === -1) {
        throw new Error(`Item with ID ${id} not found`);
    }

    
    employees[index] = {   ...employeeUpdate, id: employees[index].id };

    return employees[index];
};

export const serviceDeleteEmployee = async (id: string): Promise<void> => {
    const index: number = employees.findIndex((i) => i.id === id);
    if (index === -1) {
        throw new Error(`Item with ID ${id} not found`);
    }

    
    employees.splice(index, 1);
};