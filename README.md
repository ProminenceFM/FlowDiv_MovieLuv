
# FLOWDIV_MovieLuv

This is a **React-based movie application** that allows users to browse popular and upcoming movies, search for movie titles, view detailed information, and manage a personal watchlist. It integrates with **The Movie Database (TMDb) API** for dynamic movie data.

---

## 🚀 Features

- 🎬 **Popular Movies** – Browse the most popular films right now.
- ⏳ **Upcoming Movies** – See what’s coming to theaters soon.
- 🔍 **Global Search** – Quickly search for any movie by title.
- ⭐ **Watchlist** – Save and manage movies you're interested in.
- 📖 **Movie Details** – View comprehensive information about any selected movie.

---

## 🛠️ Tech Stack

- ⚛️ React (with Hooks)
- 🧠 Redux Toolkit & RTK Query for state and API management
- 🎨 Tailwind CSS for responsive and modern styling
- ⚡ Vite for blazing-fast development
- ☁️ The Movie Database (TMDb) API

---

## 🧰 Installation & Setup Guide

Open your terminal and follow the steps below to set up and run the project locally.

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/prominenceFM/FlowDiv_MovieLuv.git
````

### 2️⃣ Navigate to the Project Directory

```bash
cd FlowDiv_MovieLuv
```

### 3️⃣ Install Dependencies

```bash
npm install
```

### 4️⃣ Create a `.env` File

In the root of the project, create a `.env` file (if it doesn't exist already) and add the following environment variables:

```env
VITE_TMDB_API_KEY=your_actual_api_key
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3/
```

> 🔐 **Note**: Replace `your_actual_api_key` with your TMDb API key. You can get it by creating a free account at [https://www.themoviedb.org](https://www.themoviedb.org).

---

## ▶️ Running the Development Server

Once you've added your API key, start the app with:

```bash
npm run dev
```

This will start the Vite development server. By default, it runs on:

```
http://localhost:5173
```

If port 5173 is taken, Vite will automatically use the next available port.



---

## 📂 Project Structure

```
src/
├── api/                # RTK Query API slices
├── components/         # Reusable UI components (Loader Componentss, MovieCard, BackButton, etc.)
├── pages/              # Pages (Home, Details, ViewDetails, etc.)
├── utils/              # Styling and helper utilities
├── App.tsx             # Main app component
└── main.tsx            # Entry point
```

---

##  Acknowledgements

* [FLOWDIV] 

* [React VITE](https://vite.dev/guide/)

* [TMDb API](https://www.themoviedb.org/documentation/api) — for providing free and extensive movie data.
* [Tailwind CSS](https://tailwindcss.com/) — for utility-first CSS.

---


Enjoy the movies! 🍿


