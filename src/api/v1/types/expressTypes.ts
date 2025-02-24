import { Request, Response, NextFunction } from "express";
/**
 * Type definition for a middleware function in an Express application.
 * 
 * This type describes a function that takes the `Request`, `Response`, and `NextFunction`
 * as arguments and does not return any value (i.e., it performs side-effects).
 * 
 * @typedef {Function} MiddlewareFunction
 * @param {Request} req - The incoming request object, representing the HTTP request.
 * @param {Response} res - The response object that will be sent back to the client.
 * @param {NextFunction} next - The function used to pass control to the next middleware.
 */
export type MiddlewareFunction = (
    req: Request,
    res: Response,
    next: NextFunction
) => void;

export type RequestBody = Record<string, unknown>;

export type RequestData<T extends RequestBody = RequestBody> = {
    body: T;
    params: Record<string, string>;
    query: Record<string, string | string[]>;
};