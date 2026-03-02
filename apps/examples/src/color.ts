import { Command, theme } from "convoker";

// Colors are available from the `convoker/color` module or `color` from root.

export const colorExample = new Command("color")
  .version("1.0.0")
  .description("Example showing off colors in Convoker.")
  .action(async () => {
    console.log(
      // bold       bright red      "Hello"       green bg      black         "World"
      `${theme.bold(theme.redBright("Hello"))}, ${theme.bgGreen(theme.black("World"))}!`,
    );
  });
