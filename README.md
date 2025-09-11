# Voice Shopping Assistant

A shopping list app where you can add items using voice commands or traditional search. Add products to your cart and manage your shopping list.

## Features

- Voice commands to add items ("Add milk to my shopping list")
- Quick product suggestions
- Shopping list management
- Clean, mobile-friendly interface

## Tech Stack

**Frontend:** React, Vite, Tailwind CSS, React Router, react-icons
**Backend:** Node.js, Express, MongoDB, Web Speech API

## Prerequisites

- Node.js (v16+)
- MongoDB (local or Atlas)

## Installation

```bash
# Clone and install dependencies
git clone <your-repo-url>
cd voice-shopping-assistant

# Backend
cd backend && npm install

# Frontend  
cd ../client && npm install
```

## Setup

### Environment Variables
Create `backend/.env`:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/shopping
CLIENT_URL=http://localhost:5173
```

### MongoDB
- Local: Install MongoDB and start service
- Cloud: Use MongoDB Atlas connection string

## Running the App

```bash
# Start backend (terminal 1)
cd backend && npm start

# Start frontend (terminal 2)  
cd client && npm run dev
```

Open `http://localhost:5173`

## How it Works

1. Browse suggested products on the home page
2. Add items to cart via voice ("Add milk") or clicking buttons
3. View and manage your shopping list
4. Delete items from the list page

## API Routes

**Shopping List:**
- `GET /list` - Get all items
- `POST /add` - Add new item
- `DELETE /delete/:id` - Remove item

## Deployment

**Backend (Heroku):**
```bash
# Set environment variables in Heroku dashboard
# Connect GitHub repo for auto-deploy
```

**Frontend (Vercel/Netlify):**
```bash
cd client && npm run build
# Deploy dist/ folder
```

## Troubleshooting

- **MongoDB error**: Check if MongoDB is running
- **Voice not working**: Check microphone permissions
- **CORS issues**: Update CLIENT_URL in backend .env

## Contributing

1. Fork the repo
2. Create feature branch
3. Submit pull request

---

Built with React, Node.js, and MongoDB. Features voice recognition for adding items to your shopping list.
