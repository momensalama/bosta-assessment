# Bosta Frontend Assessment

Product store app built with React + Fake Store API for the Bosta frontend assessment.

**Live demo:** [https://bosta-assessment-sigma.vercel.app](https://bosta-assessment-sigma.vercel.app)

## Stack

React 19, TypeScript, Tailwind CSS v4, React Router v7, Zustand, react-icons, native fetch (no axios).

## Features

- Product listing with sort (price / category) and pagination
- Product details page
- Create product form with validation
- Cart with quantity controls — the add-to-cart button becomes a stepper once the item is in the cart
- Auth (login + signup) with protected routes and localStorage persistence

> The Fake Store API doesn't persist new accounts, so use `mor_2314` / `83r5^_` to log in.

## Run locally

```bash
git clone https://github.com/momensalama/bosta-assessment.git
cd bosta-assessment
npm install
npm run dev
```

## Structure

```
src/
├── api/          # fetch wrapper + endpoints
├── components/   # ui/, layout/, shared components
├── hooks/        # data fetching hooks
├── pages/        # one component per route
├── store/        # Zustand (auth, cart)
├── types/
└── utils/        # validation, sorting
```
