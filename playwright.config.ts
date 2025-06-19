// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export default defineConfig({
    testDir: './tests',
    timeout: 30 * 1000,
    retries: 1,
    use: {
        headless: false,
        viewport: { width: 1920, height: 1080 },
        launchOptions: {
            args: ['--start-maximized'],
            slowMo: 50, // Slow down operations for better visibility during debugging
        },
        ignoreHTTPSErrors: true,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        baseURL: 'http://automationexercise.com',
        trace: 'on-first-retry',
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'Firefox',
            use: { ...devices['Desktop Firefox'] },
        },
        {
            name: 'WebKit',
            use: { ...devices['Desktop Safari'],
                viewport: { width: 1920, height: 1080 } // Adjust viewport for WebKit
             },
        },
    ]
});