export type Employee = {
    id: string;
    name: string;
    position: string;
    department: string;
    email:string;
    phone:string;
    branchId: number;
    
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
    employee: { name: string; position: string; department: string; email:string; phone:string; branchId: number;}
): Promise<Employee> => { 
    const index: number = employees.findIndex((i) => i.id === id);
    
    if (index === -1) {
        throw new Error(`Item with ID ${id} not found`);
    }

    
    employees[index] = {   id, ...employee };

    return employees[index];
};

export const serviceDeleteEmployee = async (id: string): Promise<void> => {
    const index: number = employees.findIndex((i) => i.id === id);
    if (index === -1) {
        throw new Error(`Item with ID ${id} not found`);
    }

    
    employees.splice(index, 1);
};