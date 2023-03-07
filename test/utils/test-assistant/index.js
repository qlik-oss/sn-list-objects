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
    goto: async (url, { waitSelector = '.njs-viz[data-render-count="1"]', waitOptions } = {}) => {
      await page.goto(url);
      return page.waitForSelector(waitSelector, { visible: true, ...waitOptions });
    },
    style: async (styles) => {
      await page.evaluate((matrix) => {
        matrix.forEach((config) => {
          const [selector, property, value] = config;
          // eslint-disable-next-line no-undef
          const element = document.querySelector(selector);
          if (element) {
            element.style[property] = value;
          }
        });
      }, styles);
    },
    
    screenshot: async (element) => page.screenshot({ clip: await element.boundingBox() }),
  };
};
