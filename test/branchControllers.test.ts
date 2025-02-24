import { Request, Response, NextFunction } from 'express';
import * as branchController from "../src/api/v1/controllers/branchController"; 
import * as branchService from "../src/api/v1/services/branchService"; 


jest.mock('../src/api/v1/services/branchService', () => ({
    serviceGetAllBranches: jest.fn(),
    serviceCreateBranches: jest.fn(),
    serviceUpdateBranches: jest.fn(),
    serviceDeleteBranches: jest.fn(),
}));

/**
 * Test suite for the Branches Controller.
 * 
 * This suite includes tests for all CRUD operations (Create, Read, Update, Delete)
 * of the `/api/v1/branches` route, ensuring that the controller interacts
 * correctly with the service layer and handles success and error scenarios appropriately.
 * 
 * @group BranchesController
 */
describe('Branches Controller', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    jest.clearAllMocks(); 
    mockReq = {
      params: {},
      body: {},
      query: {},
    };
    mockRes = {
      status: jest.fn().mockReturnThis(), 
      json: jest.fn(), 
      send: jest.fn(), 
    };
    mockNext = jest.fn(); 
  });
  /**
   * Test for the GET `/api/v1/branches` route.
   * This test ensures that the controller correctly retrieves all branches and responds with a 200 status code.
   * 
   * @test {GET /api/v1/branches}
   */
  describe('GET /api/v1/branches', () => {
    it('should call getAllBranches controller', async () => {
      
      const mockBranches = [
        { id: '1', name: 'Branch 1', address: '123 Street', phone: '1234567890' }
        
      ];
      (branchService.serviceGetAllBranches as jest.Mock).mockResolvedValue(mockBranches);

      // Act: Call the controller method with the mock request, response, and next function
      await branchController.controllerGetAllBranches(mockReq as Request, mockRes as Response, mockNext);

      // Assert: Verify that the service method was called
      expect(branchService.serviceGetAllBranches).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200); // Expected status code
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Branches Retrieved',
        data: mockBranches,
      }); 
    });
    /**
     * Test for handling errors in the `getAllBranches` controller.
     * Verifies that errors are correctly passed to the next middleware function.
     * 
     * @test {GET /api/v1/branches} Error Case
     */
    it('should handle errors in getAllBranches controller', async () => {
      // Arrange: mock the service method to reject with an error
      const mockError = new Error('Error retrieving branches');
      (branchService.serviceGetAllBranches as jest.Mock).mockRejectedValue(mockError);

      // Act: Call the controller method
      await branchController.controllerGetAllBranches(mockReq as Request, mockRes as Response, mockNext);

      // Assert: Verify that the next function is called with the error
      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });
  /**
   * Test for the POST `/api/v1/branches` route.
   * This test ensures that the controller correctly creates a new branch and responds with a 201 status code.
   * 
   * @test {POST /api/v1/branches}
   */
  describe('POST /api/v1/branches', () => {
    it('should call createBranch controller', async () => {
      // Arrange: mock the service method to return a created branch
      const mockBranch = { id: '3', name: 'New Branch', address: '789 Road', phone: '1122334455' };
      (branchService.serviceCreateBranches as jest.Mock).mockResolvedValue(mockBranch);

      // Act: Call the controller method with the mock request, response, and next function
      mockReq.body = { name: 'New Branch', address: '789 Road', phone: '1122334455' }; // Simulate incoming data
      await branchController.controllerCreateBranches(mockReq as Request, mockRes as Response, mockNext);

      // Assert: Verify that the service method was called with the correct arguments
      expect(branchService.serviceCreateBranches).toHaveBeenCalledWith(mockReq.body);
      expect(mockRes.status).toHaveBeenCalledWith(201); // Expected status for successful creation
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Branch Created',
        data: mockBranch,
      });
    });

    /**
     * Test for handling errors in the `createBranch` controller.
     * Verifies that errors are passed to the next middleware function.
     * 
     * @test {POST /api/v1/branches} Error Case
     */
    it('should handle errors in createBranch controller', async () => {
      // Arrange: mock the service method to reject with an error
      const mockError = new Error('Error creating branch');
      (branchService.serviceCreateBranches as jest.Mock).mockRejectedValue(mockError);

      // Act: Call the controller method
      await branchController.controllerCreateBranches(mockReq as Request, mockRes as Response, mockNext);

      // Assert: Verify that the next function is called with the error
      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });
  /**
   * Test for the PUT `/api/v1/branches/:id` route.
   * This test ensures that the controller correctly updates an existing branch and responds with a 200 status code.
   * 
   * @test {PUT /api/v1/branches/:id}
   */
  describe('PUT /api/v1/branches/:id', () => {
    /**
     * Test for the successful execution of the `updateBranch` controller.
     * Verifies that the service method is called with the correct arguments and the response is returned successfully.
     * 
     * @test {PUT /api/v1/branches/:id} Success Case
     */
    it('should call updateBranch controller', async () => {
      // Arrange: mock the service method to return the updated branch
      const updatedBranch = { id: '1', name: 'Updated Branch', address: '123 Updated Street', phone: '123456789' };
      (branchService.serviceUpdateBranches as jest.Mock).mockResolvedValue(updatedBranch);

      // Act: Call the controller method with mock request, response, and next function
      mockReq.params = { id: '1' }; // Simulate the branch ID in params
      mockReq.body = { name: 'Updated Branch', address: '123 Updated Street', phone: '123456789' }; 
      await branchController.controllerUpdateBranches(mockReq as Request, mockRes as Response, mockNext);

      // Assert: Verify that the service method was called with the correct arguments
      expect(branchService.serviceUpdateBranches).toHaveBeenCalledWith(mockReq.params.id, mockReq.body);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Branch Updated',
        data: updatedBranch,
      });
    });
    /**
     * Test for handling errors in the `updateBranch` controller.
     * Verifies that errors are passed to the next middleware function.
     * 
     * @test {PUT /api/v1/branches/:id} Error Case
     */
    it('should handle errors in updateBranch controller', async () => {
      // Arrange: mock the service method to reject with an error
      const mockError = new Error('Error updating branch');
      (branchService.serviceUpdateBranches as jest.Mock).mockRejectedValue(mockError);

      // Act: Call the controller method
      await branchController.controllerUpdateBranches(mockReq as Request, mockRes as Response, mockNext);

      // Assert: Verify that the next function is called with the error
      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });
  /**
   * Test for the DELETE `/api/v1/branches/:id` route.
   * This test ensures that the controller correctly deletes an existing branch and responds with a 200 status code.
   * 
   * @test {DELETE /api/v1/branches/:id}
   */
  describe('DELETE /api/v1/branches/:id', () => {
     /**
     * Test for the successful execution of the `deleteBranch` controller.
     * Verifies that the service method is called with the correct arguments and the response is returned successfully.
     * 
     * @test {DELETE /api/v1/branches/:id} Success Case
     */
    it('should call deleteBranch controller', async () => {
      // Arrange: mock the service method to resolve the deletion
      const mockId = '1'; // Simulate the branch ID to delete
      (branchService.serviceDeleteBranches as jest.Mock).mockResolvedValue(undefined);

      // Act: Call the controller method with mock request, response, and next function
      mockReq.params = { id: mockId };
      await branchController.controllerDeleteBranches(mockReq as Request, mockRes as Response, mockNext);

      // Assert: Verify that the service method was called with the correct arguments
      expect(branchService.serviceDeleteBranches).toHaveBeenCalledWith(mockId);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.send).toHaveBeenCalledWith({ message: 'Branch Deleted' });
    });
    /**
     * Test for handling errors in the `deleteBranch` controller.
     * Verifies that errors are passed to the next middleware function.
     * 
     * @test {DELETE /api/v1/branches/:id} Error Case
     */
    it('should handle errors in deleteBranch controller', async () => {
      // Arrange: mock the service method to reject with an error
      const mockError = new Error('Error deleting branch');
      (branchService.serviceDeleteBranches as jest.Mock).mockRejectedValue(mockError);

      // Act: Call the controller method
      await branchController.controllerDeleteBranches(mockReq as Request, mockRes as Response, mockNext);

      // Assert: Verify that the next function is called with the error
      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });
});
