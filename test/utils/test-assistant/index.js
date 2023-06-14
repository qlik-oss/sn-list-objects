/* eslint-disable no-param-reassign */
import { chromium } from '@playwright/test';
import createLogger from './log';

export default async ({ logLevel } = {}) => {
  const browser = await chromium.launch();
  const context = await browser.newContext();

  const page = await context.newPage();

  const logger = createLogger({ logLevel });

  return {
    /**
     * Test case life-cycle
     */
    async after() {
      await page.close();
    },
    beforeEach() {
      logger.addListeners(page);
    },
    afterEach() {
      logger.removeListeners(page);
    },
    page,
    goto: async (url, { waitOptions } = {}, customViewportSize = null) => {
      await page.goto(url, { waitUntil: 'networkidle' });
      if (customViewportSize) {
        await page.setViewportSize(customViewportSize);
      } else {
        const originalViewportSize = require('../../rendering/playwright.config.rendering').use.viewport;
        await page.setViewportSize(originalViewportSize);
      }
      // When using customViewportSize, viewport is resized thus triggering a second render
      const waitSelector = `.njs-viz[data-render-count="${customViewportSize ? 2 : 1}"]`;
      return page.waitForSelector(waitSelector, { visible: true, ...waitOptions });
    },

    screenshot: async (element) => page.screenshot({ clip: await element.boundingBox() }),
  };
};
