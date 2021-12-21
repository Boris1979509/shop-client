import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vueI18n from "@intlify/vite-plugin-vue-i18n";
import path from "path";
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  // import.meta.env.VITE_NAME available here with: process.env.VITE_NAME
  // import.meta.env.VITE_PORT available here with: process.env.VITE_PORT
  return defineConfig({
    base: process.env.NODE_ENV === "production" ? "/shop-client/" : "/",
    plugins: [
      vue(),
      vueI18n({
        include: `${path.resolve(__dirname, "src")}/locales/**`,
      }),
    ],
    resolve: {
      alias: {
        "@/": `${path.resolve(__dirname, "src")}/`,
      },
    },
    server: {
      port: process.env.VITE_PORT,
      host: true,
    },
  });
};
