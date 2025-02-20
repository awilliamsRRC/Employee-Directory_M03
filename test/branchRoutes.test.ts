import request from "supertest";
import app from "../src/app";
import {
    controllerGetAllBranches,
    controllerCreateBranches,
    controllerUpdateBranches,
    controllerDeleteBranches,
} from "../src/api/v1/controllers/branchController";


jest.mock("../src/api/v1/controllers/branchController", () => ({
    controllerGetAllBranches: jest.fn((req, res) => res.status(200).send()),
    controllerCreateBranches: jest.fn((req, res) => res.status(201).send()),
    controllerUpdateBranches: jest.fn((req, res) => res.status(200).send()),
    controllerDeleteBranches: jest.fn((req, res) => res.status(200).send()),
}));

describe("Branch Routes", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("GET /api/v1/branches", () => {
        it("should call getAll Branches controller", async () => {
            const response = await request(app).get("/api/v1/branches");
            expect(controllerGetAllBranches).toHaveBeenCalled();
            expect(response.status).toBe(200);
        });
    });

    describe("POST /api/v1/branches", () => {
        it("should call createBranchescontroller", async () => {
            const mockBranch = {
                id:"1",
                name: "Vancouver Branch",
                address: "123 Main street",
                phone: "+1234567890",
            };

            const response = await request(app).post("/api/v1/branches").send(mockBranch);
            
            expect(controllerCreateBranches).toHaveBeenCalled();
            expect(response.status).toBe(201);
        });
    });

    describe("PUT /api/v1/branches/:id", () => {
        it("should call updateBranchescontroller", async () => {
            const mockBranch = {
                id :"1",
                name: "Vancouver Branch",
                address: "123 Main street",
                phone:"+1234567890",
            };

            const mockId = 1;
            
            const response = await request(app).put(`/api/v1/branches/${mockId}`).send(mockBranch);
            console.log('Response Body:', response.body);
            
            expect(controllerUpdateBranches).toHaveBeenCalled();
            expect(response.status).toBe(200);
            

        });
    });

    describe("DELETE /api/v1/branches/:id", () => {
        it("should call deleteBranch controller", async () => {
            const mockId = 1;
            const response = await request(app).delete(`/api/v1/branches/${mockId}`);
            expect(controllerDeleteBranches).toHaveBeenCalled();
        });
    });
});