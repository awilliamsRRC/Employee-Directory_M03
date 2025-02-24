
//import { Branch } from "../models/branchmodel";
import {
    getDocuments,
    createDocument,
    updateDocument,
    deleteDocument,
} from "../repositories/firestoreRepository";

const COLLECTION = "branches";


export type Branch = {
    id: string;
    name: string;
    address: string;
    phone:string;
};
const branches: Branch[] = [];
/**
 * Retrieves all branches from the Firestore database.
 * 
 * @async
 * @function serviceGetAllBranches
 * @returns {Promise<Branch[]>} A promise that resolves to an array of branches.
 * @throws {Error} If an error occurs while fetching the branches, it will be thrown.
 */
export const serviceGetAllBranches = async (): Promise<Branch[]> => {
    const snapshot: FirebaseFirestore.QuerySnapshot = await getDocuments(
        COLLECTION
    );

    return snapshot.docs.map((doc) => {
        const data: FirebaseFirestore.DocumentData = doc.data();
        return { id: doc.id, ...data } as Branch;
    });
};
/**
 * Creates a new branch in the Firestore database.
 * 
 * @async
 * @function serviceCreateBranches
 * @param {Object} branch - The branch data to be created.
 * @param {string} branch.name - The name of the new branch.
 * @param {string} branch.address - The address of the new branch.
 * @param {string} branch.phone - The phone number of the new branch.
 * @returns {Promise<Branch>} A promise that resolves to the created branch, including its ID.
 * @throws {Error} If an error occurs while creating the branch, it will be thrown.
 */
export const serviceCreateBranches = async (branch: {
    name: string;
    address: string;
    phone: string;
}): Promise<Branch> => {
    const newBranch: Omit<Branch, 'id'> = { 
        name: branch.name, 
        address: branch.address,
        phone: branch.phone,
    };

    const docId = await createDocument(COLLECTION,newBranch);
   
    return { id: docId, ...newBranch };
};
/**
 * Updates an existing branch in the Firestore database.
 * 
 * @async
 * @function serviceUpdateBranches
 * @param {string} id - The ID of the branch to be updated.
 * @param {Object} branch - The updated branch data.
 * @param {string} branch.name - The new name of the branch.
 * @param {string} branch.address - The new address of the branch.
 * @param {string} branch.phone - The new phone number of the branch.
 * @returns {Promise<Branch>} A promise that resolves to the updated branch, including its ID.
 * @throws {Error} If an error occurs while updating the branch, it will be thrown.
 */
export const serviceUpdateBranches = async (
    id: string,
    branch: {name: string; address: string; phone:string;}
): Promise<Branch> => {
    
    await updateDocument(COLLECTION, id, branch);
    return { id, ...branch } as Branch;
    
};
/**
 * Deletes a branch from the Firestore database.
 * 
 * @async
 * @function serviceDeleteBranches
 * @param {string} id - The ID of the branch to be deleted.
 * @returns {Promise<void>} A promise that resolves when the branch is deleted.
 * @throws {Error} If an error occurs while deleting the branch, it will be thrown.
 */
export const serviceDeleteBranches = async (id: string): Promise<void> => {
    await deleteDocument(COLLECTION, id);

};