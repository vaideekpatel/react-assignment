# React Assignment

This repository contains the completed solution for the **React Assignment** (Attached in email). It implements a full frontend experience with authentication, profile management, and a product catalog, using Next.js 15 (App Router), React 18+, and TypeScript.

---

## Features

* **Authentication**

  * **Signup**: first/last name, email, mobile, password, confirm password

    * Form validation via React Hook Form + Yup
    * Email uniqueness enforced against localStorage
    * Password strength (8–32 chars, uppercase, lowercase, number, special)
    * Passwords encrypted in storage using `crypto-js`
  * **Login**: email + password, with error messages for invalid credentials
  * **Logout**: clears session and redirects to login
* **Profile Management**

  * **Edit Profile**: pre‑populated form; prevents email collisions
  * **Change Password**: verify current password, validate new password, confirm match
* **Protected Routes**: only authenticated users can access dashboard, profile, and catalog
* **Dashboard**: personalized greeting, quick navigation links
* **Product Catalog**

  * **Listing**: fetch paginated products from DummyJSON API

    * Thumbnail, title, brand, price, discount, rating
    * Prev/Next + page number controls
    * Loading spinner and retry on network error
  * **Detail View**: fetch product by ID; show description, stock, images
* **Styling & Layout**

  * Scoped **CSS Modules** per page
  * Global design tokens in `variables.css` (colors, fonts, spacing)
  * Responsive breakpoints: 1920px, 1199px, 991px, 767px, 575px
  * Accessible layouts: forms with ARIA, focus rings, skip-link support
* **Testing**

  * Unit tests for `authService` and `productService` (Jest + ts‑jest)

---

## Prerequisites

* **Node.js** v18+ (tested)
* **npm** v8+ or **Yarn** v1/v2
* A copy of the provided `.env.local` file (sent via email)
---

## Installation & Setup

1. **Clone the repository**

   ```bash
   git clone <repo-url> react-advance-assignment
   cd react-advance-assignment
   ```

2. **Create environment file**

   ```bash
   cp .env.local.example .env.local
   # then update .env.local with the values sent via email
   ```

3. **Install dependencies**

   ```bash
   npm ci
   # or
   yarn install
   ```

4. **Start development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Visit [http://localhost:3000](http://localhost:3000).

---

## Available Scripts

* **`npm run dev`** / `yarn dev` — start Next.js in development
* **`npm run build`** / `yarn build` — compile production build
* **`npm start`** / `yarn start` — serve production build locally
* **`npm run lint`** / `yarn lint` — run ESLint
* **`npm run format`** / `yarn format` — format code with Prettier
* **`npm test`** / `yarn test` — run Jest unit tests

---

## PDF Requirements Checklist

| Requirement                                                            | Status |
| ---------------------------------------------------------------------- | :----: |
| Public Signup & Login forms with validation                            |    ✅   |
| Local storage user management (encrypt passwords)                      |    ✅   |
| Email uniqueness on signup & profile edit                              |    ✅   |
| Protected routes: dashboard, profile, products                         |    ✅   |
| Change Password with strength + match validation                       |    ✅   |
| Product catalog listing & detail with DummyJSON API                    |    ✅   |
| Responsive breakpoints (1920, 1199, 991, 767, 575px)                   |    ✅   |
| Scoped CSS Modules + design tokens (variables.css)                     |    ✅   |
| Loading spinners, retry flows on network error                         |    ✅   |
| Accessibility: ARIA roles, `<main>` landmarks, skip link, focus styles |    ✅   |
| Unit tests for services                                                |    ✅   |

---

