# 📘 Project Documentation

---

## 📚 Glossary

- [🔧 Pending Implementations](#-pending-implementations)

---

## 📄 Table of Contents

1. [🎯 Project Overview](#-project-overview)
2. [🛠️ Tech Stack & Features](#-tech-stack--features)
3. [🧼 Architecture & Best Practices](#-architecture--best-practices)
4. [🎬 External APIs](#-external-apis)
5. [🚀 Deployment](#-deployment)
6. [🔐 Basic Security](#-basic-security)
7. [📦 CDN & Static Assets](#-cdn--static-assets)
8. [🔧 DevOps Integration](#-devops-integration)
9. [🔮 Future Enhancements](#-future-enhancements)
10. [🔧 Pending Implementations](#-pending-implementations)

---

## 🎯 Project Overview

This is an **MVP (Minimum Viable Product)** for a **virtual movie store**, focusing on a clean, user-friendly experience and modern frontend architecture.

**Key objectives:**

- Clean Code principles  
- MVVM architecture  
- Responsive UI  
- Practical, intuitive interactions  

---

## 🛠️ Tech Stack & Features

### 🧱 Core Technologies

- [**Vue.js**](https://vuejs.org/) — Reactive, component-based framework  
- [**Vuex**](https://vuex.vuejs.org/) — Centralized state management  
- **SCSS (Scoped CSS)** — Modular, component-scoped styling  

### 🎨 UI/UX & Functionality

#### ✅ MVP Features

- **Home Page**: Movie catalog from [TMDb API](https://developer.themoviedb.org/docs/getting-started)  
- **Cart Sidebar**: Slide-in cart preview  
- **Checkout Page**: Address input + confirmation  
- **Success Modal**: Checkout completion screen  

#### ✨ Extra Features

- Favorites sidebar  
- Search bar  
- Clickable logo as home button  
- Dark/Light Theme toggle  
- Address autofill via [ViaFacil API](https://viacep.com.br/)  
- Manual theme switch  
- [Color Palette (Coolors)](https://coolors.co/palette/e4e7e4-c0c4ca-9ba1b0-777f96-535c7b-2e3961-0a1647)  

### 📱 Responsiveness

- Optimized for desktop, tablet, and mobile  
- Fluid grid-based layout with adaptive components  

---

## 🧼 Architecture & Best Practices

### 🧠 Clean Code Guidelines

- Descriptive, semantic naming  
- Logical component separation  
- Modular, reusable logic  
- Consistent file and folder structure  

### 🧩 MVVM Pattern in Vue

- **Model**:  
  - Vuex store (`store/index.js`)  
  - API services:  
    - `services/api.js` (TMDb)  
    - `services/viafacil.js` (address autofill)  

- **View**:  
  - Vue UI components in `/components/`  
  - Page views in `/views/`  

- **ViewModel**:  
  - Business/UI logic handled in `<script setup>`  
  - Shared logic organized in `/composables/` | `/viewmodels/`  

---

## 🎬 External APIs

### ✅ Required Integration

- [**TMDb API**](https://developer.themoviedb.org/docs/getting-started)  
  → Popular movies, search, metadata  

### ➕ Extra Integration

- [**ViaFacil (ViaCEP) API**](https://viacep.com.br/)  
  → Used to auto-complete address fields on checkout  

---

## 🚀 Deployment

Deployed using **[Vercel](https://vercel.com/)** (Free Tier) — serverless by default.

### 🌐 Highlights

- CDN via Edge Network (Cloudflare / Akamai)  
- GitHub Actions for CI → CD to Vercel  
- No backend maintenance  
- Auto-scaling on demand (within free-tier limits)  

---

## 🔐 Basic Security

> **Note**: MVP-level security only. Free-tier services used.

### ✅ Included

- Global CDN (load distribution)  
- Minimal rate limiting (free-tier, basic edge protection)  

### ⚠️ Limitations (Free Plan)

- ❌ No WAF (Web Application Firewall)  
- ❌ No IP blacklisting  
- ❌ No suspicious traffic monitoring  

For production, consider AWS WAF, Cloudflare Pro, or similar.

---

## 📦 CDN & Static Assets

- All assets (JS, CSS, images) are served via Vercel's CDN  
- **Google Fonts** and **FontAwesome** benefit from global caching  
- `/public` folder is statically served and fully cached  

---

## 🔧 DevOps Integration

### ⚙️ CI/CD

- **GitHub Actions**  
  - Auto-deploy to Vercel on push/merge  
  - Can be extended with testing, linting, etc.  

### 🧪 Testing

- [**Vitest**](https://vitest.dev/) for unit testing  
  - Fast and lightweight test runner for Vue 3 apps  

---

## 🔮 Future Enhancements

These features are **not part of the MVP**, but are ideal for scaling or production use:

### ⚙️ Architecture & Performance

- **Migrate to TypeScript** — Strong typing, better tooling  
- **Server-Side Rendering (SSR)** — Better SEO and load speed  
  → Consider [Nuxt.js](https://nuxt.com/)  
- **Clean Architecture** — Stricter separation of domain, application, and presentation layers  

### 🌐 Cloud & Security

- Use of cloud providers (AWS, GCP, Azure)  
- WAF & DDoS protection  
- Rate limiting, IP blacklisting  
- Custom CDN rules and performance tuning  

### 🧩 UI/UX Improvements

- Enhanced category filtering & layout  
- Accessibility improvements (keyboard nav, ARIA, screen reader support)  
- UI animations and personalization  
- **Login/Register system**  
- **Persistent local state** for cart/favorites across sessions  
  → Currently resets on reload; session navigation between Home ↔ Checkout is preserved  

---

## 🔧 Pending Implementations

### 🧱 Component Fixes

- [ ] Fix sidebars and related layout components  
- [ ] Add "Empty" button beside each sidebar's title (e.g., "Cart" + Empty button)  
- [ ] Add "Add to Cart" icon in the Favorites sidebar (next to fav/unfav icon)  
  - Icon should remain selected if item is already in the cart  
- [ ] Ensure cart and favorite icons remain marked if item is in the corresponding list  

### 💳 Checkout Page

- [ ] Fix bug showing image thumbnails inside the checkout card  

### 🎞️ Movie Card

- [ ] Rebuild movie card structure:
  - Move content (e.g., release date, genre, stars, price) below the image  
  - Match layout as defined in specs, not current prototype  
- [ ] Adjust layout ratio: 60% image / 40% content  
- [ ] Remove image border  
- [ ] Include:
  - Release date  
  - Star rating + genre  
  - Price (`R$ <value>`)  

### 🔍 UI & Layout

- [ ] Reduce height of the search bar  
- [ ] Apply maximum width constraints for large displays (header and views)  
- [ ] Fix scrolling behavior in views  
- [ ] Refactor and validate **responsive behavior** for all components and views  

### 📝 Final Tasks

- [ ] Generate two final project reports  
- [ ] Stop further feature development — no scope expansion  
