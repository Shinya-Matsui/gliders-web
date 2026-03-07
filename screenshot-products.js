const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch();

    // Screenshot gliders-web Products section
    const page1 = await browser.newPage({ viewport: { width: 1400, height: 900 } });
    await page1.goto('file:///c:/Users/smats/gliders-web/index.html', { waitUntil: 'networkidle' });
    const section = page1.locator('#products');
    await section.scrollIntoViewIfNeeded();
    await page1.waitForTimeout(500);
    await section.screenshot({ path: 'screenshot-products.png' });

    // Screenshot gliders-learn hero for comparison
    const page2 = await browser.newPage({ viewport: { width: 1400, height: 900 } });
    await page2.goto('file:///c:/Users/smats/gliders-learn/sg/index.html', { waitUntil: 'networkidle' });
    await page2.waitForTimeout(500);
    const hero = page2.locator('.hero');
    await hero.screenshot({ path: 'screenshot-learn-hero.png' });

    await browser.close();
    console.log('Screenshots saved');
})();
