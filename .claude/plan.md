# MEDVEK — Full-Stack Build Plan (From Scratch)

## Tech Stack

### Frontend Web (React.js + TypeScript)
- **Vite** — fast dev bundler (no Next.js)
- **React 18 + TypeScript**
- **React Router v6** — client-side routing, portal-based layouts
- **Tailwind CSS** — utility-first, Spot-inspired warm design
- **Zustand** — lightweight state management
- **TanStack Query** — data fetching + caching
- **Socket.io-client** — real-time events (orders, tracking, consults)
- **simple-peer** — WebRTC 1-to-1 video (teleconsultation)

### Frontend Mobile (React Native + TypeScript)
- **Expo SDK 51** — managed workflow, iOS + Android
- **Expo Router v3** — file-based routing (same feel as web)
- **NativeWind v4** — Tailwind CSS for React Native
- **Zustand** — shared state logic with web
- **Socket.io-client** — same real-time layer

### Backend (Node.js + TypeScript)
- **Fastify** — high-performance HTTP server
- **Socket.io** — WebSocket layer (real-time: chat, tracking, consult signaling)
- **Prisma ORM** — TypeScript-first, type-safe DB access
- **JWT + bcrypt** — auth tokens
- **Zod** — schema validation
- **Multer** — file uploads (prescriptions, lab reports)

### Database (100% Free, any VM)
- **PostgreSQL** — primary database (free, open-source, any VM)
- **Redis** — sessions, pub/sub, real-time queue (free, open-source)

### Monorepo
- **Turborepo** — monorepo orchestration
```
medvek/
├── apps/
│   ├── web/        → Vite + React (all web portals)
│   ├── mobile/     → Expo React Native (all mobile portals)
│   └── api/        → Fastify backend
└── packages/
    ├── shared/     → Types, constants, Zod schemas
    └── ui/         → Shared web components (Button, Card, Input…)
```

## Portals & Features

| Portal | Web | Mobile | Key Features |
|--------|-----|--------|-------------|
| Patient/User | ✅ | ✅ | Book consults, order meds, track delivery, health records, OTP login |
| Doctor (Medical/Vet/Dental) | ✅ | ✅ | Accept consults, WebRTC call, prescribe, schedule |
| Medicine Vendor | ✅ | ✅ | Receive/accept orders, update stock, dispatch |
| Diagnostic/Lab | ✅ | ✅ | Receive bookings, upload reports, home collection |
| Delivery Driver | ✅ | ✅ (primary) | Accept jobs, GPS tracking, delivery proof |
| Admin | ✅ | — | Manage users, doctors, vendors, orders |
| Super Admin | ✅ | — | All portals, analytics, system config |

## Services (No Mobile X-Ray)
Teleconsultation · Home Visits · Lab Tests · Medicine Delivery ·
Ambulance · Nurse Care · Dentist · Veterinary · Palliative Care ·
Insurance Support · Appointments · Health Records

## Build Order
1. Monorepo scaffold (Turborepo + all apps created)
2. Shared package (types, schemas, constants)
3. Backend core (Fastify + Prisma + PostgreSQL + Redis + Socket.io + Auth)
4. Backend routes (all portals: auth, booking, orders, WebRTC signaling)
5. Web — shared UI package (Tailwind design system, Spot-inspired)
6. Web — Patient portal (login → dashboard → all services)
7. Web — Doctor portal
8. Web — Vendor + Lab + Driver portals
9. Web — Admin + Super Admin portals
10. Mobile — Patient app (Expo)
11. Mobile — Doctor + Driver apps

## Design System (Spot-inspired, MEDVEK brand)
- Primary: `#8B2635` (deep rose/crimson)
- Background: `#FFF8F0` (warm cream)
- Accent: `#E8A0A0` (soft pink)
- Text: `#1A0A0F` (near black warm)
- Success: `#2D7A4F` · Warning: `#C4882A` · Error: `#C0392B`
- Font: Nunito (rounded, friendly — like Spot)
- Radius: pill buttons (9999px), cards (16px), modals (24px)
