## Run the Project

```bash
npm run dev
```

---

## Tech Stack

- Next.js
- Tailwind CSS

---

## Authentication Flow

- Signup built using React Hook Form and Zod for validation.
- `/signup` route is used for user registration.
- `isAuthenticated` is stored in localStorage.
- Authentication check is handled inside the `/(protected)/layout` file.

### How It Works

- `/signup` → Public route.
- `/(protected)/layout` checks `localStorage` for `isAuthenticated`.
- If authenticated → renders protected children:
  - GitHub
  - Sudoku
  - Homepage

- If not authenticated → redirects to `/signup`.

---

## GitHub Feature

- Uses TanStack Query for data fetching.
- Prevents repeated API calls for the same username.
- Implements 800ms debounce before making API requests.

---

## Sudoku

- Sudoku validation logic implemented.
- Logic built with assistance of AI.
