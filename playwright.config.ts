import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:4321/menslounge/',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'desktop',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'mobile',
      use: { ...devices['Pixel 5'] },
    },
  ],
  webServer: {
    command: process.env.TEST_PROD ? 'npm run preview -- --port 4321' : 'npm run dev -- --port 4321',
    url: 'http://localhost:4321/menslounge/',
    reuseExistingServer: false,
    timeout: 15000,
    env: {
      ASTRO_DEV_BACKGROUND: '0',
    },
    stdout: 'pipe',
    stderr: 'pipe',
  },
});
