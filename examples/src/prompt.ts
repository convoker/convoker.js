import { Command, prompt } from "convoker";

// Convoker provides utilities for prompting the user.

export const promptExample = new Command("prompt")
  .version("1.0.0")
  .description("Prompt the user.")
  .action(async () => {
    // The `text` prompt is a simple text input.
    const textResult = await prompt.text({
      message: "Type something!",
    });

    console.log(textResult);

    // The password prompt is a hidden input prompt.
    const password = await prompt.password({
      message: "Type your password!",
    });

    console.log(password);

    // The `select` prompt allows the user to choose between a series of pre-defined options.
    const selectResult = await prompt.select({
      message: "Select something!",
      options: [
        { label: "Option One", value: "one" },
        { label: "Option Two", value: "two" },
      ],
    });

    console.log(selectResult);

    // The multi-select prompt allows users to pick multiple options.
    const multiselect = await prompt.select({
      message: "Select multiple things!",
      options: [
        { label: "Option One", value: "one" },
        { label: "Option Two", value: "two" },
      ],
      multiple: true,
    });

    console.log(multiselect);

    // The search prompt filters between options, based on what the user types.
    const searchResult = await prompt.search({
      message: "Search for something!",
      options: [
        { label: "Option One", value: "one" },
        { label: "Option Two", value: "two" },
      ],
    });

    console.log(searchResult);

    // The multi-search prompt allows the user to pick multiple results.
    const multisearchResult = await prompt.search({
      message: "Search for something!",
      options: [
        { label: "Option One", value: "one" },
        { label: "Option Two", value: "two" },
      ],
      multiple: true,
    });

    console.log(multisearchResult);

    // A yes/no prompt.
    const confirmResult = await prompt.confirm({
      message: "Are you sure?",
    });

    console.log(confirmResult);

    // Opens the system editor.
    const editor = await prompt.editor({ message: "Type something!" });
    console.log(editor);
  });
