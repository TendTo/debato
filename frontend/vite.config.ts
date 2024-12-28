import { defineConfig, searchForWorkspaceRoot } from "vite";
import react from "@vitejs/plugin-react";

import "react";
import "react-dom";

export default defineConfig({
  root: ".",
  server: {
    port: Number.parseInt(process.env.DEBATO_PORT ?? "3000"),
    host: process.env.DEBATO_HOSTNAME ?? "localhost",
    // fs: {
    //   allow: [searchForWorkspaceRoot(Deno.cwd(), "..")],
    // },
  },
  plugins: [react()],
  optimizeDeps: {
    include: ["react/jsx-runtime"],
  },
});
