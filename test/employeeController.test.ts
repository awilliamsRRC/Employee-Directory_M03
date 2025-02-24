import { Request, Response, NextFunction } from "express";
import * as employeeController from "../src/api/v1/controllers/employeesController";  
import * as employeeService from "../src/api/v1/services/employeesService"; 

jest.mock("../src/api/v1/services/employeesService");  

describe("Employee Controller", () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(() => {
        jest.clearAllMocks();  
        mockReq = { params: {}, body: {}, query: {} };  
        mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn(), send: jest.fn() };  
        mockNext = jest.fn();  
    });
    /**
     * Tests successful retrieval of all employees.
     */
    describe("getAllEmployees", () => {
        it("should handle successful operation", async () => {
            const mockEmployees = [
                { id: "1", name: "John Doe", role: "Developer", department: "Engineering" },
                { id: "2", name: "Jane Smith", role: "Manager", department: "HR" },
            ];

            (employeeService.serviceGetAllEmployees as jest.Mock).mockResolvedValue(mockEmployees);  

            await employeeController.controllerGetAllEmployees(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockRes.status).toHaveBeenCalledWith(200);  
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Employees Retrieved",
                data: mockEmployees,
            });  
        });
        /**
         * Tests error handling in case of failure while retrieving employees.
         */
        it("should handle errors in getAllEmployees", async () => {
            const mockError = new Error("Error retrieving employees");
            (employeeService.serviceGetAllEmployees as jest.Mock).mockRejectedValue(mockError);  

            await employeeController.controllerGetAllEmployees(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockNext).toHaveBeenCalledWith(mockError);  
        });
    });
    /**
     * Tests the controller for creating an employee
     */
    describe("createEmployee", () => {
        it("should create an employee successfully", async () => {
            const mockEmployee = {
                id: "3",
                name: "Alice Green",
                role: "Designer",
                department: "Design",
            };

            const mockEmployeeData = {
                name: "Alice Green",
                role: "Designer",
                department: "Design",
            };

            (employeeService.serviceCreateEmployee as jest.Mock).mockResolvedValue(mockEmployee);  

            mockReq.body = mockEmployeeData;  

            await employeeController.controllerCreateEmployees(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(employeeService.serviceCreateEmployee).toHaveBeenCalledWith(mockEmployeeData);  
            expect(mockRes.status).toHaveBeenCalledWith(201);  
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Employee Created",
                data: mockEmployee,
            });  
        });
        /**
         * Tests error handling during employee creation.
         */
        it("should handle errors in createEmployee", async () => {
            const mockError = new Error("Error creating employee");
            (employeeService.serviceCreateEmployee as jest.Mock).mockRejectedValue(mockError);  

            await employeeController.controllerCreateEmployees(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockNext).toHaveBeenCalledWith(mockError);  
        });
    });
    /**
     * Tests the controller for updating an employee
     */
    describe("updateEmployee", () => {
        /**
         * Tests successful update of an employee.
         */
        it("should update an employee successfully", async () => {
            const mockId = "1";  
            const mockUpdatedEmployee = {
                id: "1",
                name: "John Doe Updated",
                role: "Senior Developer",
                department: "Engineering",
            };
            const updateData = {
                name: "John Doe Updated",
                role: "Senior Developer",
                department: "Engineering",
            };

            (employeeService.serviceUpdateEmployee as jest.Mock).mockResolvedValue(mockUpdatedEmployee);  

            mockReq.params = { id: mockId };  
            mockReq.body = updateData;  
            await employeeController.controllerUpdateEmployees(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(employeeService.serviceUpdateEmployee).toHaveBeenCalledWith(mockId, updateData);  
            expect(mockRes.status).toHaveBeenCalledWith(200);  
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Employee Updated",
                data: mockUpdatedEmployee,
            });  
        });
        /**
         * Tests error handling during employee update.
         */
        it("should handle errors in updateEmployee", async () => {
            const mockError = new Error("Error updating employee");
            (employeeService.serviceUpdateEmployee as jest.Mock).mockRejectedValue(mockError);  

            await employeeController.controllerUpdateEmployees(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockNext).toHaveBeenCalledWith(mockError);  
        });
    });
    /**
     * Tests the controller for deleting an employee
     */
    describe("deleteEmployee", () => {
        /**
         * Tests successful deletion of an employee.
         */
        it("should delete an employee successfully", async () => {
            const mockId = "1";  

            (employeeService.serviceDeleteEmployee as jest.Mock).mockResolvedValue(undefined);  

            mockReq.params = { id: mockId };  

            await employeeController.controllerDeleteEmployees(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(employeeService.serviceDeleteEmployee).toHaveBeenCalledWith(mockId);  
            expect(mockRes.status).toHaveBeenCalledWith(200);  
            expect(mockRes.send).toHaveBeenCalledWith({ message: "Employee Deleted" });  
        });
        /**
         * Tests error handling during employee deletion.
         */
        it("should handle errors in deleteEmployee", async () => {
            const mockError = new Error("Error deleting employee");
            (employeeService.serviceDeleteEmployee as jest.Mock).mockRejectedValue(mockError);  

            await employeeController.controllerDeleteEmployees(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockNext).toHaveBeenCalledWith(mockError);  
        });
    });
});
