import request from "supertest";
import app from "../src/app";  
import {
    controllerGetAllEmployees,
    controllerCreateEmployees,
    controllerUpdateEmployees,
    controllerDeleteEmployees,
} from "../src/api/v1/controllers/employeesController";


jest.mock("../src/api/v1/controllers/employeesController", () => ({
    controllerGetAllEmployees: jest.fn((req, res) => res.status(200).json({ message: 'Employees Retrieved', data: [] })),
    controllerCreateEmployees: jest.fn((req, res) => res.status(201).json({ message: 'Employee Created', data: req.body })),
    controllerUpdateEmployees: jest.fn((req, res) => res.status(200).json({ message: 'Employee Updated', data: req.body })),
    controllerDeleteEmployees: jest.fn((req, res) => res.status(200).json({ message: 'Employee Deleted' })),
}));

describe("Employee Routes", () => {
    afterEach(() => {
        jest.clearAllMocks();  
    });

    // Test for GET /api/v1/employees
    describe("GET /api/v1/employees", () => {
        it("should call getAllEmployees controller", async () => {
            await request(app).get("/api/v1/employees");
            expect(controllerGetAllEmployees).toHaveBeenCalled();
        });
    });

    // Test for POST /api/v1/employees
    describe("POST /api/v1/employees", () => {
        it("should call createEmployee controller", async () => {
            const mockEmployee = {
                name: "John Doe",
                position: "Software Engineer",
                department: "Engineering"
            };

            await request(app).post("/api/v1/employees").send(mockEmployee);
            expect(controllerCreateEmployees).toHaveBeenCalled();
        });
    });

    // Test for PUT /api/v1/employees/:id
    describe("PUT /api/v1/employees/:id", () => {
        it("should call updateEmployee controller", async () => {
            const mockEmployee = {
                name: "John Doe Updated",
                position: "Senior Software Engineer",
                department: "Engineering"
            };

            const mockId = 1;  
            await request(app).put(`/api/v1/employees/${mockId}`).send(mockEmployee);
            expect(controllerUpdateEmployees).toHaveBeenCalled();
        });
    });

    // Test for DELETE /api/v1/employees/:id
    describe("DELETE /api/v1/employees/:id", () => {
        it("should call deleteEmployee controller", async () => {
            await request(app).delete("/api/v1/employees/1");
            expect(controllerDeleteEmployees).toHaveBeenCalled();
        });
    });
});
