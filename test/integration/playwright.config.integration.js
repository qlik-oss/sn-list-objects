const config = {
  reporter: [
    ['dot'],
    ['html', { outputFolder: './reports/html' }],
    ['junit', { outputFile: './reports/xml/report.xml' }],
  ],
  testDir: './',
  forbidOnly: !!process.env.CI,
  timeout: 60000,
  snapshotPathTemplate: process.env.CI
    ? '{testDir}/baselines/{arg}-baseline{ext}'
    : '{testDir}/baselines-local/{arg}-local{ext}',
  expect: {
    toMatchSnapshot: { threshold: 0.00025 },
    timeout: 30000,
  },
  workers: 1,
  use: {
    browserName: 'chromium',
    actionTimeout: 30000,
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
};

module.exports = config;
