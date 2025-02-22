import { Request, Response, NextFunction } from "express";
import { Branch } from "../models/branchmodel";
import {
    getDocuments,
    createDocument,
    updateDocument,
    deleteDocument,
} from "../repositories/firestoreRepository";

const COLLECTION = "branches";



const branches: Branch[] = [];

export const serviceGetAllBranches = async (): Promise<Branch[]> => {
    const snapshot: FirebaseFirestore.QuerySnapshot = await getDocuments(
        COLLECTION
    );

    return snapshot.docs.map((doc) => {
        const data: FirebaseFirestore.DocumentData = doc.data();
        return { id: doc.id, ...data } as Branch;
    });
};

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

export const serviceUpdateBranches = async (
    id: string,
    branch: {name: string; address: string; phone:string;}
): Promise<Branch> => {
    
    await updateDocument(COLLECTION, id, branch);
    return { id, ...branch } as Branch;
    
};

export const serviceDeleteBranches = async (id: string): Promise<void> => {
    await deleteDocument(COLLECTION, id);

};