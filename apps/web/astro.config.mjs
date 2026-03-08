// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  site: "https://convoker.sprucepad.net/",
  integrations: [
    starlight({
      title: "Convoker",
      favicon: "/favicon.png",
      customCss: ["./src/assets/styles.css"],

      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/sprucepad/convoker",
        },
      ],

      sidebar: [
        {
          label: "Home",
          link: "/",
        },
        {
          label: "Concepts",
          autogenerate: { directory: "concepts" },
        },
        {
          label: "Guides",
          autogenerate: { directory: "guides" },
        },
        {
          label: "API reference",
          autogenerate: { directory: "api" },
        },
      ],
    }),
  ],
});
