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
/**
 * Test suite for Branch Routes.
 * 
 * This suite tests the API routes for branch-related operations, including
 * getting all branches, creating a new branch, updating an existing branch,
 * and deleting a branch. Each test ensures that the correct controller function
 * is called and that the correct HTTP status codes are returned.
 * 
 * @group BranchRoutes
 */
describe("Branch Routes", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    /**
   * Test for the GET `/api/v1/branches` route.
   * This test ensures that the controller for fetching all branches is called correctly
   * and that the response returns with a 200 status code.
   * 
   * @test {GET /api/v1/branches}
   */
    describe("GET /api/v1/branches", () => {
        it("should call getAll Branches controller", async () => {
            const response = await request(app).get("/api/v1/branches");
            expect(controllerGetAllBranches).toHaveBeenCalled();
            expect(response.status).toBe(200);
        });
    });
    /**
   * Test for the POST `/api/v1/branches` route.
   * This test ensures that the controller for creating a new branch is called correctly
   * and that the response returns with a 201 status code upon successful creation.
   * 
   * @test {POST /api/v1/branches}
   */
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
    /**
   * Test for the PUT `/api/v1/branches/:id` route.
   * This test ensures that the controller for updating an existing branch is called correctly
   * and that the response returns with a 200 status code after the update.
   * 
   * @test {PUT /api/v1/branches/:id}
   */
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
    /**
   * Test for the DELETE `/api/v1/branches/:id` route.
   * This test ensures that the controller for deleting an existing branch is called correctly.
   * It verifies that the correct status code is returned upon successful deletion.
   * 
   * @test {DELETE /api/v1/branches/:id}
   */
    describe("DELETE /api/v1/branches/:id", () => {
        it("should call deleteBranch controller", async () => {
            const mockId = 1;
            const response = await request(app).delete(`/api/v1/branches/${mockId}`);
            expect(controllerDeleteBranches).toHaveBeenCalled();
        });
    });
});