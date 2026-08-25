import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 45_000,
  expect: { timeout: 8_000 },
  retries: 1,
  workers: 1,
  reporter: "line",
  use: {
    baseURL: "http://127.0.0.1:3000",
    trace: "retain-on-failure",
    screenshot: "only-on-failure"
  },
  webServer: {
    command: "npm start -- -p 3000",
    url: "http://127.0.0.1:3000",
    timeout: 120_000,
    reuseExistingServer: false
  },
  projects: [
    {
      name: "android-chromium",
      use: { browserName: "chromium", viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true }
    },
    {
      name: "iphone-webkit",
      use: { browserName: "webkit", viewport: { width: 393, height: 852 }, hasTouch: true, isMobile: true }
    }
  ]
});
