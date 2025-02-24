import {
    serviceGetAllBranches,
    serviceCreateBranches,
    serviceUpdateBranches,
    serviceDeleteBranches,
} from "../src/api/v1/services/branchService";
import {
    getDocuments,
    createDocument,
    updateDocument,
    deleteDocument,
} from "../src/api/v1/repositories/firestoreRepository";
import { Branch } from "../src/api/v1/services/branchService";
import {
    QuerySnapshot,
    QueryDocumentSnapshot,
    DocumentData,
} from "firebase-admin/firestore";



jest.mock("../src/api/v1/repositories/firestoreRepository", () => ({
    getDocuments: jest.fn(),
    createDocument: jest.fn(),
    updateDocument:jest.fn(),
    deleteDocument:jest.fn(),
    getDocumentsByFieldValue: jest.fn(),
}));
/**
 * Test suite for Branch Service functions.
 * 
 * This suite tests the service functions for interacting with branch data, including
 * retrieving, creating, updating, and deleting branches. Each test ensures that the 
 * corresponding service function calls the required database functions and returns
 * the expected results.
 * 
 * @group BranchService
 */
describe("Branch Service", () => {
    describe("getDocuments", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it("should return all branches when the request is successful", async () => {
            // Mock data
            const mockDocs: QueryDocumentSnapshot[] = [
                {
                    id: "item1",
                    data: () =>
                        ({
                            //id: "1",
                            name: "John Brown",
                            address: "Canada Street",
                            phone: "123456789",
                            
                        } as DocumentData),
                } as QueryDocumentSnapshot,
                {
                    id: "item2",
                    data: () =>
                        ({
                            //id: "2",
                            name: "Jane Doe",
                            address: "Winnipeg",
                            phone: "9876545",
                        } as DocumentData),
                } as QueryDocumentSnapshot,
            ];

            const mockSnapshot: QuerySnapshot = {
                docs: mockDocs,
            } as QuerySnapshot;

            (getDocuments as jest.Mock).mockResolvedValue(mockSnapshot);
            console.log(getDocuments);


            const result: Branch[] = await serviceGetAllBranches();

            // Assertions
            expect(getDocuments).toHaveBeenCalledWith("branches");
            expect(getDocuments).toHaveBeenCalledTimes(1);
            console.log(getDocuments);
            expect(result).toHaveLength(2);
            console.log(result);

            expect(result[0]).toEqual({
                id: "item1",
                name: "John Brown",
                address: "Canada Street",
                phone: "123456789",
                
            });

            expect(result[1]).toEqual({
                id: "item2",
                name: "Jane Doe",
                address: "Winnipeg",
                phone: "9876545",
                
            });
        });
    });
    /**
   * Test for the `createBranch` service function.
   * This test ensures that a new branch is created and returned with an ID.
   * 
   * @test {createDocument}
   */
    describe("Branch Service - createBranch", () => {
        it("should create a new branch and return it with an id", async () => {
            const newBranchData = {
                name: "John's Store",
                address:"123 Main St",
                phone:"555-*1234",
            };
            const mockDocID = "newBranchId123";
            (createDocument as jest.Mock).mockResolvedValue(mockDocID);
            const result: Branch = await serviceCreateBranches(newBranchData);

            expect(createDocument).toHaveBeenCalledWith("branches",{
                name: newBranchData.name,
                address: newBranchData.address,
                phone: newBranchData.phone,

            });
            expect(createDocument).toHaveBeenCalledTimes(1);
            expect(result).toEqual({
            id: mockDocID,
            name: newBranchData.name,
            address: newBranchData.address,
            phone: newBranchData.phone,
            });
        });
    });
    /**
   * Test for the `updateBranch` service function.
   * This test ensures that an existing branch is updated and returned with the updated data.
   * 
   * @test {updateDocument}
   */
    describe("Branch Service - Update Branch", () => {
        beforeEach(() => {
            jest.clearAllMocks(); 
        });
        it("should update a branch and return the updated branch", async () => {
            const branchId = "12345";
            const updatedBranchData = {
                name: "Updated Store",
                address: "456 Updated St.",
                phone: "555-9876",
            };
            (updateDocument as jest.Mock).mockResolvedValue(undefined);
            const result = await serviceUpdateBranches(branchId, updatedBranchData);

            expect(updateDocument).toHaveBeenCalledWith("branches", branchId, updatedBranchData);
            expect(updateDocument).toHaveBeenCalledTimes(1);

            expect(result).toEqual({
                id: branchId,
                name: updatedBranchData.name,
                address: updatedBranchData.address,
                phone: updatedBranchData.phone

            });
        });
    });
    /**
   * Test for the `deleteBranch` service function.
   * This test ensures that an existing branch is deleted without any return value.
   * 
   * @test {deleteDocument}
   */
    describe("Branch Service - Delete Branch", () => {
        beforeEach(() => {
            jest.clearAllMocks(); // Ensure mocks are cleared before each test
        });
    
        it("should delete a branch and not return anything", async () => {
            const branchId = "12345";
    
            // Mock deleteDocument to resolve successfully without doing anything
            (deleteDocument as jest.Mock).mockResolvedValue(undefined);  
    
            // Call the service function
            await serviceDeleteBranches(branchId);
    
            // Verify that deleteDocument was called with the correct arguments
            expect(deleteDocument).toHaveBeenCalledWith("branches", branchId);
            expect(deleteDocument).toHaveBeenCalledTimes(1);
        });
    });

});

           