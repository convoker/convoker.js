/**
 * Thrown when the command fails to validate an input.
 */
export class InputValidationError extends Error {
  /**
   * A list of messages.
   */
  messages: string[];

  /**
   * Creates a new input validation error.
   * @param messages The messages.
   */
  constructor(messages: string[]) {
    super(`Validation failed: ${messages.join(", ")}`);
    this.messages = messages;
  }
}
