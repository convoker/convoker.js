import { Command } from "convoker";

// Welcome to Convoker! This directory contains a few examples you can use
// to build your own CLI application.

// The base of Convoker is argument parsing, but as with every other module, this is not required.
// You can just use logging, or just use prompting, and completely ignore CLI parsing.
// Each module is available as an export: `convoker/prompt`, `convoker/log`.
const program = new Command("examples")
  // You can set metadata. This is shown in help screens.
  .description("Example Convoker application.")
  .version("0.1.0")
  // Convoker is middleware-based. Usually, the root middleware is for warning the user or setting up other aspects. It's the first thing that runs after parsing arguments.
  // The first argument is the input (see input.ts in this directory), and the second is the next in the chain. The `next` functions is asynchronous and returns a promise, so you must either also return it or await it.
  .use((_, next) => next());

// There are three main ways to define subcommands in Convoker.

// 1. Callback function
// This creates a new command, adds it to the first command and passes it to a function you define as the second argument, and returns the first command (in this case, `program`).
program.subCommand("greet", (c) =>
  c
    .description("Says hello.")
    .version("1.0.0")
    .action(async () => {
      console.log("Hello, World!");
    }),
);

// 2. Builder pattern
// Creates a new command and returns it, allowing you to chain it with other methods.
program
  .subCommand("add:2+3")
  .description("Adds 2 and 3.")
  .action(async () => {
    const a = 2;
    const b = 3;
    const c = a + b;
    console.log(`${a} + ${b} = ${c}`);
  })
  .allowUnknownOptions()
  .allowSurpassArgLimit();

// 3. Manual adding
// You create a new command yourself and add it using `.add()`. This is useful if you have a command in a different file, for example.
const subtract2and3 = new Command("sub:2-3")
  .description("Subtracts 2 and 3.")
  .action(() => {
    const a = 2;
    const b = 3;
    const c = a - b;
    console.log(`${a} - ${b} = ${c}`);
  });

program.add(subtract2and3);

// We're going to import and add a few commands from different files, that explain
// other concepts in Convoker.

import { inputExample } from "./input";
import { colorExample } from "./color";
import { promptExample } from "./prompt";
import { logExample } from "./log";

program.add(inputExample, colorExample, promptExample, logExample);

// You can run your program by calling `.run()`, which returns a promise:
async function main() {
  await program.run();
  // You can also optionally pass arguments. By default, it is your runtime's `argv`.

  // If you don't need your program to run, you can also use `.parse(argv)`:
  const {
    // The command to run. This is important if you have subcommands, otherwise you can just use `program`.
    command,
    // What errors happened during parsing. This includes things like "too many arguments" and "missing required option" wrapped in an `Error` object.
    errors,
    // Parsed input. Programs define inputs as shown above, and this includes that input.
    input,
    // If `--help` was passed into the program.
    isHelp,
    // If `--version` was passed into the program.
    isVersion,
  } = await program.parse(["greet", "John"]);
  // `.parse()` does require that you pass the arguments manually.

  console.log("exited");
}

main();
