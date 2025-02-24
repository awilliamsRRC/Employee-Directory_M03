import { Request, Response, NextFunction } from "express";
import * as employeesService from "../services/employeesService";
import type { Employee } from "../services/employeesService";
/**
 * Controller to handle the retrieval of all employees.
 * 
 * @async
 * @function controllerGetAllEmployees
 * @param {Request} req - The request object from the client.
 * @param {Response} res - The response object to send back the employee data.
 * @param {NextFunction} next - The next middleware function to handle errors.
 * @returns {Promise<void>} A promise that resolves when the response is sent.
 * @throws {Error} If an error occurs while retrieving the employees, it will be passed to the next middleware.
 */
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
/**
 * Controller to handle the creation of a new employee.
 * 
 * @async
 * @function controllerCreateEmployees
 * @param {Request} req - The request object containing the data for the new employee.
 * @param {Response} res - The response object to send back the created employee data.
 * @param {NextFunction} next - The next middleware function to handle errors.
 * @returns {Promise<void>} A promise that resolves when the response is sent.
 * @throws {Error} If an error occurs while creating the employee, it will be passed to the next middleware.
 */
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
/**
 * Controller to handle the updating of an employee's details.
 * 
 * @async
 * @function controllerUpdateEmployees
 * @param {Request} req - The request object containing the employee ID in the URL params and the updated data in the body.
 * @param {Response} res - The response object to send back the updated employee data.
 * @param {NextFunction} next - The next middleware function to handle errors.
 * @returns {Promise<void>} A promise that resolves when the response is sent.
 * @throws {Error} If an error occurs while updating the employee, it will be passed to the next middleware.
 */
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
/**
 * Controller to handle the deletion of an employee.
 * 
 * @async
 * @function controllerDeleteEmployees
 * @param {Request} req - The request object containing the employee ID in the URL params.
 * @param {Response} res - The response object to send back a success message.
 * @param {NextFunction} next - The next middleware function to handle errors.
 * @returns {Promise<void>} A promise that resolves when the response is sent.
 * @throws {Error} If an error occurs while deleting the employee, it will be passed to the next middleware.
 */
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