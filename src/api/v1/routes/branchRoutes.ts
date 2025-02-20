import express, { Router } from "express";
import * as branchController from "../controllers/branchController";
import { branchSchema } from "../schemas/branchSchema";
import { validateRequest } from "../middleware/validate";
const routerBranch: Router = express.Router();



/**
 * @openapi
 * /branch:
 *   get:
 *     summary: Get all branches
 *     operationId: getAllBranches
 *     tags:
 *       - Branches
 *     responses:
 *       200:
 *         description: A list of all branches
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   location:
 *                     type: string
 *       500:
 *         description: Internal server error
 */
routerBranch.get("/", branchController.controllerGetAllBranches);

/**
 * @openapi
 * /branch:
 *   post:
 *     summary: Create a new branch
 *     operationId: createBranch
 *     tags:
 *       - Branches
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               location:
 *                 type: string
 *     responses:
 *       201:
 *         description: Branch created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 location:
 *                   type: string
 *       400:
 *         description: Bad request (invalid data)
 *       500:
 *         description: Internal server error
 */
routerBranch.post("/", validateRequest(branchSchema),branchController.controllerCreateBranches);

/**
 * @openapi
 * /branch/{id}:
 *   put:
 *     summary: Update an existing branch
 *     operationId: updateBranch
 *     tags:
 *       - Branches
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the branch to update
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
 *               name:
 *                 type: string
 *               location:
 *                 type: string
 *     responses:
 *       200:
 *         description: Branch updated successfully
 *       400:
 *         description: Invalid data supplied
 *       404:
 *         description: Branch not found
 *       500:
 *         description: Internal server error
 */
routerBranch.put("/:id", validateRequest(branchSchema), branchController.controllerUpdateBranches);

/**
 * @openapi
 * /branch/{id}:
 *   delete:
 *     summary: Delete a branch
 *     operationId: deleteBranch
 *     tags:
 *       - Branches
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the branch to delete
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Branch deleted successfully
 *       400:
 *         description: Invalid branch ID
 *       404:
 *         description: Branch not found
 *       500:
 *         description: Internal server error
 */
routerBranch.delete("/:id", branchController.controllerDeleteBranches);

export default routerBranch;
