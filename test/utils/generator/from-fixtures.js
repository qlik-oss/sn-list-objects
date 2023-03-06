/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable no-empty-pattern */
import { test, expect } from '@playwright/test';
import fs from 'fs';
import serve from '@nebula.js/cli-serve';
import createTestAssistant from '../test-assistant';
import themes from '../theme';

const defaultServeConfig = (fixturePath) => ({
  open: false,
  themes,
  fixturePath,
});

/**
 * Run tests from fixtures available in path specified as argument. One test case is created per fixture.
 *
 * Nebula serve is started before the tests are run. In each test case the visualization is rendered using Nebula serve, a screenshot is taken and then compared with the baseline.
 */

export default ({ suiteName, serveConfig, fixturePath, styles = [], debug = undefined }) => {
  const DEBUG_MODE = process.env.DEBUG === 'true';

  if (DEBUG_MODE && !debug) {
    return;
  }

  const desc = DEBUG_MODE ? test.describe.only : test.describe;

  desc(suiteName, () => {
    let s;
    let testAssistant;

    test.beforeAll(async () => {
      s = await serve({ ...defaultServeConfig(fixturePath), ...serveConfig });
      testAssistant = await createTestAssistant();
    });

    test.afterAll(async () => {
      await s.close();
      await testAssistant.afterEach();
    });

    test.beforeEach(() => {
      testAssistant.beforeEach();
    });

    test.afterEach(() => {
      testAssistant.afterEach();
    });

    fs.readdirSync(fixturePath).forEach((file) => {
      const name = file.replace('.fix.js', '');

      if (DEBUG_MODE && debug !== name) {
        return;
      }

      test(name, async () => {
        // testInfo.snapshotSuffix = process.env.CI ? 'baseline' : 'local';

        const url = `${s.url}/render?fixture=${file}`;

        if (DEBUG_MODE) {
          console.log('\nTest running at:', `\x1b[34m${url}\x1b[0m\n`);
        }

        const element = await testAssistant.goto(url);

        styles.forEach(async (style) => {
          if (style.fixture === name) {
            await testAssistant.style(style.styles);
          }
        });

        const img = await testAssistant.screenshot(element);

        if (DEBUG_MODE) {
          await testAssistant.page.pause();
        }

        expect(img).toMatchSnapshot(`${name}.png`);
      });
    });
  });
};
