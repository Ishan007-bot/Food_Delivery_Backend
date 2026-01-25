# FoodDelivery Frontend

Modern React frontend for the Food Delivery System built with TypeScript, Vite, and React Router.

## Project Overview

FoodDelivery is a comprehensive food delivery platform that allows users to:
- Browse restaurants and menus
- Place orders with real-time tracking
- Make secure payments
- View order history and analytics
- Manage profiles and preferences

## Technologies

This project is built with:

- **Vite** - Fast build tool and dev server
- **TypeScript** - Type-safe development
- **React 18** - UI library
- **React Router** - Client-side routing
- **shadcn-ui** - Beautiful UI components
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Smooth animations
- **React Query** - Data fetching and caching
- **Axios** - HTTP client

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Backend API running on `http://localhost:8080`

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Create environment file:**
```bash
cp .env.example .env
```

3. **Update `.env` with your backend API URL:**
```
VITE_API_BASE_URL=http://localhost:8080/api
```

4. **Start development server:**
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm test` - Run tests

## Project Structure

```
src/
├── api/              # API service layer (via lib/api.ts)
├── components/        # Reusable UI components
│   ├── ui/           # shadcn-ui components
│   └── dashboard/    # Dashboard-specific components
├── contexts/         # React contexts (Auth, Theme)
├── hooks/            # Custom React hooks
├── lib/              # Utilities and API client
├── pages/            # Page components
│   ├── Landing.tsx   # Homepage
│   ├── Login.tsx     # Login page
│   ├── Register.tsx # Registration page
│   └── Dashboard.tsx # Main dashboard
└── main.tsx          # Entry point
```

## Features

- 🔐 **Authentication** - JWT-based login and registration
- 🏪 **Restaurant Browsing** - Search and filter restaurants
- 🍕 **Menu Display** - View restaurant menus with images
- 🛒 **Order Management** - Place and track orders
- 📊 **Analytics** - View order statistics and insights
- 📧 **Email Integration** - Send and track emails
- 📁 **File Uploads** - Upload profile pictures and restaurant logos
- ⚡ **Rate Limiting** - View API rate limit status
- 🔗 **Integrations** - External API integrations

## API Integration

The frontend communicates with the Spring Boot backend API. Make sure the backend is running on port 8080.

### Key Endpoints

- Authentication: `/api/auth/login`, `/api/auth/register`
- Restaurants: `/api/restaurants`
- Menu Items: `/api/menu-items`
- Orders: `/api/orders`
- Analytics: `/api/analytics`
- Users: `/api/users`

## Environment Variables

- `VITE_API_BASE_URL` - Backend API base URL (default: `http://localhost:8080/api`)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
