import { hopeTheme } from "vuepress-theme-hope";

import navbar from "./navbar.js";
import sidebar from "./sidebar.js";

export default hopeTheme({
  pure: true,
  focus: false,
  fullscreen: true,
  print: false,
  headerDepth: 2,
  
  // enabling hot reload keeps the nav bar up to date more proactively but causes
  // white flashes while reloading in dark mode.
  hotReload: true,

  hostname: "https://kurrentdb-guide.pages.dev/",

  // plum by style in index.scss
  logo: "/assets/ouro.png",

  repo: "https://github.com/timothycoleman/eventstore",

  docsDir: "guide/src",

  navbar,

  sidebar,

  displayFooter: true,
  footer: "Licensed under the <a href='https://github.com/kurrent-io/EventStore/blob/master/LICENSE.md'>Kurrent License v1</a>",
  copyright: "Copyright © 2011-2025, Kurrent, Inc.",

  editLink: false,
  metaLocales: {
    editLink: "Edit this page on GitHub",
  },

  // These features are enabled for demo, only preserve features you need here
  markdown: {
    align: true,
    attrs: true,
    codeTabs: true,
    component: true,
    demo: true,
    figure: true,
    gfm: true,
    imgLazyload: true,
    imgSize: true,
    include: true,
    mark: true,
    plantuml: true,
    spoiler: true,
    stylize: [
      {
        matcher: "Recommended",
        replacer: ({ tag }) => {
          if (tag === "em")
            return {
              tag: "Badge",
              attrs: { type: "tip" },
              content: "Recommended",
            };
        },
      },
    ],
    sub: true,
    sup: true,
    tabs: true,
    tasklist: true,
    vPre: true,

    // uncomment these if you need TeX support
    // math: {
    //   // install katex before enabling it
    //   type: "katex",
    //   // or install mathjax-full before enabling it
    //   type: "mathjax",
    // },

    // install chart.js before enabling it
    // chartjs: true,

    // install echarts before enabling it
    // echarts: true,

    // install flowchart.ts before enabling it
    // flowchart: true,

    // install mermaid before enabling it
    // mermaid: true,

    // playground: {
    //   presets: ["ts", "vue"],
    // },

    // install @vue/repl before enabling it
    // vuePlayground: true,

    // install sandpack-vue3 before enabling it
    // sandpack: true,

    // install @vuepress/plugin-revealjs and uncomment these if you need slides
    // revealjs: {
    //   plugins: ["highlight", "math", "search", "notes", "zoom"],
    // },
  },

  plugins: {
    // Note: This is for testing ONLY!
    // You MUST generate and use your own comment service in production.
    // comment: {
    //   provider: "Giscus",
    //   repo: "vuepress-theme-hope/giscus-discussions",
    //   repoId: "R_kgDOG_Pt2A",
    //   category: "Announcements",
    //   categoryId: "DIC_kwDOG_Pt2M4COD69",
    // },

    components: {
      components: ["Badge", "VPCard"],
    },

    icon: {
      prefix: "fa6-solid:",
    },
  },
});
