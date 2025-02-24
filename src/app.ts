// import the express application and type definition
import express, { Express,Request,Response } from "express";
import morgan from "morgan";
import employeeRoutes from "./api/v1/routes/employeeRoutes";
import branchRoutes from "./api/v1/routes/branchRoutes";
import setupSwagger from "../config/swagger";
import errorHandler from "./api/v1/middleware/errorHandler";


const app: Express = express();
setupSwagger(app);

app.use(morgan("combined"));
app.use(express.json());

app.get("/",(req:Request,res:Response) => {
    res.send("Hello, World!");

});

app.get("/api/v1/health", (req:Request,res:Response) => {
    res.json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    
    });
});

app.use("/api/v1/employees", employeeRoutes);
app.use("/api/v1/branches", branchRoutes);
app.use(errorHandler);



export default app;



