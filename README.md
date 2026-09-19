# Time Booth — My Journey Through Time ⏳

[![Deploy to GitHub Pages](https://github.com/umairansari/time_booth/actions/workflows/deploy.yml/badge.svg)](https://github.com/umairansari/time_booth/actions/workflows/deploy.yml)
[![Domain: umairansari.in](https://img.shields.io/badge/Domain-umairansari.in-00e59b?style=flat&logo=safari)](https://umairansari.in)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

An interactive, responsive digital time capsule and photo booth preserving 37 life memories from 2002 to the present day. Built with rich dark-mode glassmorphic aesthetics, smooth micro-animations, and full keyboard/touch navigation.

🌐 **Live Website:** [https://umairansari.in](https://umairansari.in)

---

## ✨ Features

- **🏛️ The Booth (Horizontal Timeline):** Drag-to-scroll, mouse wheel, touch swipe, or arrow controls with progress indicator.
- **⊞ Eras Grid View:** Grouped breakdown by life stages (Early Years, Teenage Years, School Days, College Era, Professional Life).
- **📸 Photo Wall (Gallery):** Dynamic masonry grid with era filter chips and real-time photo counts.
- **✨ Surprise Me (FAB):** Random memory generator floating action button with ambient sparkle animation.
- **🔍 Instant Search:** Live search across titles, years, life eras, and tags with text highlighting (`Ctrl+K` / `Cmd+K`).
- **🔍 Fullscreen Lightbox:** High-resolution viewing with metadata, keyboard navigation (`←`/`→`/`Esc`), and one-click photo download.
- **📊 Real-time Journey Stats:** Live-updating age tracker (Years, Months, Days) and span analytics.
- **📱 Universal Responsiveness:** Optimized for ultra-wide desktops, laptops, tablets, and smartphones.
- **🚀 Zero-Dependency Architecture:** Pure Vanilla HTML5, CSS3, and modern ES6 JavaScript. Fast load times, SEO-optimized, and PWA-ready.

---

## 🚀 GitHub Pages & Domain Setup Guide (`umairansari.in`)

This repository is pre-configured and 100% production-ready for GitHub Pages with custom domain `umairansari.in`.

### Step 1: Push Code to GitHub

Open your terminal or command prompt in this directory and run:

```bash
# Initialize git (if not already done)
git init -b main
git add .
git commit -m "feat: Time Booth production-ready release for umairansari.in"

# Link to your GitHub repository (replace with your repo URL)
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/time_booth.git

# Push to main branch
git push -u origin main
```

---

### Step 2: Configure DNS for `umairansari.in`

In your DNS provider (e.g., Cloudflare, GoDaddy, Namecheap, Hostinger, Google Domains):

#### 1. Apex Domain Records (`@` or `umairansari.in`):
Add the four official GitHub Pages **A Records**:

| Type | Name / Host | Target IP Value | TTL |
| :--- | :--- | :--- | :--- |
| **A** | `@` | `185.199.108.153` | Automatic / 300 |
| **A** | `@` | `185.199.109.153` | Automatic / 300 |
| **A** | `@` | `185.199.110.153` | Automatic / 300 |
| **A** | `@` | `185.199.111.153` | Automatic / 300 |

*(Optional but recommended)* Add GitHub Pages **AAAA Records** for IPv6:

| Type | Name / Host | Target IPv6 Value | TTL |
| :--- | :--- | :--- | :--- |
| **AAAA** | `@` | `2606:50c0:8000::153` | Automatic / 300 |
| **AAAA** | `@` | `2606:50c0:8001::153` | Automatic / 300 |
| **AAAA** | `@` | `2606:50c0:8002::153` | Automatic / 300 |
| **AAAA** | `@` | `2606:50c0:8003::153` | Automatic / 300 |

#### 2. Subdomain Record (`www`):
Add a **CNAME Record** for `www`:

| Type | Name / Host | Target Value | TTL |
| :--- | :--- | :--- | :--- |
| **CNAME** | `www` | `<YOUR_GITHUB_USERNAME>.github.io` | Automatic / 300 |

> **Note on Cloudflare:** If using Cloudflare DNS, set the Proxy Status to **DNS only** (grey cloud) during initial SSL certificate issuance on GitHub Pages.

---

### Step 3: Enable Custom Domain & HTTPS in GitHub Settings

1. On GitHub, go to your repository: **Settings** → **Pages**.
2. **Build and deployment**:
   - **Source:** Select **GitHub Actions** (recommended, powered by `.github/workflows/deploy.yml`) OR **Deploy from a branch** (`main` / `/root`).
3. **Custom domain**:
   - Verify `umairansari.in` is entered (it will automatically detect the `CNAME` file in the repo).
   - Check **Enforce HTTPS** (GitHub will automatically provision a free Let's Encrypt SSL certificate once DNS propagates, usually within 5–15 minutes).

---

## 🛠️ How to Add New Photos

Adding a new memory is as simple as adding an image and an object in `app.js`:

1. Copy your photo to the `photos/` directory (e.g. `photos/2027_new_journey.jpg`).
2. Open `app.js` and add an entry into the `MEMORIES` array:

```javascript
{
  id: '2027-new-journey',
  year: 2027,
  month: 1,
  title: 'New Journey Begins',
  description: 'A few sentences capturing this special moment.',
  image: 'photos/2027_new_journey.jpg',
  era: 'professional',
  eraLabel: 'Professional Life',
  tags: ['2027', 'journey', 'milestone']
}
```

3. Commit and push:
```bash
git add .
git commit -m "feat: add 2027 new journey memory"
git push
```
The GitHub Actions workflow will automatically redeploy the site in under a minute!

---

## 📂 Project Structure

```
time_booth/
├── .github/
│   └── workflows/
│       └── deploy.yml       # Automated GitHub Pages deployment workflow
├── photos/                  # 37 curated memory photographs (2002–2026)
├── 404.html                 # Custom branded 404 page for GitHub Pages
├── CNAME                    # Custom domain declaration (umairansari.in)
├── .nojekyll                # Bypass Jekyll processing on GitHub Pages
├── .gitignore               # Ignored system and editor files
├── app.js                   # Application state, timeline, gallery & interactive logic
├── index.html               # Main semantic HTML5 structure with OpenGraph & Schema.org
├── robots.txt               # Search engine crawler instructions
├── sitemap.xml              # XML sitemap for SEO indexing
├── site.webmanifest         # PWA / web application manifest
├── styles.css               # Design system, glassmorphism, layouts & responsive CSS
└── README.md                # Project documentation & DNS guide
```

---

## 📄 License

Created by **Umair Ansari**. All rights reserved.
