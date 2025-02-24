import {
    serviceGetAllEmployees,
    serviceCreateEmployee,
    serviceUpdateEmployee,
    serviceDeleteEmployee,
} from "../src/api/v1/services/employeesService"; 
import {
    getDocuments,
    createDocument,
    updateDocument,
    deleteDocument,
} from "../src/api/v1/repositories/firestoreRepository"; 
import { Employee } from "../src/api/v1/services/employeesService"; 
import {
    QuerySnapshot,
    QueryDocumentSnapshot,
    DocumentData,
} from "firebase-admin/firestore"; 

jest.mock("../src/api/v1/repositories/firestoreRepository", () => ({
    getDocuments: jest.fn(),
    createDocument: jest.fn(),
    updateDocument: jest.fn(),
    deleteDocument: jest.fn(),
}));

describe("Employee Service", () => {
    beforeEach(() => {
        jest.clearAllMocks(); 
    });

    // Test for `getAllEmployees`
    describe("getDocuments", () => {
        it("should return all employees when the request is successful", async () => {
            // Mock dat
            const mockEmployees: QueryDocumentSnapshot[] = [
                {
                    id: "emp1",
                    data: () =>
                        ({
                            name: "John Doe",
                            position: "Manager",
                            department: "Sales",
                            email: "john.doe@example.com",
                            phone: "555-1234",
                            branchId: 1,
                        } as DocumentData),
                } as QueryDocumentSnapshot,
                {
                    id: "emp2",
                    data: () =>
                        ({
                            name: "Jane Smith",
                            position: "Developer",
                            department: "IT",
                            email: "jane.smith@example.com",
                            phone: "555-5678",
                            branchId: 2,
                        } as DocumentData),
                } as QueryDocumentSnapshot,
            ];

            const mockSnapshot: QuerySnapshot = {
                docs: mockEmployees,
            } as QuerySnapshot;

            (getDocuments as jest.Mock).mockResolvedValue(mockSnapshot);
            console.log(getDocuments);


            const result: Employee[] = await serviceGetAllEmployees();

            // Assertions
            expect(getDocuments).toHaveBeenCalledWith("employees");
            expect(getDocuments).toHaveBeenCalledTimes(1);
            expect(result).toHaveLength(2);
            expect(result).toEqual([
                {
                    id: "emp1",
                    name: "John Doe",
                    position: "Manager",
                    department: "Sales",
                    email: "john.doe@example.com",
                    phone: "555-1234",
                    branchId: 1,
                },
                {
                    id: "emp2",
                    name: "Jane Smith",
                    position: "Developer",
                    department: "IT",
                    email: "jane.smith@example.com",
                    phone: "555-5678",
                    branchId: 2,
                },
            ]);
        });
    });

    // Test for `createEmployee`
    describe("Employee Service - createEmployee", () => {
        it("should create a new employee and return it with an id", async () => {
            const newEmployeeData = {
                name: "Alice Johnson",
                position: "Designer",
                department: "Design",
                email: "alice.johnson@example.com",
                phone: "555-9876",
                branchId: 3,
            };

            const mockDocId = "newEmployeeId123";
            (createDocument as jest.Mock).mockResolvedValue(mockDocId);

            const result: Employee = await serviceCreateEmployee(newEmployeeData);

            // Assertions
            expect(createDocument).toHaveBeenCalledWith("employees", {
                name: newEmployeeData.name,
                position: newEmployeeData.position,
                department: newEmployeeData.department,
                email: newEmployeeData.email,
                phone: newEmployeeData.phone,
                branchId: newEmployeeData.branchId,
            });
            expect(createDocument).toHaveBeenCalledTimes(1);
            expect(result).toEqual({
                id: mockDocId,
                name: newEmployeeData.name,
                position: newEmployeeData.position,
                department: newEmployeeData.department,
                email: newEmployeeData.email,
                phone: newEmployeeData.phone,
                branchId: newEmployeeData.branchId,
            });
        });
    });

    // Test for `updateEmployee`
    describe("Employee Service - updateEmployee", () => {
        it("should update an employee and return the updated data", async () => {
            const employeeId = "emp1";
            const updatedEmployeeData = {
                name: "John Doe Updated",
                position: "Senior Manager",
                department: "Sales",
                email: "john.doe.updated@example.com",
                phone: "555-4321",
                branchId: 1,
            };

            (updateDocument as jest.Mock).mockResolvedValue(undefined); 

            const result = await serviceUpdateEmployee(employeeId, updatedEmployeeData);

            // Assertions
            expect(updateDocument).toHaveBeenCalledWith("employees", employeeId, updatedEmployeeData);
            expect(updateDocument).toHaveBeenCalledTimes(1);
            expect(result).toEqual({
                id: employeeId,
                name: updatedEmployeeData.name,
                position: updatedEmployeeData.position,
                department: updatedEmployeeData.department,
                email: updatedEmployeeData.email,
                phone: updatedEmployeeData.phone,
                branchId: updatedEmployeeData.branchId,
            });
        });
    });

    // Test for `deleteEmployee`
    describe("Employee Service - deleteEmployee", () => {
        it("should delete an employee and not return anything", async () => {
            const employeeId = "emp1";

            (deleteDocument as jest.Mock).mockResolvedValue(undefined); 

            await serviceDeleteEmployee(employeeId);

            // Assertions
            expect(deleteDocument).toHaveBeenCalledWith("employees", employeeId);
            expect(deleteDocument).toHaveBeenCalledTimes(1);
        });

        it("should throw an error if delete fails", async () => {
            const employeeId = "emp1";
            (deleteDocument as jest.Mock).mockRejectedValue(new Error("Failed to delete"));

            try {
                await serviceDeleteEmployee(employeeId);
            } catch (error) {
                expect(error).toEqual(new Error("Failed to delete"));
            }
        });
    });
});
