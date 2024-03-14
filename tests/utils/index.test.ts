import { generateSecretKey } from "../../src/utils/index";

const SIZE: number = parseInt(process.env.SECRETSIZE as string) || 64;

describe("generateSecretKey function", () => {
  test("should generate a secret key of the correct length", () => {
    const secretKey = generateSecretKey();
    expect(secretKey.length).toBe(2 * SIZE);
  });
});
