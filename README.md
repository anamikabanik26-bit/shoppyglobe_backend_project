# ShoppyGlobe Backend API

Node.js + Express + MongoDB backend for the Internshala ShoppyGlobe assignment.

## Features
- Product listing and product-by-ID endpoints
- Cart add, list, quantity update and delete endpoints
- JWT registration/login; bcrypt password hashing
- MongoDB/Mongoose models for users, products and cart items
- Validation, stock checks and centralized JSON error handling
- Thunder Client test plan

## Setup
1. Install Node.js 18+ and start MongoDB locally or create an Atlas database.
2. In this project folder run `npm install`.
3. Copy `.env.example` to `.env`. Set `MONGODB_URI` and a long private `JWT_SECRET`. Never commit `.env`.
4. Run `npm run dev`. The server starts at `http://localhost:5000` after MongoDB connects.
5. Open `http://localhost:5000/` for a health response.

## Routes
| Method | Endpoint | Auth | Purpose |
|---|---|---|---|
| POST | `/api/auth/register` | No | Register user and receive token |
| POST | `/api/auth/login` | No | Login and receive token |
| GET | `/api/products` | No | List products |
| GET | `/api/products/:id` | No | Get product by MongoDB ID |
| GET | `/api/cart` | Bearer JWT | Get current user's cart |
| POST | `/api/cart` | Bearer JWT | Add product `{ "productId": "...", "quantity": 1 }` |
| PUT | `/api/cart/:id` | Bearer JWT | Set cart item's quantity `{ "quantity": 2 }` |
| DELETE | `/api/cart/:id` | Bearer JWT | Remove cart item |

The assignment brief asks for product GET routes, so this starter does not expose public product-create/update/delete routes. Seed products through MongoDB Compass. Example document for `products`: `{ "name":"Wireless Headphones", "price":1499, "description":"Bluetooth over-ear headphones", "stockQuantity":20 }`. MongoDB generates `_id`; use it in the product endpoint and cart body.

## Thunder Client test steps
Base URL: `http://localhost:5000/api`.
1. `POST /auth/register` JSON: `{ "name":"Test User", "email":"test@example.com", "password":"Passw0rd!" }`. Save returned `token`. Use a fresh email if registering again.
2. `POST /auth/login` JSON: `{ "email":"test@example.com", "password":"Passw0rd!" }`.
3. `GET /products`; then `GET /products/PRODUCT_OBJECT_ID`.
4. For all cart calls add header `Authorization: Bearer YOUR_TOKEN`.
5. `POST /cart` JSON `{ "productId":"PRODUCT_OBJECT_ID", "quantity":1 }`; copy returned `item._id`.
6. `GET /cart`; `PUT /cart/CART_ITEM_ID` JSON `{ "quantity":2 }`; then `DELETE /cart/CART_ITEM_ID`.
7. Test errors: missing token (401), invalid ID/quantity (400), missing product (404), unknown route (404).

## Submission checklist
- [ ] `npm install` succeeds and MongoDB connection works
- [ ] Test all routes in Thunder Client and capture your actual response screenshots
- [ ] Save screenshots under `docs/screenshots/`
- [ ] Push code and README to GitHub; submit the repository URL
- [ ] Do not commit `.env`; include comments and documentation

## Security notes
Passwords are hashed. Cart records are scoped to the authenticated user. For production, add rate limiting, stricter CORS, HTTPS, and stronger monitoring.
