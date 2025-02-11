import { Request, Response, NextFunction } from "express";
import * as employeesService from "../services/employeesService";
import type { Employee } from "../services/employeesService";

export const controllerGetAllEmployees = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try{
        const employees: Employee[] = await employeesService.serviceGetAllEmployees();
        res.status(200).json({message:"Employees Retrieved", data: employees});
    }catch (error){
        next(error);
    }
};


export const controllerCreateEmployees = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        
        const newEmployee: Employee = await employeesService.serviceCreateEmployee(req.body);

        res.status(201).json({ message: "Employee Created", data: newEmployee });
    } catch (error) {
        next(error);
    }
};


export const controllerUpdateEmployees = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        
        const updatedEmployee: Employee = await employeesService.serviceUpdateEmployee(
            req.params.id,
            req.body
        );

        res.status(200).json({ message: "Employee Updated", data: updatedEmployee });
    } catch (error) {
        next(error);
    }
};

export const controllerDeleteEmployees = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        await employeesService.serviceDeleteEmployee(req.params.id);

       
        res.status(200).send({ message: "Employee Deleted" });
    } catch (error) {
        next(error);
    }
};