import type { InteractiveContext } from "@/core";

export function renderSelectHeader(
  ctx: InteractiveContext<any, any, any>,
  query?: string,
) {
  const { theme, output, opts } = ctx;

  const prefix = theme.prompt?.prefix?.("?") ?? theme.primary("?");

  const message =
    theme.prompt?.message?.(opts.message ?? "") ?? opts.message ?? "";

  const text = query ?? message;

  output.write(`${prefix} ${text}\n`);
}

export function renderOption(
  ctx: InteractiveContext<any, any, any>,
  {
    label,
    hint,
    disabled,
    isCursor,
    isSelected,
    multiple,
  }: {
    label: string;
    hint?: string;
    disabled?: boolean;
    isCursor: boolean;
    isSelected?: boolean;
    multiple?: boolean;
  },
) {
  const { theme, output } = ctx;

  const cursorSymbol = theme.symbols?.cursor ?? ">";

  const cursor = isCursor ? cursorSymbol : " ";

  let line = `${cursor} `;

  if (multiple) {
    const box = isSelected ? "[x]" : "[ ]";
    line += `${box} `;
  }

  let text = label;

  if (disabled) {
    text = theme.prompt?.inactive?.(label) ?? theme.secondary(label);
  } else if (isCursor) {
    text = theme.prompt?.highlight?.(label) ?? theme.primary(label);
  } else if (isSelected) {
    text = theme.prompt?.selected?.(label) ?? theme.accent?.(label) ?? label;
  }

  line += text;

  if (hint) {
    const hintText =
      theme.prompt?.inactive?.(` ${hint}`) ?? theme.secondary(` ${hint}`);
    line += hintText;
  }

  output.write(line + "\n");
}

export function renderEmpty(ctx: InteractiveContext<any, any, any>) {
  const { output, theme } = ctx;

  const text =
    theme.prompt?.inactive?.("No results") ?? theme.secondary("No results");

  output.write(`  ${text}\n`);
}
