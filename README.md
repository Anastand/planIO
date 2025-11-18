# RealtimeChat

A full-stack real-time chat application using Next.js (frontend), Node.js + Socket.IO + Redis (backend), and Turborepo monorepo structure.  
Deployable to Vercel (frontend) and Render (backend).

## Features

- Live chat with multiple users
- Each message shows username (randomly assigned)
- Real-time updates via Socket.IO
- Redis-based pub/sub for scalable backend
- Modern React/TypeScript code
- Clean, minimal Discord-like UI

## Tech Stack

- Frontend: Next.js (TypeScript, React)
- Backend: Node.js, Socket.IO, Redis, TypeScript
- Monorepo: Turborepo
- Deployment: Vercel (frontend), Render (backend)

## Getting Started (Local)

1. **Clone the repo**
   ```
   git clone https://github.com/Anastand/RealtimeChat.git
   cd RealtimeChat
   ```

2. **Install dependencies (monorepo root)**
   ```
   pnpm install
   ```

3. **Setup environment variables**

   - In `apps/server`, configure Redis connection in environment or override in code.

4. **Run both apps**

   - Start backend (in `apps/server`)
     ```
     pnpm run dev
     ```
   - Start frontend (in `apps/web`)
     ```
     pnpm run dev
     ```

## Deployment

- **Frontend:** Push to GitHub, connect repo to Vercel, set `NEXT_PUBLIC_SOCKET_URL` to your Render backend URL.
- **Backend:** Push to GitHub, connect repo to Render, set root directory to `apps/server`, set build/start commands as in `package.json`, ensure Redis is reachable.

## Folder Structure

```
apps/
  server/      # Backend - Node.js / Socket.IO / Redis
  web/         # Frontend - Next.js App
packages/
  ... (optional shared code/config)
```

## Environment Variables

-  (web) — Backend Socket.IO URL
-  (server) — Redis connection string

## Credits

- [Render](https://render.com/) for backend hosting
- [Vercel](https://vercel.com/) for frontend hosting

## License

MIT

***
