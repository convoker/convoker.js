import { createPrompt, PromptValidationError, type CoreOpts } from "@/core";
import os from "node:os";
import fs from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";
import readline from "node:readline";

/**
 * Options for opening the system editor.
 */
export interface EditorOpts extends CoreOpts<string> {
  /**
   * If the input is required for continuing or not.
   */
  required?: boolean;
  inline?: boolean;
}

/**
 * Opens the system editor.
 * @param opts Options for system editor input.
 * @returns The contents of the file.
 */
export default createPrompt<string, EditorOpts>(async (ctx) => {
  const { done, error, validate, abort } = ctx;

  const tmp = path.join(os.tmpdir(), `tmp-${Date.now()}.txt`);
  await fs.writeFile(tmp, ctx.opts.default ?? "", "utf-8");

  const cleanupFile = async () => {
    try {
      await fs.unlink(tmp);
    } catch {
      // ignore
    }
  };

  try {
    let contents: string;

    // ---------- INLINE MODE ----------
    if (ctx.opts.inline) {
      const rl = readline.createInterface({
        input: ctx.input,
        output: ctx.output,
      });

      const lines: string[] = [];

      ctx.output.write("Enter your text. Submit empty line to finish.\n\n");

      for await (const line of rl) {
        if (!line.trim()) break;
        lines.push(line);
      }

      rl.close();
      contents = lines.join("\n");
    } else {
      // ---------- EXTERNAL EDITOR MODE ----------
      const editor =
        process.env.VISUAL ||
        process.env.EDITOR ||
        (process.platform === "win32" ? "notepad" : "vi");

      await new Promise<void>((resolve, reject) => {
        const child = spawn(editor, [tmp], {
          stdio: "inherit",
        });

        child.on("error", reject);
        child.on("exit", (code) => {
          if (code && code !== 0) {
            reject(new Error(`Editor exited with code ${code}`));
          } else {
            resolve();
          }
        });
      });

      contents = await fs.readFile(tmp, "utf-8");
    }

    contents = contents.trimEnd();

    if (ctx.opts.required && !contents.trim()) {
      throw new PromptValidationError(["Input is required."]);
    }

    const validated = await validate(contents);
    done(validated);
  } catch (err) {
    if ((err as any)?.name === "AbortError") {
      abort();
    } else {
      error(err);
    }
  } finally {
    await cleanupFile();
  }
});
