import request from "supertest";
import { Response } from "supertest";
import app from "../src/app";
/**
 * Test suite for the GET `/` route.
 * 
 * This test verifies that the root endpoint ("/") returns the correct response.
 * It checks if the status code is 200 and the text response is "Hello, World!".
 * 
 * @group GET / - Test Suite
 */
describe("GET /", () => {
	/**
     * Test for the root endpoint that expects a "Hello, World!" response.
     * 
     * It sends a GET request to the root URL ("/") and checks:
     * - If the status code is 200, indicating the request was successful.
     * - If the response text is exactly "Hello, World!".
     * 
     * @test {GET /}
     * @returns {Promise<void>} A promise that resolves when the test completes.
     */
	it("should return Hello, World!", async () => {
		const response: Response = await request(app).get("/");
		expect(response.status).toBe(200);
		expect(response.text).toBe("Hello, World!");
	});
});