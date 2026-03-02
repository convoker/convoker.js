import { Command, i } from "convoker";

// Convoker allows you to validate inputs, that being positional arguments or flags/options.
// This can be done with a validation library that supports Standard Schema, like Zod or Valibot:
import { z } from "zod";
// or just simple strings if you don't need further validation.

export const inputExample = new Command("input")
  // To define inputs, you use the `.input()` function and pass an object.
  .input({
    // Convoker provides input utilities from the `convoker/input` module or the `i` object in root.
    x: i.option(z.coerce.number(), "--x", "-x"), // If you want more complex validation
    y: i.option("number", "--y", "-y"), // If you don't need a validator
  })
  // This input is accessible as the first argument of either middlewares or actions,
  // and is fully type-safe.
  .use(({ x, y }, next) => next())
  .action(({ x, y }) => {
    console.log(`x: ${x}, y: ${y}`);
  });
