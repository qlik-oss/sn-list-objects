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
    goto: async (url, { waitSelector = '.njs-viz[data-render-count="1"]', waitOptions } = {}, customViewportSize) => {
      await page.goto(url, { waitUntil: 'networkidle' });
      if (customViewportSize) {
        page.setViewportSize(customViewportSize)
      } else {
        page.setViewportSize()
      }
      return page.waitForSelector(waitSelector, { visible: true, ...waitOptions });
    },

    screenshot: async (element) => page.screenshot({ clip: await element.boundingBox() }),
  };
};
