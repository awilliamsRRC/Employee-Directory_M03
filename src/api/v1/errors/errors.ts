import { CONTROL_ERROR_CODE, ROUTE_ERROR_CODE,VALIDATION_ERROR_CODE } from "../../../constants/errorConstants";
import { HTTP_STATUS } from "../../../constants/httpConstants";

/**
 * Class representing a repository error.
 * Extends the built-in Error class to include an error code.
 */
export class RepositoryError extends Error {
    code: string;
    statusCode: number;

    /**
     * Creates a new RepositoryError instance.
     * @param {string} message - The error message.
     * @param {string} code - The error code.
     * @param {number} code - The the http response code.
     */
    constructor(
        message: string,
        code: string,
        statusCode: number = HTTP_STATUS.INTERNAL_SERVER_ERROR
    ) {
        super(message);
        this.name = "RepositoryError";
        this.code = code;
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, RepositoryError.prototype);
    }
}

/**
 * Class representing a service error.
 * Extends the built-in Error class to include an error code.
 */
export class ServiceError extends Error {
    code: string;
    statusCode: number;

    /**
     * Creates a new ServiceError instance.
     * @param {string} message - The error message.
     * @param {string} code - The error code.
     * @param {number} code - The the http response code.
     */
    constructor(
        message: string,
        code: string,
        statusCode: number = HTTP_STATUS.INTERNAL_SERVER_ERROR
    ) {
        super(message);
        this.name = "ServiceError";
        this.code = code;
        this.statusCode = statusCode;
    }
}

/**
 * Class representing a controller error.
 * Extends the built-in Error class to include an error code.
 */
export class ControlError extends Error {
    code: string;
    statusCode: number;

    /**
     * Creates a new ControlError instance.
     * @param {string} message - The error message.
     * @param {string} code - The error code.
     * @param {number} statusCode - The the http response code.
     */
    constructor(
        message: string = "Server was not reached." ,
        code: string = CONTROL_ERROR_CODE,
        statusCode: number = HTTP_STATUS.BAD_REQUEST
    ) {
        super(message);
        this.name = "ControlError";
        this.code = code;
        this.statusCode = statusCode;
    }
    
}
/**
 * Class representing a Router error.
 * Extends the built-in Error class to include an error code.
 */
export class RouteError extends Error {
    code: string;
    statusCode: number;
    /**
     * Creates a new RouteError instance.
     * @param {string} message - The error message.
     * @param {string} code - The error code.
     * @param {number} code - The the http response code.
     */
    constructor(
        message: string = "Client Enter Wrong Route",
        code: string = ROUTE_ERROR_CODE,
        statusCode: number = HTTP_STATUS.NOT_FOUND
    ) {
        super(message);
        this.name = "RouteError";
        this.code = code;
        this.statusCode = statusCode;
    }
}
/**
 * Class representing a validation error.
 * Extends the built-in Error class to include an error code.
 */
export class ValidationError extends Error {
    code: string;
    statusCode: number;

    /**
     * Creates a new ValidationError instance.
     * @param {string} message - The error message.
     * @param {string} code - The error code.
     * @param {number} code - The the http response code.
     */
    constructor(
        message: string = " incorrect data format.",
        code: string = VALIDATION_ERROR_CODE,
        statusCode: number = HTTP_STATUS.INTERNAL_SERVER_ERROR
    ) {
        super(message);
        this.name = "ValidationError";
        this.code = code;
        this.statusCode = statusCode;
    }
}