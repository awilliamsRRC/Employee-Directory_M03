import express, { Router } from "express";
import * as employeesController from "../controllers/employeesController";
import { employeeSchema } from "../schemas/employeeSchema";
import { validateRequest } from "../middleware/validate";

const routerEmployee: Router = express.Router();


/**
 * @openapi
 * /employees:
 *   get:
 *     summary: Get all employees
 *     operationId: getAllEmployees
 *     tags:
 *       - Employees
 *     responses:
 *       200:
 *         description: A list of all employees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   position:
 *                     type: string
 *                   department:
 *                     type: string
 *       500:
 *         description: Internal server error
 */
routerEmployee.get("/", employeesController.controllerGetAllEmployees);

/**
 * @openapi
 * /employees:
 *   post:
 *     summary: Create a new employee
 *     operationId: createEmployee
 *     tags:
 *       - Employees
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               position:
 *                 type: string
 *               department:
 *                 type: string
 *     responses:
 *       201:
 *         description: Employee created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 position:
 *                   type: string
 *                 department:
 *                   type: string
 *       400:
 *         description: Bad request (invalid data)
 *       500:
 *         description: Internal server error
 */
routerEmployee.post("/", validateRequest(employeeSchema),employeesController.controllerCreateEmployees);

/**
 * @openapi
 * /employees/{id}:
 *   put:
 *     summary: Update an existing employee
 *     operationId: updateEmployee
 *     tags:
 *       - Employees
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the employee to update
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               position:
 *                 type: string
 *               department:
 *                 type: string
 *     responses:
 *       200:
 *         description: Employee updated successfully
 *       400:
 *         description: Invalid data supplied
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Internal server error
 */
routerEmployee.put("/:id", validateRequest(employeeSchema),employeesController.controllerUpdateEmployees);

/**
 * @openapi
 * /employees/{id}:
 *   delete:
 *     summary: Delete an employee
 *     operationId: deleteEmployee
 *     tags:
 *       - Employees
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the employee to delete
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Employee deleted successfully
 *       400:
 *         description: Invalid employee ID
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Internal server error
 */
routerEmployee.delete("/:id", employeesController.controllerDeleteEmployees);

export default routerEmployee;
