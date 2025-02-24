# Debugging Analysis

## Scenario 1: Function not called for upgrades in POST

-   **Breakpoint Location:** branchRoutes.test.ts Line 45
-   **Objective:** After I added validtion my tests didnt work no matter what i tried.

### Debugger Observations

-   **Variable States:** 
        The mock item incorrectly set state as **{**
        **name: "New BRanch",**
        **address: "123 Main street",**
        **phone: "+1234567890",**
        **}**

-   **Call Stack:** The call stack is showing the process of Jest starting up, loading test configurations, scheduling tests, running them, and processing the results. Each line represents a part of this process, with Jest handling internal module loading, scheduling tasks, running tests, and ultimately transforming the results into a usable format.


-   **Behavior:** It accepts mockItem  in POST and I assume because mockItem in PUT  is   different address it causes validation errors. Soloution use same address from PUT. It was acutually conflicting with validatiin schema, Missing ID etc.   

### Analysis

-   What did you learn from this scenario?
        I'll get validation errors if Request has incomplete paramters.

-   Did you observe any unexpected behavior? If so, what might be the cause?
        Yes, I was missiing ID so I rejected my request.
-   Are there areas for improvement or refactoring in this part of the code?
        I added a simple id "1".
-   How does this enhance your understanding of the overall project?
        Well I kind of understand whats happening with validating requests.

## Scenario 2: Looking at the CRUD operations in branch services file

-   **Breakpoint Location:** branchService.ts 32

### Debugger Observations

-   **Variable States:** 

        COLLECTION = "branches"
        branches = (0) []
        const snapshot = Uncaught SyntaxError: Missing initializer in const declaration

-   **Call Stack:** 

        It runs main file branchService.ts and prepares it to be  executed, then it wraps loading process for debugging, invokes  functioins with Reflect. It also triggers the loading of the given file in Node.js. Theres also a transpiler for .ts to .js file format.

-   **Behavior:** the createDocuments functions accepts branch paramters and promises to create new one. It omitted ID because firestore auto generated IDs
it calls createDocument from firestore repo along with which document and branch as parameters and returns doc id and new branch.

### Analysis

-   What did you learn from this scenario?
        How services and firestore repo interacts,
-   Did you observe any unexpected behavior? If so, what might be the cause?
        i got unseen errors, I might be typescripts syntax when initializing. I left and unsed array too.
-   Are there areas for improvement or refactoring in this part of the code?
        Properly intialize code and remove redudant code.
-   How does this enhance your understanding of the overall project?
        Alot im beter at firesotre now.

## Scenario 3: Error Handling Middleware

-   **Breakpoint Location:** middleware/errorHandler.ts Line 37
-   **Objective:** Whats this function is actually handling/doing.

### Debugger Observations

-   **Variable States:** 
        Import: ControlError, RepositoryError, RouteError, ServiceError, ValidationError
-   **Call Stack:** 
        It starts by running the main entry file (mainEntry), and wraps module loading (wrapModuleLoad). It then traces the module load process using Module._load and ReflectApply to execute code. The module is loaded and compiled based on its extension, and finally, a result is returned from the compiled wrapper. The export statement (export default errorHandler) indicates that a custom error handling middleware (errorHandler) is being exported for use in an Express application, ensuring consistent error responses across routes.
-   **Behavior:**

        The error handler accepts parameters for the request, response, and errors, along with a next function that continues to other middleware. If there's no error, the output is either null or undefined (in case of undocumented errors). The handler contains a nested if-else structure for custom error types, which respond with specific error messages. Finally, it exports the error handler for use in the Express application.

### Analysis

-   What did you learn from this scenario?
        How middle interacts with functions that manage custom erros.

-   Did you observe any unexpected behavior? If so, what might be the cause?

        The export function,Uncaught SyntaxError: Unexpected token 'export' I assume version issues but it still works.
-   Are there areas for improvement or refactoring in this part of the code?
        it's straight forward.
-   How does this enhance your understanding of the overall project?
        error handling in general
