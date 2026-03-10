---
title: Prompting
description: Convoker has a built-in prompting utility for CLI programs.
---

Prompting is essential to many command-line programs. It's the act of asking the user for input, which can be a simple checkbox or a multi-selection search box.

## Built-in prompts

All built-in prompts' options extend this interface:

```ts
export interface CoreOpts<T> {
  /**
   * The message of the prompt.
   */
  message: string;
  /**
   * A validator function, or a Standard Schema validator.
   */
  validate?: StandardSchemaV1<any, T> | ((value: T) => boolean | T);
  /**
   * The theme of the prompt.
   */
  theme?: Theme;
  /**
   * The default value.
   */
  default?: T;

  /**
   * The standard input. Defaults to `process.stdin`.
   */
  input?: import("node:tty").ReadStream;
  /**
   * The standard output. Defaults to `process.stdout`.
   */
  output?: import("node:tty").WriteStream;
  /**
   * If the screen should be cleared when finishing a prompt.
   */
  clearPromptOnDone?: boolean;
  /**
   * An `AbortSignal` to cancel the prompt.
   */
  signal?: AbortSignal;
}
```

### Text prompts

- ```ts
  await prompt.text({
    /**
     * A placeholder, displayed when the user hasn't typed anything yet.
     */
    placeholder?: string,
    /**
     * Minimum length of the input.
     */
    minLength?: number,
    /**
     * Maximum length of the input.
     */
    maxLength?: number,
  });
  ```

  A simple text input.

- ```ts
  await prompt.password({
    /**
     * A placeholder, displayed when the user hasn't typed anything yet.
     */
    placeholder?: string,
    /**
     * Minimum length of the input.
     */
    minLength?: number,
    /**
     * Maximum length of the input.
     */
    maxLength?: number,
    /**
     * The mask for the password input.
     */
    mask?: string,
    /**
     * If the user should be asked to confirm the password, by typing it again.
     */
    confirm?: boolean,
  });
  ```

  A masked password input.

- ```ts
  await prompt.editor({
    /**
     * If the input is required for continuing or not.
     */
    required?: boolean,
    /**
     * If editing should be inline. Omit or set to `false` to open the default editor.
     */
    inline?: boolean,
  });
  ```

  Opens the system editor, or asks for multi-line input inline.

### Selection prompts

- ```ts
  await prompt.confirm({
    /**
     * What gets displayed for the Yes option.
     */
    yesLabel?: string,
    /**
     * What gets displayed for the No option.
     */
    noLabel?: string,
  });
  ```

  A simple checkbox, where the users press `y` (yes) or `n` (no).

- ```ts
  await prompt.select({
    /**
     * Every option the user can pick from.
     */
    options: {
      /**
       * The label (what gets displayed) of the select option.
       */
      label: string,
      /**
       * The value (what gets returned) of the select option.
       */
      value: T,
      /**
       * A description of the option.
       */
      hint: string,
      /**
       * If this option is disabled.
       */
      disabled: boolean,
    }[],
    /**
     * If the user can select multiple options.
     */
    multiple?: M,
    /**
     * The initial option selected.
     */
    initialIndex?: number,
  });
  ```

  A scrollable select box, allowing the user to pick an option or multiple.

- ```ts
  await prompt.search({
    /**
     * Every option the user can pick from.
     */
    options: {
      /**
       * The label (what gets displayed) of the select option.
       */
      label: string,
      /**
       * The value (what gets returned) of the select option.
       */
      value: T,
      /**
       * A description of the option.
       */
      hint: string,
      /**
       * If this option is disabled.
       */
      disabled: boolean,
    }[],
    /**
     * If the user can select multiple options.
     */
    multiple?: M,
    /**
     * The initial option selected.
     */
    initialIndex?: number,
    /**
     * Placeholder for the search input.
     */
    placeholder?: string;
    /**
     * Minimum length for a query string.
     */
    minQueryLength?: number;
    /**
     * Transforms a query before running filter functions.
     * @param query The query.
     */
    transformQuery?(query: string): Q;
    /**
     * Filters a single option.
     * @param query The search query.
     * @param option The option to filter.
     */
    filter?(query: Q, option: SelectOption<T>): boolean;
  });
  ```

  A scrollable search box, allowing the user to type in a query and pick between one option or multiple.

## Creating your own prompts

## `createPrompt`

`createPrompt` is useful for prompts that don't need to re-render. It takes a generic return type and options parameter and a simple setup function, with the following context, and returns a prompt function:

```ts
export interface PromptContext<T, O> {
  opts: CoreOpts<O>;
  value: T | undefined;
  done: (value: T) => void;
  error: (err: unknown) => void;
  abort: () => void;
  validate: (value: T) => Promise<T>;
  theme: Theme;
  input: import("node:tty").ReadStream;
  output: import("node:tty").WriteStream;
}
```

## `createInteractivePrompt`

`createInteractivePrompt` allows you to create _interactive_ prompts. It enters raw mode for you, and takes in a generic return type and options parameter, and a generic _state_ parameter, and an object, containing `setup`, `render` and `initialState` functions, all taking in this context, extending the non-interactive prompt context:

```ts
export interface InteractiveContext<T, O, S> extends PromptContext<T> {
  opts: CoreOpts<O>;
  state: S;
  setState: (updater: (prev: S) => S) => void;
  render: () => void;
  onKeypress: (handler: (key: Keypress) => void) => void;
}
```
