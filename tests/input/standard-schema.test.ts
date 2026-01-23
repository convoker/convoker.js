import { InputValidationError } from "@/input";
import { validate } from "@/input/standard-schema";
import * as v from "valibot";

import { describe, expect, test } from "vitest";

describe("validate()", () => {
  test("validate() returns parsed input", async () => {
    expect(await validate(v.string(), "hello world")).toBe("hello world");
  });

  test("validate() throws on wrong input", async () => {
    await expect(() => validate(v.number(), "hello world")).rejects.toThrow(
      InputValidationError,
    );
  });
});
