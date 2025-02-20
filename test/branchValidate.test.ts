import { Request, Response, NextFunction } from "express";
import { validate, validateRequest } from "../src/api/v1/middleware/validate";
import { branchSchema } from "../src/api/v1/schemas/branchSchema";

interface Branch {
    
    id: string;
    name: string;
    address: string;
    phone:string;
    
}

describe("validate function for A data complete", () => {
    it("should not throw an error for valid item data", () => {
        const data: Branch = {
            
            id: "1",
            name: "John Brown",
            address: "Canada",
            phone: "+1234567890"
        };
        expect(() => validate(branchSchema, data)).not.toThrow();
    });

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

