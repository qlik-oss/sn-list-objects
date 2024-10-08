import path from 'path';
import serve from '@nebula.js/cli-serve';
import { test, chromium } from '@playwright/test';
import createNebulaRoutes from '../utils/routes';
import { checkScreenshot } from '../utils/shared';

test.describe('sn-filter-pane: ui integration tests to test visual bugs', () => {
  let s;
  let route;

  test.beforeAll(async () => {
    s = await serve({
      entry: path.resolve(
        __dirname,
        '../../packages/sn-filter-pane/dist/sn-filter-pane.js'
      ),
      type: 'sn-filter-pane',
      open: false,
      build: false,
      themes: [],
      flags: {},
      fixturePath: 'test/integration/__fixtures__',
    });

    route = createNebulaRoutes(s.url);
  });

  test.afterAll(async () => {
    s.close();
  });

  test.describe('Interaction', () => {
    test('Open search', async () => {
      const renderUrl = await route.renderFixture('multi_scenario_3.fix.js');
      const browser = await chromium.launch();
      const context = await browser.newContext();
      const page = await context.newPage();
      await page.goto(renderUrl, { waitUntil: 'networkidle' });
      await page.locator('[data-testid="search-toggle-btn"]').nth(1).click();
      await page.waitForTimeout(500);
      await checkScreenshot(
        '.njs-viz[data-render-count="1"]',
        page,
        'open_search.png'
      );
    });
    test('Open collapsed filterpane', async () => {
      const renderUrl = await route.renderFixture('multi_scenario_3.fix.js');
      const browser = await chromium.launch();
      const context = await browser.newContext();
      const page = await context.newPage();
      await page.goto(renderUrl, { waitUntil: 'networkidle' });
      await (
        await page.waitForSelector('[data-testid="collapsed-title-City drilldown"]')
      ).click();
      await page.waitForTimeout(500);
      await checkScreenshot(
        '.njs-viz[data-render-count="1"]',
        page,
        'open_collapsed_filterpane.png'
      );
    });
    test('selection in filterpane to open action toolbar', async () => {
      const renderUrl = await route.renderFixture('multi_scenario_1.fix.js');
      const browser = await chromium.launch();
      const context = await browser.newContext();
      const page = await context.newPage();
      await page.goto(renderUrl, { waitUntil: 'networkidle' });
      await (await page.waitForSelector('[title="Aug"]')).click();
      await page.waitForTimeout(500);
      await checkScreenshot(
        '.njs-viz[data-render-count="1"]',
        page,
        'selection_filterpane.png'
      );
    });

    test('Multiple collapsed filterpane', async () => {
      const renderUrl = await route.renderFixture('multi_scenario_3.fix.js');
      const browser = await chromium.launch();
      const context = await browser.newContext();
      const page = await context.newPage();
      await page.setViewportSize({ width: 250, height: 450 });
      await page.goto(renderUrl, { waitUntil: 'networkidle' });
      await page.waitForTimeout(500);
      await checkScreenshot(
        '.njs-viz[data-render-count="1"]',
        page,
        'multiple_collapsed_filterpane.png'
      );
    });

    test('Open multiple collapsed filterpane', async () => {
      const renderUrl = await route.renderFixture('multi_scenario_3.fix.js');
      const browser = await chromium.launch();
      const context = await browser.newContext();
      const page = await context.newPage();
      await page.setViewportSize({ width: 250, height: 450 });
      await page.goto(renderUrl, { waitUntil: 'networkidle' });
      await (
        await page.waitForSelector('[data-testid="ExpandMoreIcon"]')
      ).click();
      await page.waitForTimeout(500);
      await checkScreenshot(
        '.njs-viz[data-render-count="1"]',
        page,
        'open_multiple_collapsed_filterpane.png'
      );
    });

    test('Open listbox in multiple collapsed filterpane, scroll and select', async () => {
      const renderUrl = await route.renderFixture('multi_scenario_3.fix.js');
      const browser = await chromium.launch();
      const context = await browser.newContext();
      const page = await context.newPage();
      await page.setViewportSize({ width: 250, height: 450 });
      await page.goto(renderUrl, { waitUntil: 'networkidle' });
      await (
        await page.waitForSelector('[data-testid="ExpandMoreIcon"]')
      ).click();
      await (
        await page.waitForSelector(
          '[data-testid="collapsed-title-Family Class Desc"]'
        )
      ).click();
      await page.waitForTimeout(100);
      await page.mouse.move(100, 200);
      await page.mouse.wheel(0, 100);
      await page.mouse.down();
      await page.waitForTimeout(500);
      await checkScreenshot(
        '.njs-viz[data-render-count="1"]',
        page,
        'open_listbox_in_multiple_collapsed_filterpane.png'
      );
    });

    test('Do not collapse listbox, select, show toolbar detached', async () => {
      const renderUrl = await route.renderFixture('multi_scenario_2.fix.js');
      const browser = await chromium.launch();
      const context = await browser.newContext();
      const page = await context.newPage();
      await page.setViewportSize({ width: 800, height: 138 });
      await page.goto(renderUrl, { waitUntil: 'networkidle' });
      await (
        await page.waitForSelector('[data-testid="listbox.item"]')
      ).click();
      await page.waitForTimeout(500);
      await checkScreenshot(
        'body',
        page,
        'do_not_collapse.png'
      );
    });
  });
});
