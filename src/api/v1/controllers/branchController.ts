import { Request, Response, NextFunction } from "express";
import * as branchService from "../services/branchService";
import type { Branch } from "../services/branchService";


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