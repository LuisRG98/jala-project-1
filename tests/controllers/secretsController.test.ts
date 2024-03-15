import request from "supertest";
import app from "../../src/app";
import * as utils from "../../src/utils/index";

jest.mock("../../src/utils/index", () => ({
  ...jest.requireActual("../../src/utils/index"),
  generateSecretKey: jest.fn().mockReturnValue("mocked-secret-key"),
}));

describe("API Integration Tests", () => {
  it("should create a new secret with mocked key", async () => {
    const message = "Hello, world!";

    const response = await request(app).post("/api/secrets").send({ message });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("secretKey", "mocked-secret-key");
  });

  it("should retrieve a secret with mocked key", async () => {
    const message = "Hello, world!";
    const secretKey = "mocked-secret-key";

    utils.secrets[secretKey] = message;

    const response = await request(app).get(`/api/secrets/${secretKey}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("secretMessage", message);
  });
});
