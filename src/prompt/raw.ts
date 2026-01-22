import readline from "node:readline";

/**
 * Reads a line from standard input.
 * @param message The message.
 * @param def Default value.
 * @param opts Options for reading a line.
 * @returns The line that was read.
 */
export function readLine(
  message = "",
  def?: string,
  opts?: { masked?: boolean; maskChar?: string; multiline?: boolean },
): Promise<string> {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: true,
    });

    if (opts?.masked) {
      const write = (rl as any)._writeToOutput.bind(rl);
      (rl as any)._writeToOutput = (str: string) => {
        if (str.match(/^\x1b/)) return write(str);
        if (str.endsWith("\n") || str.endsWith("\r")) return write(str);
        const mask = opts.maskChar ?? "*";
        write(mask.repeat(str.length));
      };
    }

    rl.question(message, (answer: string) => {
      rl.close();
      resolve(answer || def || "");
    });
  });
}

/**
 * Reads a single key from stdin.
 * @returns The key that was read.
 */
export async function readKey(): Promise<string> {
  return new Promise((resolve) => {
    const stdin = process.stdin;
    stdin.setRawMode(true);
    stdin.resume();
    stdin.once("data", (data: Buffer) => {
      const s = data.toString();
      stdin.setRawMode(false);
      stdin.pause();
      if (s === "\r" || s === "\n") return resolve("enter");
      if (s === " ") return resolve("space");
      if (s === "\u001b[A") return resolve("up");
      if (s === "\u001b[B") return resolve("down");
      if (s === "\u001b[C") return resolve("right");
      if (s === "\u001b[D") return resolve("left");
      return resolve(s);
    });
  });
}

/**
 * Clears `lines` amount of lines.
 * @param lines Amount of lines to clear.
 */
export function clearLines(lines = 1) {
  for (let i = 0; i < lines; i++) process.stdout.write("\x1b[2K\x1b[1A");
  process.stdout.write("\x1b[2K\r");
}

/**
 * Moves the cursor up `n` times.
 * @param n The amount of steps to move.
 */
export function cursorUp(n = 1) {
  process.stdout.write(`\x1b[${n}A`);
}

/**
 * Moves the cursor down `n` times.
 * @param n The amount of steps to move.
 */
export function cursorDown(n = 1) {
  process.stdout.write(`\x1b[${n}B`);
}
