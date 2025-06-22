# GitHub Finder

A modern React application that fetches and displays GitHub users with pagination, search functionality, and favorites management. 

Try the app from [here](https://github-finder-m11.vercel.app/)

![Screenshot](preview.png)

## Demo

https://github.com/user-attachments/assets/1543e69e-6494-4255-8b98-dfe5f98b6574

## Features

- Fetch and display GitHub users with cursor-based pagination using the official API
- Built-in search with debounced input for better performance
- Manage favorites using Redux with persistence across page reloads
- Navigation between Home and Favorites pages using React Router
- Responsive design with Tailwind CSS
- Dark Mode support

## Tech Stack

- React 19 + Vite + TypeScript
- Redux Toolkit + Redux Persist
- React Router v7
- Tailwind CSS V4
- Axios

## Installation & Setup

### Prerequisites

- Node.js (v18 or higher recommended for React 19 and Vite 6)
- npm (V8.1 or higher)

### Quick Start

1. **Clone the repository**

```bash
git clone https://github.com/MohamedKhalifa11/github-finder.git
cd github-finder
```

2. **Install dependencies**

```bash
npm i
```

3. **Environment Setup (Optional)**

```bash
# Create .env file for GitHub token (recommended for higher rate limits)
echo "VITE_GITHUB_TOKEN=your_github_personal_access_token" > .env
```

4. **Start development server**

```bash
npm run dev
```

5. **Open in browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## Technical Design Rationale

#### **Favorites State Management**

- **Used**: Redux Toolkit + Redux Persist
- **Not used**: Context API + Local Storage
- **Rationale**:
  - Using Context API for such dynamic state could lead to performance issues, since any change re-renders all components consuming the context, even if only part of the data changed
  - Toolkit reduces boilerplate compared to vanilla Redux
  - Redux Persist ensures data persistence across sessions

#### **Theme (Dark Mode)**

- **Used**: Context API
- **Not used**: Redux or CSS-only toggles
- **Rationale**:
  - Lightweight and avoids Redux boilerplate.
  - Perfect for use with Tailwind’s class-based dark mode system.

#### **Pagination Implementation**

- **Used**: Cursor-based pagination with GitHub's `since` param
- **Not used**: Offset-based pagination (not supported by GitHub API)
- **Rationale**:
  - More efficient than offset-based pagination for large datasets
  - Maintains state in URL for better UX

#### **Search Strategy**

- **Used**: Client-side filtering
- **Not used**: Server-side filtering
- **Rationale**:
  - Reduces API calls and respects rate limits instead of server side
  - Instant feedback for users

#### **Custom Icons vs Icon Libraries**
- **Used**: Custom SVG icon components
- **Not used**: External icon libraries (e.g., FontAwesome, Lucide)
- **Rationale**:
  - Helps keep the bundle size smaller by avoiding unused icons from large libraries

## Code Review Notes

### Strengths

1. **Type Safety**: Comprehensive TypeScript usage with proper type definitions
2. **Clean Architecture**: Well-organized component structure with separation of concerns
3. **Error Handling**: Robust error states including network and API rate limit handling
4. **Performance**: Debounced search and memoized callbacks prevent excessive operations
5. **User Experience**: Loading states, responsive design, and intuitive navigation

### Potential Improvements

1. **Testing**: Could benefit from unit tests for components and Redux slice
2. **Infinite Scroll**: Could implement as alternative to pagination
3. **Search Enhancement**: Could add advanced search filters (location, repositories, etc.)
4. **Caching**: Could implement query caching for better performance

---

_Developed by Mohamed Khalifa :)_
