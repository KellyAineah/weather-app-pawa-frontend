# PawaWeather

PawaWeather is a modern, responsive weather application built with Next.js and Tailwind CSS. It fetches real-time weather data from a backend service and displays it in a clean and dynamic interface. The application features a sticky navigation bar, skeleton loading placeholders, and a simple user experience optimized for performance and clarity.

## Features

- Real-time weather updates using OpenWeatherMap API (via a backend service)
- Search for weather by city name
- Skeleton loaders for a better user experience while fetching data
- Responsive layout suitable for both desktop and mobile devices
- Sticky navbar that changes appearance on scroll
- Modular and reusable React components

## Tech Stack

- **Frontend Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **HTTP Client**: Built-in `fetch` with API proxy
- **Deployment**: Vercel or any compatible platform
- **Backend Proxy**: Deployed endpoint for weather data fetching

## Getting Started

### Prerequisites

- Node.js (version 18 or higher recommended)
- npm or yarn
- An OpenWeatherMap API key (used in the backend)

### Installation

1. Clone the repository:


git clone https://github.com/your-username/pawa-weather.git
cd pawa-weather

Install dependencies:

npm install
# or
yarn install

Create a .env.local file at the root of the project and add your API URL:

NEXT_PUBLIC_API_URL=https://weather-app-pawa.onrender.com

Ensure that the API endpoint is live and functioning.

Run the development server:

npm run dev
# or
yarn dev

The app will be available at http://localhost:3000.

Author
Kelly Aineah Wanyama
Engineering Graduate & Full-Stack Developer
Focused on building reliable and user-friendly web applications.