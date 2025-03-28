import { defineClientConfig } from "vuepress/client";

export default defineClientConfig({
  enhance: ({ router }) => {
    router.addRoute({ path: '/', redirect: '/introduction/' })
  },
});
