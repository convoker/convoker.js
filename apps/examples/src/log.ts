import { Command, log } from "convoker";

// Convoker provides logging. Note, this doesn't replace `console` entirely -- this is more for local tracing and debugging.

export const logExample = new Command("log")
  .description("Logging example.")
  .version("1.0.0")
  .action(() => {
    // You can configure logging, change the stdout/stderr, format or theme:
    log.setConfig({
      format: "json",
    });

    // There are 5 log levels:
    log.trace("Debug message!");
    log.info("Informational message!");
    log.warn("Warning message!");
    log.error("Error message!");
    log.fatal("Fatal error message!"); // This also exits the program with exit code -1.
  });
