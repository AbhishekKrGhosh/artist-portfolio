# Artist Portfolio - MERN Stack

## Project Structure

```
artist-portfolio/
├── server/          # Express + MongoDB backend
├── client/          # React frontend (portfolio site)
└── admin/           # React admin panel
```

## Setup

### 1. Server

```bash
cd server
npm install
```

Edit `server/.env` with your MongoDB connection:

```
MONGO_URI=mongodb://localhost:27017/artist-portfolio
PORT=5000
JWT_SECRET=your_jwt_secret_key_change_this_in_production
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123
```

Seed the database:

```bash
npm run seed
```

Start the server:

```bash
npm run dev
```

### 2. Client

```bash
cd client
npm install
npm run dev
```

Opens at http://localhost:3000

### 3. Admin Panel

```bash
cd admin
npm install
npm run dev
```

Opens at http://localhost:3001

Login with:
- Email: admin@example.com
- Password: admin123

## Features

- **Client**: Full portfolio site with Hero, Selected Works (with category filter), Featured Artwork, Quote, Collections, About, Exhibitions timeline, Studio Notes (blog), Contact, and Footer
- **Admin Panel**: Login-protected dashboard to manage all content — artworks, collections, exhibitions, blog posts, and site settings
- **Images**: Stored as base64 in MongoDB
- **Auth**: JWT-based authentication for admin routes
