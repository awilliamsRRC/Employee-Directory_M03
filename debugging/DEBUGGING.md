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


-   **Behavior:** It accepts mockItem  in POST and I assume because mockItem in PUT  is   different address it causes validation errors. Soloution use same address from PUT.    

### Analysis

-   What did you learn from this scenario?
-   Did you observe any unexpected behavior? If so, what might be the cause?
-   Are there areas for improvement or refactoring in this part of the code?
-   How does this enhance your understanding of the overall project?

## Scenario 2: [Title of the Scenario]

[Repeat the same format as Scenario 1]

## Scenario 3: [Title of the Scenario]

[Repeat the same format as Scenario 1]