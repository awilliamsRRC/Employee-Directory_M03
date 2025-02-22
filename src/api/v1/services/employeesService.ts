import {
    getDocuments,
    createDocument,
    updateDocument,
    deleteDocument,
} from "../repositories/firestoreRepository";

export type Employee = {
    id: string;
    name: string;
    position: string;
    department: string;
    email:string;
    phone:string;
    branchId: number;
    
};

const COLLECTION = "employees";
const employees: Employee[] = [];

export const serviceGetAllEmployees = async (): Promise<Employee[]> => {
    const snapshot = await getDocuments(COLLECTION);
    return snapshot.docs.map((doc) => {
        const data = doc.data();
        return { id: doc.id, ...data } as Employee;
    });
};

export const serviceCreateEmployee = async (employee: {
    
    name: string;
    position: string;
    email:string;
    phone:string;
    branchId: number;
    department: string;
}): Promise<Employee> => {
    
    const newEmployee = {
        name: employee.name,
        position: employee.position,
        email: employee.email,
        phone: employee.phone,
        branchId: employee.branchId,
        department: employee.department,
    };

    const docId = await createDocument(COLLECTION, newEmployee);
    return { id: docId, ...newEmployee };
};

export const serviceUpdateEmployee = async (
    id: string,
    employee: { name: string; position: string; department: string; email:string; phone:string; branchId: number;}
): Promise<Employee> => { 
    await updateDocument(COLLECTION, id, employee);
    return { id, ...employee };
    
};

export const serviceDeleteEmployee = async (id: string): Promise<void> => {
    await deleteDocument(COLLECTION, id);
};