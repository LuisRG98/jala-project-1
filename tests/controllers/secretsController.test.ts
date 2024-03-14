import { generateSecretKey, secrets } from "../../src/utils/index";

import request from "supertest";
import app from "../../src/app";

describe("Secrets Controller", () => {
  afterEach(() => {
    Object.keys(secrets).forEach((key) => {
      delete secrets[key];
    });
  });

  it("should create a new secret", async () => {
    const message = "Hello, world!";
    const secretKey = generateSecretKey();
    const response = await request(app)
      .post("/api/secrets")
      .send({ message, secretKey })
      .expect(201);

    expect(response.body).toHaveProperty("secretKey", secretKey);
    expect(secrets).toHaveProperty(secretKey, message);
  });

  it("should return an error when creating a secret without a message", async () => {
    const response = await request(app)
      .post("/api/secrets")
      .send({})
      .expect(400);

    expect(response.body).toHaveProperty("error", "Message is required");
  });

  it("should retrieve a secret", async () => {
    const message = "Hello, world!";
    const secretKey = generateSecretKey();
    secrets[secretKey] = message;

    const response = await request(app)
      .get(`/api/secrets/${secretKey}`)
      .expect(200);

    expect(response.body).toHaveProperty("secretMessage", message);
  });

  it("should return an error when retrieving a non-existent secret", async () => {
    const nonExistentSecretKey = "non-existent-secret-key";

    const response = await request(app)
      .get(`/api/secrets/${nonExistentSecretKey}`)
      .expect(404);

    expect(response.body).toHaveProperty("error", "Secret not found");
  });
});
