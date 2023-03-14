const normalReporters = [
  ['dot'],
  ['html', { outputFolder: './reports/html' }],
  ['junit', { outputFile: './reports/xml/report.xml' }],
];
const config = {
  reporter: process.env.CI ? 'github' : normalReporters,
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
  workers: process.env.CI ? 1 : undefined,
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
