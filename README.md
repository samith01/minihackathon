# uOttawa Housing+ 🏠

An improved version of the uOttawa Housing Billboard with AI-powered search and roommate matching.

## Features

- **Browse Listings** - Filter off-campus housing by zone, price, bedrooms, and rental type
- **AI Assistant** - Chat with an AI to find housing based on your preferences (powered by Groq LLM)
- **Find Roommates** - Tinder-style swipe interface to match with students interested in the same listings
- **Favorites** - Save listings you like with persistent storage
- **Student Profiles** - View potential roommates with their social links (Instagram/LinkedIn)

## Tech Stack

- React 19 + TypeScript
- Vite
- Groq API (llama-3.3-70b-versatile)

## Setup

1. Clone and install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file with your Groq API key:
   ```
   VITE_GROQ_API_KEY=your_api_key_here
   ```
   Get your key at [console.groq.com](https://console.groq.com)

3. Start the dev server:
   ```bash
   npm run dev
   ```

## Screenshots

- **Browse**: Grid of housing listings with filters and sorting
- **AI Chat**: Natural language housing search assistant
- **Roommate Finder**: Swipe to match with potential roommates

---

Built for uOttawa students 🎓
