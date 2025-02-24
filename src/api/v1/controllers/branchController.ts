import { Request, Response, NextFunction } from "express";
import * as branchService from "../services/branchService";
import type { Branch } from "../services/branchService";

/**
 * Controller to handle the retrieval of all branches.
 * 
 * @async
 * @function controllerGetAllBranches
 * @param {Request} req - The request object from the client.
 * @param {Response} res - The response object to send data back to the client.
 * @param {NextFunction} next - The next middleware function to handle errors.
 * @returns {Promise<void>} A promise that resolves when the response is sent.
 * @throws {Error} If an error occurs while fetching the branches, it will be passed to the next middleware.
 */
export const controllerGetAllBranches = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try{
        const branches: Branch[] = await branchService.serviceGetAllBranches();
        res.status(200).json({message:"Branches Retrieved", data: branches});
    }catch (error){
        next(error);
    }
};
/**
 * Controller to handle the creation of a new branch.
 * 
 * @async
 * @function controllerCreateBranches
 * @param {Request} req - The request object containing the data for the new branch.
 * @param {Response} res - The response object to send back the created branch data.
 * @param {NextFunction} next - The next middleware function to handle errors.
 * @returns {Promise<void>} A promise that resolves when the response is sent.
 * @throws {Error} If an error occurs while creating the branch, it will be passed to the next middleware.
 */
export const controllerCreateBranches = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {     
        const newBranch: Branch = await branchService.serviceCreateBranches(req.body);

        res.status(201).json({ message: "Branch Created", data: newBranch });
    } catch (error) {
        next(error);
    }
};

/**
 * Controller to handle the updating of a branch.
 * 
 * @async
 * @function controllerUpdateBranches
 * @param {Request} req - The request object containing the branch ID in the URL params and the updated data in the body.
 * @param {Response} res - The response object to send back the updated branch data.
 * @param {NextFunction} next - The next middleware function to handle errors.
 * @returns {Promise<void>} A promise that resolves when the response is sent.
 * @throws {Error} If an error occurs while updating the branch, it will be passed to the next middleware.
 */
export const controllerUpdateBranches = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {  
    try {    
        const updatedBranches: Branch = await branchService.serviceUpdateBranches(
            req.params.id,
            req.body
        );
        res.status(200).json({ message: "Branch Updated", data: updatedBranches });
    } catch (error) {
        next(error);
    }
};
/**
 * Controller to handle the deletion of a branch.
 * 
 * @async
 * @function controllerDeleteBranches
 * @param {Request} req - The request object containing the branch ID in the URL params.
 * @param {Response} res - The response object to send back a success message.
 * @param {NextFunction} next - The next middleware function to handle errors.
 * @returns {Promise<void>} A promise that resolves when the response is sent.
 * @throws {Error} If an error occurs while deleting the branch, it will be passed to the next middleware.
 */
export const controllerDeleteBranches = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        await branchService.serviceDeleteBranches(req.params.id);      
        res.status(200).send({ message: "Branch Deleted" });
    } catch (error) {
        next(error);
    }
};