export class PromptValidationError extends Error {
  constructor(public issues?: string[]) {
    super(issues?.join(" ") ?? "Validation function returned a falsy value.");
  }
}
