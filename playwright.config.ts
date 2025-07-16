import { defineConfig } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";

if (process.env.ENV !== "ci") {
  dotenv.config({ path: path.resolve(__dirname, ".env/.env.prod") });
}

export default defineConfig({
  globalSetup: "./tests/global.setup.ts",
  testDir: "./tests",

  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 2,

  use: {
    trace: process.env.CI ? "retain-on-failure" : "on",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    storageState: "state.json",
  },

  reporter: process.env.CI
    ? [
        ["dot"],
        ["junit", { outputFile: "test-results/junit-report.xml" }],
        ["json", { outputFile: "test-results/report.json" }],
      ]
    : [
        ["list"],
        ["html", { open: "never" }],
        ["json", { outputFile: "test-results/report.json" }],
      ],
});
