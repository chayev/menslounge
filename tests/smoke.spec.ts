import { test, expect } from '@playwright/test';

const PUBLIC_PAGES = [
  '',
  'services/',
  'about/',
  'gallery/',
  'contact/',
  'privacy/',
];

// 1. & 2. & 6. Verify page loads, console errors, and H1 tags
for (const path of PUBLIC_PAGES) {
  test(`Page ${path} loads successfully with no console errors and exactly one H1`, async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    const response = await page.goto(path);
    expect(response?.status()).toBe(200);

    // Verify H1
    const h1s = page.locator('main h1');
    await expect(h1s).toHaveCount(1);

    // Verify no console errors
    expect(consoleErrors).toEqual([]);
  });
}

// 5. Verify local images load successfully
test('All images load successfully on public pages', async ({ page }) => {
  for (const path of PUBLIC_PAGES) {
    await page.goto(path);
    const images = page.locator('img');
    const imageCount = await images.count();
    
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      const src = await img.getAttribute('src');
      
      // If it's a local/relative image (optimized or public)
      if (src && (src.startsWith('/_astro/') || src.startsWith('/assets/'))) {
        const isLoaded = await img.evaluate((element: HTMLImageElement) => {
          return element.complete && element.naturalWidth > 0;
        });
        expect(isLoaded, `Image with src "${src}" on page "${path}" should load successfully`).toBe(true);
      }
    }
  }
});

// 7. Verify no internal link is broken
test('All internal links resolve correctly without 404', async ({ page }) => {
  await page.goto('');
  const links = page.locator('a');
  const count = await links.count();
  const internalUrls: string[] = [];

  for (let i = 0; i < count; i++) {
    const href = await links.nth(i).getAttribute('href');
    if (href && href.startsWith('/') && !href.startsWith('//')) {
      if (!internalUrls.includes(href)) {
        internalUrls.push(href);
      }
    }
  }

  for (const url of internalUrls) {
    const response = await page.goto(url);
    expect(response?.status(), `Internal URL "${url}" should not return 404`).toBe(200);
  }
});

// 8. & 9. Phone and directions links format
test('Phone links and directions links are valid and syntactically correct', async ({ page }) => {
  await page.goto('');
  const links = page.locator('a');
  const count = await links.count();

  for (let i = 0; i < count; i++) {
    const href = await links.nth(i).getAttribute('href');
    if (href) {
      if (href.startsWith('tel:')) {
        expect(href).toBe('tel:+16466843596');
      }
      if (href.includes('google.com/maps')) {
        expect(href.startsWith('https://')).toBe(true);
      }
    }
  }
});

// 10. Sticky mobile CTA visibility
test('Sticky mobile CTA behaves correctly at different widths', async ({ page, viewport }) => {
  await page.goto('');
  const mobileBar = page.locator('.mobile-conversion-bar');

  if (viewport && viewport.width <= 768) {
    // Mobile view: Should be visible
    await expect(mobileBar).toBeVisible();
  } else {
    // Desktop view: Should be hidden
    await expect(mobileBar).toBeHidden();
  }
});

// 11. Lightbox interactive verification
test('Gallery page lightbox works and handles focus trapping and keyboard navigation', async ({ page }) => {
  await page.goto('gallery/');
  
  const lightbox = page.locator('#lightbox-modal');
  await expect(lightbox).toBeHidden();

  // Click first image button to open lightbox
  const firstTrigger = page.locator('.gallery-card-btn').first();
  await firstTrigger.click();
  
  // Verify lightbox opens
  await expect(lightbox).toBeVisible();
  await expect(lightbox).toHaveAttribute('aria-hidden', 'false');

  // Verify close button is focused upon opening
  const closeBtn = page.locator('#lightbox-btn-close');
  await expect(closeBtn).toBeFocused();

  // Verify keyboard navigation: ArrowRight goes to next image
  const displayImg = page.locator('#lightbox-display-img');
  const firstImgSrc = await displayImg.getAttribute('src');
  
  await page.keyboard.press('ArrowRight');
  const secondImgSrc = await displayImg.getAttribute('src');
  expect(secondImgSrc).not.toBe(firstImgSrc);

  // Close lightbox with Escape
  await page.keyboard.press('Escape');
  await expect(lightbox).toBeHidden();
  await expect(lightbox).toHaveAttribute('aria-hidden', 'true');

  // Focus should return to the trigger button of the last viewed image (index 1) since we navigated to it
  const activeTrigger = page.locator('.gallery-card-btn').nth(1);
  await expect(activeTrigger).toBeFocused();
});

// 12. Custom 404 renders successfully
test('Custom 404 page renders when visiting a nonexistent route', async ({ page }) => {
  const response = await page.goto('nonexistent-page-url-test');
  // GitHub Pages uses 404.html to serve 404 responses (status is still 404)
  expect(response?.status()).toBe(404);
  
  const h1 = page.locator('main h1');
  await expect(h1).toHaveText('Chair Not Found');
  
  const homeLink = page.locator('text=Go to Home Page');
  await expect(homeLink).toBeVisible();
});

// 13. Mobile horizontal overflow check
test('No horizontal overflow exists on mobile width', async ({ page }) => {
  // Set mobile size
  await page.setViewportSize({ width: 320, height: 568 });
  
  for (const path of PUBLIC_PAGES) {
    await page.goto(path);
    const windowWidth = await page.evaluate(() => window.innerWidth);
    const scrollWidth = await page.evaluate(() => document.querySelector('main')?.scrollWidth || document.body.scrollWidth);
    
    // Allow up to 1px deviation for rounding differences
    expect(scrollWidth - windowWidth).toBeLessThanOrEqual(1);
  }
});

// 14. Centralized business data matches exactly
test('Centralized business name, phone, and address are rendered consistently', async ({ page }) => {
  for (const path of PUBLIC_PAGES) {
    await page.goto(path);
    
    // Check for short name or official name
    const pageText = await page.innerText('body');
    expect(pageText).toContain('The Men’s Lounge');
    expect(pageText).toContain('(646) 684-3596');
    expect(pageText).toContain('311 East 76th Street');
    expect(pageText).toContain('New York, NY 10021');
  }
});

// Mobile menu toggle test
test('Mobile navigation menu drawer opens and closes correctly', async ({ page }) => {
  // Set viewport to mobile width
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('');

  const burgerToggle = page.locator('#mobile-menu-toggle');
  const navLinks = page.locator('#nav-links');

  // Verify menu is hidden off-screen initially (right: -100% style)
  await expect(navLinks).not.toHaveClass(/active/);

  // Click hamburger menu toggle
  await burgerToggle.click();
  await expect(navLinks).toHaveClass(/active/);
  await expect(burgerToggle).toHaveAttribute('aria-expanded', 'true');

  // Click again to close
  await burgerToggle.click();
  await expect(navLinks).not.toHaveClass(/active/);
  await expect(burgerToggle).toHaveAttribute('aria-expanded', 'false');
});
