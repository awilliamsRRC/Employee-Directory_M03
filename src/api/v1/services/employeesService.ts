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
/**
 * Retrieves all employees from the Firestore database.
 * 
 * @async
 * @function serviceGetAllEmployees
 * @returns {Promise<Employee[]>} A promise that resolves to an array of employees.
 * @throws {Error} If an error occurs while fetching the employees, it will be thrown.
 */
export const serviceGetAllEmployees = async (): Promise<Employee[]> => {
    const snapshot = await getDocuments(COLLECTION);
    return snapshot.docs.map((doc) => {
        const data = doc.data();
        return { id: doc.id, ...data } as Employee;
    });
};
/**
 * Creates a new employee in the Firestore database.
 * 
 * @async
 * @function serviceCreateEmployee
 * @param {Object} employee - The employee data to be created.
 * @param {string} employee.name - The name of the new employee.
 * @param {string} employee.position - The position of the new employee.
 * @param {string} employee.email - The email address of the new employee.
 * @param {string} employee.phone - The phone number of the new employee.
 * @param {number} employee.branchId - The branch ID where the employee works.
 * @param {string} employee.department - The department of the new employee.
 * @returns {Promise<Employee>} A promise that resolves to the created employee, including its ID.
 * @throws {Error} If an error occurs while creating the employee, it will be thrown.
 */
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
/**
 * Updates an existing employee in the Firestore database.
 * 
 * @async
 * @function serviceUpdateEmployee
 * @param {string} id - The ID of the employee to be updated.
 * @param {Object} employee - The updated employee data.
 * @param {string} employee.name - The new name of the employee.
 * @param {string} employee.position - The new position of the employee.
 * @param {string} employee.department - The new department of the employee.
 * @param {string} employee.email - The new email address of the employee.
 * @param {string} employee.phone - The new phone number of the employee.
 * @param {number} employee.branchId - The new branch ID of the employee.
 * @returns {Promise<Employee>} A promise that resolves to the updated employee, including its ID.
 * @throws {Error} If an error occurs while updating the employee, it will be thrown.
 */
export const serviceUpdateEmployee = async (
    id: string,
    employee: { name: string; position: string; department: string; email:string; phone:string; branchId: number;}
): Promise<Employee> => { 
    await updateDocument(COLLECTION, id, employee);
    return { id, ...employee };
    
};
/**
 * Deletes an employee from the Firestore database.
 * 
 * @async
 * @function serviceDeleteEmployee
 * @param {string} id - The ID of the employee to be deleted.
 * @returns {Promise<void>} A promise that resolves when the employee is deleted.
 * @throws {Error} If an error occurs while deleting the employee, it will be thrown.
 */
export const serviceDeleteEmployee = async (id: string): Promise<void> => {
    await deleteDocument(COLLECTION, id);
};