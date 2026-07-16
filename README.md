# The Men’s Lounge Barbershop & Spa Website

This is the production-ready website for **The Men’s Lounge Barbershop & Spa** located at **311 East 76th Street, New York, NY 10021**. The website is built as a static site using **Astro**, **TypeScript**, and **Vanilla CSS** and is configured to build and deploy automatically to **GitHub Pages** via GitHub Actions.

---

## Confirm With David Before Launch

Before launching the website live on [www.mensloungebarber.com](https://www.mensloungebarber.com), walk through this checklist with the shop owner, David, to confirm critical business details:

- [ ] **Business Name Spelling**: Is the official public spelling exactly *"The Men’s Lounge Barbershop & Spa"*?
- [ ] **Weekday Hours**: Are the weekday hours (Monday–Friday) 10:00 AM–7:30 PM, or does the shop open earlier at 9:30 AM? (Currently defaulted to 10:00 AM).
- [ ] **Saturday Hours**: Are Saturday hours confirmed to be 10:00 AM–7:00 PM?
- [ ] **Sunday Hours**: Are Sunday hours confirmed to be 10:00 AM–6:00 PM?
- [ ] **Service Prices**: What are the current prices for each service? (Currently set to `null` to show *"Call for current pricing and availability"*).
- [ ] **Color & Facials**: Are *"Men’s Color"* and *"Facial"* services still offered? (Currently set to `published: false` in the service data).
- [ ] **Booking Link**: Is there an official online booking link (e.g. Squire, Booksy, Vagaro)? (Currently set to `null`, displaying *"Call to Book"*).
- [ ] **Email Address**: What public contact email address (if any) should be listed?
- [ ] **Founding Year**: What year did the shop open?
- [ ] **Experience Claims**: May the site mention *"over 100 years of combined experience"*?
- [ ] **Barber Biographies**: Which barbers should appear on a future team page, and what are their names/roles?
- [ ] **Team Status**: Is A.T. currently part of the team?
- [ ] **Vector Logo**: Is an official SVG or vector logo available to replace the text logo treatment?
- [ ] **Canonical Domain**: Does David want the `www` subdomain (`www.mensloungebarber.com`) or the apex domain (`mensloungebarber.com`) to be the canonical link? (Currently configured with `www.`).
- [ ] **Primary Action**: Should customers be encouraged to call, text, or book online?
- [ ] **Photography Copyright**: Are all six supplied photographs owned or licensed by the business?

---

## Centralized Business Data

To ensure consistency across the site and prevent content discrepancies, all business details are centralized in a strongly typed data file:

```bash
src/data/business.ts
```

All references to the official name, phone number, address, opening hours, social links, and services are loaded from this file.

### How to Update Business Hours
1. Open [src/data/business.ts](file:///Users/chayev/repos/chayev/menslounge/src/data/business.ts).
2. Locate the `hours` array inside `businessData`.
3. Modify the `opens` and `closes` properties for each day. E.g., to update Monday to start at 9:30 AM:
   ```typescript
   { day: "Monday", opens: "9:30 AM", closes: "7:30 PM", closed: false, sortOrder: 1 }
   ```
4. Save the file. The header utility bar, visit sections, and footer will update automatically.

### How to Toggle a Service or Add Prices Later
1. Open [src/data/business.ts](file:///Users/chayev/repos/chayev/menslounge/src/data/business.ts).
2. Find the `services` array.
3. To **activate or hide** a service (such as Men's Color or Facial):
   - Set `published: true` to show it publicly.
   - Set `published: false` to hide it.
4. To **publish a price** for a service:
   - Change `price: null` to a string value, e.g., `price: "45"` or `price: "40+"`.
   - The rendering logic will automatically replace the *"Call for Pricing"* message with the specified price.

### How to Add a Real Booking URL
1. Locate `bookingUrl` in `businessData` (currently `null`).
2. Replace it with your scheduling URL string:
   ```typescript
   bookingUrl: "https://booksy.com/your-shop-link"
   ```
3. Save the file. This will automatically update all "Call to Book" links and action buttons across the site to link directly to your booking interface.

### How to Replace the Temporary Text Logo
The navigation header and footer use a text-based logo. To replace this with a vector SVG logo:
1. Copy your SVG file to `src/assets/logo.svg`.
2. Open [src/layouts/Layout.astro](file:///Users/chayev/repos/chayev/menslounge/src/layouts/Layout.astro).
3. Import the SVG and replace the `<span class="logo-main">` elements with an `<img>` tag referencing your imported logo file.

### How to Add Analytics Later (Privacy Compliant)
If you decide to add tracking scripts (e.g., Google Analytics or Plausible):
1. Insert the tracking snippet inside the `<head>` tag of [src/layouts/Layout.astro](file:///Users/chayev/repos/chayev/menslounge/src/layouts/Layout.astro).
2. Open [src/pages/privacy.astro](file:///Users/chayev/repos/chayev/menslounge/src/pages/privacy.astro) and update **Section 2 (Cookies and Tracking)** to disclose the tracking software used, what data is collected, and how users can opt-out.

---

## Asset Directory

Photographs provided for the project are stored in:
```bash
src/assets/shop/
```
These are optimized WEBP images used intentionally throughout the pages:
* `store3.webp` — Primary desktop hero showing the shop interior and hexagonal ceiling.
* `store2.webp` — Warm-lit interior view highlighting chairs and cozy brick walls (used in About/Philosophy).
* `store4.webp` — Street entrance view showing the storefront logo and window (used in Location/Visit).
* `store.webp` — Vertical overview showing styling chairs and the guitar detail (used in Gallery and About).
* `store5.webp` — Vertical close-up view of the glowing barber pole (used in Gallery).
* `image.webp` — Detailed razor shot (used on Services banner).

---

## Local Development Operations

Ensure you have [Node.js](https://nodejs.org) installed on your system.

### 1. Local Installation
Navigate to the root directory and install dependencies:
```bash
npm install
```

### 2. Local Development Server
Start the development server with live-reloading:
```bash
npm run dev
```
The local server will run on [http://localhost:4321](http://localhost:4321).

### 3. Production Build
Verify code compliance and compile the project into optimized, static HTML/CSS/JS files:
```bash
npm run check
npm run build
```
The static output files will be generated in the `dist/` directory.

### 4. Local Build Preview
Test the production-ready static files locally:
```bash
npm run preview
```

---

## GitHub Pages Deployment

### 1. GitHub Actions Deployment
The website is pre-configured with a GitHub Actions workflow in `.github/workflows/deploy.yml` that triggers on every push to the `main` branch. 

To enable automated deployments:
1. Push the repository to GitHub.
2. Open the repository in your browser and go to **Settings** > **Pages**.
3. Under **Build and deployment** > **Source**, select **GitHub Actions** (instead of Deploy from a branch).
4. The workflow will automatically compile the site and deploy it.

### 2. Custom Domain DNS Requirements
The project is configured for the custom domain **www.mensloungebarber.com** using a `public/CNAME` file.

To connect your domain registrar (GoDaddy, Namecheap, Google Domains, etc.):
1. Point your **CNAME record** for `www` to `your-github-username.github.io`.
2. Configure **Apex redirection** (A records) to point to GitHub's IP addresses:
   * `185.199.108.153`
   * `185.199.109.153`
   * `185.199.110.153`
   * `185.199.111.153`
3. Enforce **HTTPS** in your GitHub repository Pages settings once DNS records propagate.
