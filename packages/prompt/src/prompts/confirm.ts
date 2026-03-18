import { createPrompt, type CoreOpts } from "@/core";

/**
 * Options for confirm input.
 */
export interface ConfirmOpts extends CoreOpts<boolean> {
  /**
   * What gets displayed for the Yes option.
   */
  yesLabel?: string;
  /**
   * What gets displayed for the No option.
   */
  noLabel?: string;
}

/**
 * Prompts the user to confirm an action.
 * @param opts Options for confirm input.
 * @returns If the user chose the "Yes" option.
 */
export default createPrompt<boolean, ConfirmOpts>(async (ctx) => {
  const { output, input, opts, done, abort, validate, theme } = ctx;

  const yesLabel = opts.yesLabel ?? "Yes";
  const noLabel = opts.noLabel ?? "No";

  const yesKey = yesLabel[0]?.toLowerCase() ?? "y";
  const noKey = noLabel[0]?.toLowerCase() ?? "n";

  const defaultValue =
    opts.default === undefined ? undefined : Boolean(opts.default);

  const prefix = theme.prompt?.prefix?.("?") ?? theme.primary("?");

  const message = theme.prompt?.message?.(opts.message) ?? opts.message;

  const formatOption = (label: string, key: string, active: boolean) => {
    const display = active ? key.toUpperCase() : key.toLowerCase();
    const text = `${display}`;

    return active
      ? (theme.prompt?.input?.(text) ?? text)
      : theme.secondary(text);
  };

  const options = `(${formatOption(yesLabel, yesKey, defaultValue === true)}/${formatOption(
    noLabel,
    noKey,
    defaultValue === false,
  )})`;

  output.write(`${prefix} ${message} ${options} `);

  input.setEncoding("utf8");
  input.resume();

  input.on("data", async (chunk: string) => {
    if (chunk === "\u0003") {
      abort();
      return;
    }

    const key = chunk.trim().toLowerCase();

    let value: boolean | undefined;

    if (!key && defaultValue !== undefined) {
      value = defaultValue;
    } else if (key === yesKey || key === "y") {
      value = true;
    } else if (key === noKey || key === "n") {
      value = false;
    } else {
      return;
    }

    try {
      const validated = await validate(value);
      done(validated);
    } catch (err) {
      ctx.error(err);
    }
  });
});
