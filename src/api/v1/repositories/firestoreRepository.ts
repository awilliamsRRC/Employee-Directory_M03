import { db } from "../../../../config/firebaseConfig";
import { DocumentReference } from "firebase-admin/firestore";
import { FieldValue, Timestamp } from "firebase-admin/firestore";
import { RepositoryError } from "../errors/errors";
import {
    getErrorMessage,
    getErrorCode,
    getFirebaseErrorStatusCode,
} from "../utils/errorUtils";

/**
 * Defines the allowed data types that can be stored in Firestore.
 * These types are restricted to ensure type safety when working with Firestore documents.
 */
type FirestoreDataTypes =
    | string
    | number
    | boolean
    | null
    | Timestamp
    | FieldValue;

/**
 * Represents a field-value pair used for querying documents.
 * Used primarily in filtering operations when deleting multiple documents.
 */
interface FieldValuePair {
    fieldName: string;
    fieldValue: FirestoreDataTypes;
}

/**
 * Executes a Firestore transaction and handles errors if they occur.
 * 
 * @async
 * @function runTransaction
 * @template T - The type of the result returned by the transaction operation.
 * @param {Function} operations - A function that takes a Firestore `Transaction` object and performs operations within the transaction.
 * @param {FirebaseFirestore.Transaction} operations.transaction - The Firestore transaction object passed to the operation function.
 * @returns {Promise<T>} A promise that resolves with the result of the transaction operation.
 * @throws {RepositoryError} If the transaction fails, a custom `RepositoryError` is thrown with error details.
 */
export const runTransaction = async <T>(
    operations: (transaction: FirebaseFirestore.Transaction) => Promise<T>
): Promise<T> => {
    try {
        return await db.runTransaction(operations);
    } catch (error: unknown) {
        throw new RepositoryError(
            `Transaction failed: ${getErrorMessage(error)}`,
            getErrorCode(error),
            getFirebaseErrorStatusCode(error)
        );
    }
};

/**
 * Creates a new document in the specified collection.
 *
 * @template T - The type of data being stored
 * @param collectionName - The name of the collection to create the document in
 * @param data - The data to be stored in the document
 * @param id - Optional custom document ID. If not provided, Firestore will auto-generate one
 * @returns Promise resolving to the created document's ID
 * @throws Error if document creation fails
 *
 * @example
 * const docId = await createDocument('users', { name: 'John', age: 25 });
 */
export const createDocument = async <T>(
    collectionName: string,
    data: Partial<T>,
    id?: string
): Promise<string> => {
    try {
        let docRef: FirebaseFirestore.DocumentReference;

        // If an ID is provided, use it to create a document at that specific ID
        // Otherwise, let Firestore auto-generate an ID
        if (id) {
            docRef = db.collection(collectionName).doc(id);
            await docRef.set(data);
        } else {
            docRef = await db.collection(collectionName).add(data);
        }

        return docRef.id;
    } catch (error: unknown) {
        throw new RepositoryError(
            `Failed to create document in ${collectionName}: ${getErrorMessage(
                error
            )}`,
            getErrorCode(error),
            getFirebaseErrorStatusCode(error)
        );
    }
};

/**
 * Retrieves all documents from a specified collection.
 * Note: Be cautious with this function on large collections as it fetches all documents.
 *
 * @param collectionName - The name of the collection to retrieve documents from
 * @returns Promise resolving to a QuerySnapshot containing all documents
 * @throws Error if fetching documents fails
 */
export const getDocuments = async (
    collectionName: string
): Promise<FirebaseFirestore.QuerySnapshot> => {
    try {
        return await db.collection(collectionName).get();
    } catch (error: unknown) {
        throw new RepositoryError(
            `Failed to fetch documents from ${collectionName}: ${getErrorMessage(
                error
            )}`,
            getErrorCode(error),
            getFirebaseErrorStatusCode(error)
        );
    }
};

/**
 * Updates a specific document in a collection with new data.
 * Only the fields specified in the data parameter will be updated.
 *
 * @template T - The type of the document data
 * @param collectionName - The name of the collection containing the document
 * @param id - The ID of the document to update
 * @param data - Partial data to update in the document
 * @throws Error if updating the document fails
 *
 * @example
 * await updateDocument('users', 'userId', { age: 26, lastUpdated: new Date() });
 */
export const updateDocument = async <T>(
    collectionName: string,
    id: string,
    data: Partial<T>
): Promise<void> => {
    try {
        await db.collection(collectionName).doc(id).update(data);
    } catch (error: unknown) {
        throw new RepositoryError(
            `Failed to update document ${id} in ${collectionName}: ${getErrorMessage(
                error
            )}`,
            getErrorCode(error),
            getFirebaseErrorStatusCode(error)
        );
    }
};

/**
 * Deletes a specific document from a collection.
 * Can be used both with and without a transaction.
 *
 * @param collectionName - The name of the collection containing the document
 * @param id - The ID of the document to delete
 * @param transaction - Optional transaction object for atomic operations
 * @throws Error if deleting the document fails
 *
 * @example
 * // Simple delete
 * await deleteDocument('users', 'userId');
 *
 * // Delete within a transaction
 * await runTransaction(async (transaction) => {
 *   await deleteDocument('users', 'userId', transaction);
 * });
 */
export const deleteDocument = async (
    collectionName: string,
    id: string,
    transaction?: FirebaseFirestore.Transaction
): Promise<void> => {
    try {
        const docRef: FirebaseFirestore.DocumentReference = db
            .collection(collectionName)
            .doc(id);

        // If transaction is provided, use it for atomic operations
        // Otherwise, perform a regular delete
        if (transaction) {
            transaction.delete(docRef);
        } else {
            await docRef.delete();
        }
    } catch (error: unknown) {
        throw new RepositoryError(
            `Failed to delete document ${id} from ${collectionName}: ${getErrorMessage(
                error
            )}`,
            getErrorCode(error),
            getFirebaseErrorStatusCode(error)
        );
    }
};