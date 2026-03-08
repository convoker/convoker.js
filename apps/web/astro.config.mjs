// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightTypeDoc, { typeDocSidebarGroup } from "starlight-typedoc";

// https://astro.build/config
export default defineConfig({
  site: "https://convoker.sprucepad.net/",
  integrations: [
    starlight({
      title: "Convoker",
      plugins: [
        starlightTypeDoc({
          entryPoints: ["../../packages/convoker/src/index.ts"],
          tsconfig: "../../packages/convoker/tsconfig.json",
        }),
      ],
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
          label: "Packages",
          autogenerate: { directory: "packages" },
        },
        {
          label: "Guides",
          autogenerate: { directory: "guides" },
        },
        typeDocSidebarGroup,
      ],
    }),
  ],
});
