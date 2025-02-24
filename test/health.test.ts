import request, {Response} from "supertest";
import app from "../src/app";
/**
 * Test suite for the Health Check endpoint `/api/v1/health`.
 */
describe("GET /api/v1/health", () => {
     /**
     * Test case to check if the server health status is returned correctly.
     * It sends a GET request to `/api/v1/health` and expects the server to return a 200 status and health-related data.
     */
    it("should return server health status", async () => {
        const response: Response = await request(app).get("/api/v1/health");
        expect(response.status).toBe(200);
        expect(response.body.status).toBe("OK");
        expect(response.body).toHaveProperty("uptime");
        expect(response.body).toHaveProperty("timestamp");
        expect(response.body).toHaveProperty("version");
    });
});