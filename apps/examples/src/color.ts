import { Command, color } from "convoker";

// Colors are available from the `convoker/color` module or `color` from root.

export const colorExample = new Command("color")
  .version("1.0.0")
  .description("Example showing off colors in Convoker.")
  .action(async () => {
    console.log(
      // bold       bright red      "Hello"       green bg      black         "World"
      `${color.bold(color.redBright("Hello"))}, ${color.bgGreen(color.black("World"))}!`,
    );
  });
