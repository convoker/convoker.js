---
title: Logging
description: Convoker has a built-in logging utility for CLI programs.
---

Logging is essential to long-running programs, CLI or otherwise. Convoker provides an utility for structured logging, a replacement for `console.log` in Node.js programs. It provides 5 log levels:

- `trace`: A debug log level, that can be hidden under a `verbose` flag. Prints in a lower contrast color and to `stdout` by default.
- `info`: An informational log level. Prints to `stdout` by default.
- `warn`: A warning log level. Prints in yellow and to `stderr` by default.
- `error`: An error log level. Prints in red and to `stderr` by default.
- `fatal`: A fatal error log level. Prints in bold red, to `stderr` by default and exits the program with exit code 1 (configurable).

All of these take in a variadic parameter of any type, and prints each item separated by spaces, and they're all synchronous.

You can configure what format you want your logs to be printed as, and where `stdout` and `stderr` should go to, using the `log.setConfig` function.
