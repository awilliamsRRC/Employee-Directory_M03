import { Request, Response, NextFunction } from "express";
import { validate, validateRequest } from "../src/api/v1/middleware/validate";
import { branchSchema } from "../src/api/v1/schemas/branchSchema";

interface Branch {
    
    id: string;
    name: string;
    address: string;
    phone:string;
    
}
/**
 * Test suite for validating the `Branch` data using the `validate` function.
 * This suite verifies that the `validate` function correctly handles valid and invalid `Branch` data.
 * 
 * @group Validation
 */
describe("validate function for A data complete", () => {
     /**
   * Test that ensures the validation function does not throw an error for valid `Branch` data.
   * 
   * @test {validate}
   */
    it("should not throw an error for valid item data", () => {
        const data: Branch = {         
            id: "1",
            name: "John Brown",
            address: "Canada",
            phone: "+1234567890"
        };
        expect(() => validate(branchSchema, data)).not.toThrow();
    });
    /**
   * Test that ensures the validation function throws an error for missing `name` field in `Branch` data.
   * 
   * @test {validate}
   */
    it("should throw an error for missing name", () => {
        const data: Partial<Branch> = {
            
            id: "1",
            address: "Canada",
            phone: "+1234567890"         
        };
        expect(() => validate(branchSchema, data)).toThrow(
            "Validation error: Name is required"
        );
    });
    
});

