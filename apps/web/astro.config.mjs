// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightTypeDoc, { typeDocSidebarGroup } from "starlight-typedoc";
import rehypeExternalLinks from "rehype-external-links";

// https://astro.build/config
export default defineConfig({
  site: "https://convoker.sprucepad.net/",
  integrations: [
    starlight({
      title: "Convoker",
      plugins: [
        starlightTypeDoc({
          entryPoints: ["../../packages/*"],
          // @ts-expect-error -- this should be optional for entryPointStrategy "packages" as it loads each individual package's tsconfig
          tsconfig: undefined,
          typeDoc: {
            entryPointStrategy: "packages",
            packageOptions: {
              entryPoints: ["src/index.ts"],
            },
          },
          sidebar: {
            label: "API reference",
          },
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
          label: "Guides",
          autogenerate: { directory: "guides" },
        },
        typeDocSidebarGroup,
      ],
    }),
  ],

  markdown: {
    rehypePlugins: [
      [
        rehypeExternalLinks,
        { target: "_blank", rel: ["noopener", "noreferrer"] },
      ],
    ],
  },
});
