"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import the express application and type definition
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const employeeRoutes_1 = __importDefault(require("./api/v1/routes/employeeRoutes"));
const branchRoutes_1 = __importDefault(require("./api/v1/routes/branchRoutes"));
//import employeeRoutes from "./api/v1/routes/employeeRoutes";
// Initialize the express application
const app = (0, express_1.default)();
app.use((0, morgan_1.default)("combined"));
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Hello, World!");
});
app.get("/api/v1/health", (req, res) => {
    res.json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    });
});
// For any request that starts with /api/v1/employees, route it to the employeeRoutes module.
app.use("/api/v1/employees", employeeRoutes_1.default);
app.use("/api/v1/branch", branchRoutes_1.default);
exports.default = app;
