# TechHive SA

A responsive, frontend-only tech store demo for laptops, phones, and accessories with guest restrictions, a multi-step mock checkout, and a full admin dashboard. Built with vanilla HTML/CSS/JS — no build step, no backend.

## 🚀 Quick start

Open `index.html` in a browser (or serve with any static server — `python3 -m http.server` works fine). Everything persists to `localStorage`, so refresh keeps your state.

## 🔑 Demo admin credentials

| Email | Password |
|-------|----------|
| `admin@techhive.co.za` | `admin123` |

These are seeded automatically on first load. Log in via the **Login** button in the header — the credentials are also shown inside the login modal.

## ✨ What's new in this version

### Guest restrictions
- Guests can browse, search, filter, and view product details freely
- Adding to cart, adding to compare, and checkout all require login
- Attempting any of these opens the login modal with a friendly prompt

### Authentication
- Signup creates a customer account (email + password, min 6 chars)
- Login validates email + password
- Logout clears session and cart
- Roles: `customer` and `admin` — admin link in the header only appears for admins

### Multi-step mock checkout
1. **Shipping** — name, address, city, province, postal code, phone
2. **Payment** — name on card, 16-digit card number, MM/YY expiry, CVV (all validated, only last 4 digits stored)
3. **Review** — confirm details
4. **Processing** — 2-second spinner simulating a bank API call
5. **Success** — order confirmation with order number and simulated email notice

A top-of-page **DEMO banner** makes it obvious no real payment happens. The payment form also carries an inline "simulated" note.

### Admin dashboard
- **Products tab** — add, edit, delete products; inline stock editor per row
- **Orders tab** — see every customer order, change status (Pending → Shipped → Delivered → Cancelled) via dropdown
- **Analytics tab** — total products, units in stock, orders, revenue, registered users, newsletter subs, and top-5 bestsellers (computed from real order data)

### Stock management
- Each product has a `stock` integer
- Badges auto-render: **In Stock** / **Low Stock · N left** (≤5) / **Out of Stock** (0)
- Out-of-stock products show a disabled "Unavailable" button
- Cart quantity capped at available stock
- Placing an order decrements stock automatically

### My Orders (customers)
- Logged-in customers see **My Orders** in the nav
- Order cards show ID, date, status badge, line items, total, and last-4 of card

### Persistence
Everything persists across refresh via `localStorage`:
- Users, session, cart, compare, products, orders, newsletter subs, theme

## 🗂️ File structure

```
techhive/
├── index.html     Structural markup only (no inline logic)
├── art.js         SVG product illustrations (phones, laptops, watches, buds, gaming)
├── script.js      All app logic (auth, cart, checkout, admin, orders, state)
├── style.css      Base styles + additions for auth/checkout/admin/orders
└── README.md      This file
```

## 🎨 Product artwork

Products are illustrated with inline SVG rather than bitmap images — sharp at any size, no external requests, and they respect your theme. Each product has an `artType` field (`phone`, `laptop`, `watch`, `earbuds`, or `gaming`) and the brand determines the accent colors (Apple silver, Samsung blue, Lenovo red, ASUS orange-red, etc.). When an admin adds a new product, the art type is inferred from the category and name.

## 📱 Product catalogue

14 products across 6 brands, including real 2025/2026 releases:
- **iPhone 17** (Apple, September 2025) — A19 chip, Center Stage camera, ProMotion 120Hz
- **Samsung Galaxy S26 Ultra** (March 2026) — Snapdragon 8 Elite Gen 5, Privacy Display
- **MacBook Pro M5** (October 2025) — 45% faster GPU, Neural Accelerators
- **ASUS ZenBook 14 OLED** — 2.8K OLED touchscreen ultrabook
- **Samsung Galaxy Book5 Pro** — Copilot+ PC with AMOLED 2X

Plus the original 9: iPhone 15, MacBook Air, Apple Watch Series 9, Galaxy S24, Buds Pro, Dell XPS 15, HP Pavilion Gaming, ASUS ROG Zephyrus, Lenovo ThinkPad X1.

## ⚠️ Honest caveats

This is a **frontend-only demo** — intentionally so, because it's meant to run from a static host with zero setup. That means:

- **Passwords are not securely hashed.** The code uses a toy FNV-1a hash to avoid storing plaintext, but a real app must use server-side bcrypt/argon2. Never ship this auth to production.
- **No real payment processing.** Any 16-digit card "works". The demo banner and inline notes are deliberate so nobody is confused.
- **All data lives in the user's browser.** Clearing `localStorage` wipes everything and re-seeds defaults. There's no shared state between devices or users.
- **No CSRF / XSS hardening.** Product descriptions and names are rendered with `innerHTML` in several places; if you let untrusted users submit products you'd need to escape them.

If you want to take this to production, the path is: add a real backend (Node/Express, or Next.js API routes), move `products`/`users`/`orders` into a database (Postgres or Mongo), swap the toy hash for bcrypt, and replace the mock payment step with Stripe/Paystack/Yoco.

## 🧪 How to try it

1. Open the site as a guest — click "Add to Cart" → login modal appears
2. Sign up as a new customer → cart now works
3. Add a few items, go to Cart → "Proceed to Checkout"
4. Step through shipping + mock payment (try `4242 4242 4242 4242`) → get success page
5. Check "My Orders" to see your order with status
6. Log out, then log in as `admin@techhive.co.za` / `admin123`
7. Go to Admin → Orders tab → change the status of the order you just placed
8. Go to Products tab → edit stock, delete a product, or add a new one
9. Go to Analytics tab → see revenue and top sellers