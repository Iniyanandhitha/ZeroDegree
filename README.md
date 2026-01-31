# ZeroDegree


## Introduction
Welcome to **Guess The Weather**, an interactive application that combines real-time weather data with a secure number matching game. 

Originally developed for the Nillion Tinybin bounty challenge, this app has been revamped with a modern **Glassmorphism UI** and improved logic. It demonstrates how to interact with external APIs and simulates secure multi-party computation comparisons.

## Features

### 1. 🌦️ Weather Guessing Game
-   **Dynamic Locations**: Enter any city name (e.g., London, New York, Tokyo) to check the weather.
-   **Real-time Data**: Fetches current temperature data using the WeatherAPI.
-   **Challenge**: Guess the current temperature in Celsius and see if you are correct!

### 2. 🔐 Secret Number Match
-   **Secure Comparison**: Simulates a secure comparison against a secret hidden value.
-   **Random Byte Challenge**: Tries to match your input (0-255) against a secret random byte fetched from a secure source (simulated via HttpBin).

### 3. 🎨 Modern UI
-   **Glassmorphism Design**: Sleek, semi-transparent cards with blur effects.
-   **Responsive Layout**: Works beautifully on desktop and mobile.
-   **Interactive Elements**: Hover effects, smooth transitions, and vibrant gradients.

## Getting Started

### Prerequisites
-   Node.js
-   npm

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/Iniyanandhitha/ZeroDegree.git
    cd ZeroDegree
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Set up Environment Variables:
    Create a `.env.local` file and add your WeatherAPI key:
    ```
    WEATHER_API_KEY=your_api_key_here
    ```

### Running the App
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack
-   **Framework**: Next.js
-   **Styling**: Styled-Components (Global CSS & CSS-in-JS)
-   **APIs**: WeatherAPI, HttpBin
-   **Concept**: Nillion Network (Secure Comparison logic)
