# ElevateX

ElevateX is a production-style EdTech platform built for Harshal Wakode. It combines secure authentication, internal and affiliate courses, progress tracking, certificate generation, public verification, and an admin panel in a real full-stack architecture.

## Tech Stack

- Frontend: Next.js App Router, React, Tailwind CSS, Framer Motion
- Backend: Node.js, Express
- Database: MongoDB with Mongoose
- Auth: JWT, Google OAuth
- Certificates: PDFKit
- Media: Cloudinary (optional)

## Founder

Harshal Wakode  
AI Engineer & AI Automation Specialist

## Project Structure

```text
ElevateX/
├── backend/
│   ├── package.json
│   └── src/
│       ├── app.js
│       ├── server.js
│       ├── config/
│       ├── controllers/
│       ├── data/
│       ├── middleware/
│       ├── models/
│       ├── routes/
│       ├── services/
│       └── utils/
├── frontend/
│   ├── package.json
│   ├── next.config.js
│   └── src/
│       ├── app/
│       ├── components/
│       ├── context/
│       └── lib/
├── package.json
└── README.md
```

## Core Features

- Email/password signup and login
- Google OAuth sign-in
- JWT-protected APIs and authenticated dashboard
- Internal courses with lessons, video embeds, and progress tracking
- External affiliate courses with outbound redirects
- Certificate generation with PDFKit
- Public verification route at `/verify/:certificateId`
- Admin panel for course CRUD, uploads, user visibility, and manual certificate issuance
- Dark/light mode with premium SaaS-style UI

## Database Models

### User

- `name`
- `email`
- `password`
- `googleId`
- `avatar`
- `bio`
- `headline`
- `role`
- `provider`

### Course

- `title`
- `slug`
- `description`
- `category`
- `thumbnail`
- `videoUrl`
- `level`
- `tags`
- `isExternal`
- `externalLink`
- `provider`
- `badgeText`
- `lessons`
- `duration`
- `published`

### Progress API

- `userId`
- `courseId`
- `completedLessons`
- `progressPercent`
- `completed`
- `lastLessonId`
- `completedAt`

### Certificate

- `userId`
- `courseId`
- `certificateId`
- `certificateUrl`
- `issuedDate`

## API Routes

### Auth

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/auth/google`
- `GET /api/auth/me`
- `PATCH /api/auth/me`

### Courses

- `GET /api/courses`
- `GET /api/courses/featured`
- `GET /api/courses/:slug`

### Progress

- `GET /api/progress/me`
- `POST /api/progress/courses/:courseId/enroll`
- `POST /api/progress/courses/:courseId/lessons/:lessonId/complete`

### Certificates

- `GET /api/certificates`
- `GET /api/certificates/:certificateId`
- `POST /api/certificates/courses/:courseId/generate`
- `POST /api/certificates/manual/issue`

### Verification

- `GET /api/verify/:certificateId`

### Admin

- `GET /api/admin/users`
- `GET /api/admin/courses`
- `POST /api/admin/courses`
- `PUT /api/admin/courses/:courseId`
- `DELETE /api/admin/courses/:courseId`
- `POST /api/admin/uploads`

## Sample Data

The seed script loads:

- 1 admin user for Harshal Wakode
- 2 internal courses
  - AI Foundations with Python
  - Modern Web Development Launchpad
- 3 external affiliate courses
  - Coursera AI for Everyone
  - Udemy Freelancing Accelerator
  - Internshala Business Communication Training

## Local Setup

1. Copy environment files:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local
```

1. Install dependencies from the repo root:

```bash
npm install
```

1. Start MongoDB locally or point `MONGODB_URI` to MongoDB Atlas.

1. Seed the database:

```bash
npm run seed
```

1. Run the backend and frontend in separate terminals:

```bash
npm run dev:backend
npm run dev:frontend
```

Frontend runs on `http://localhost:3000` and backend runs on `http://localhost:5001`.

## Environment Variables

### Backend

```env
PORT=5001
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/elevatex
DB_CONNECT_RETRIES=5
DB_CONNECT_RETRY_DELAY_MS=5000
DB_SERVER_SELECTION_TIMEOUT_MS=10000
CLIENT_URL=http://localhost:3000
JWT_SECRET=replace_this_with_a_long_random_secret
JWT_EXPIRES_IN=7d
GOOGLE_CLIENT_ID=your_google_oauth_client_id
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
ADMIN_NAME=Harshal Wakode
ADMIN_EMAIL=admin@elevatex.com
ADMIN_PASSWORD=ChangeMe123!
```

### Frontend

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:5001/api
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_oauth_client_id
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Payments

```env
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxx
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
RAZORPAY_CURRENCY=INR
RAZORPAY_PLAN_NAME=Pro Launch
RAZORPAY_PRO_AMOUNT_PAISE=99900
RAZORPAY_THEME_COLOR=#5169ff
```

### Secret Handling

- Commit only placeholder values in `backend/.env.example` and `frontend/.env.example`.
- Keep real credentials in local-only files like `backend/.env` and `frontend/.env.local`.
- Do not commit live Google, JWT, Cloudinary, or Razorpay secrets to GitHub.
- For production, add the same variables in your hosting provider's environment-variable settings instead of storing them in the repo.
- If a secret was pasted into chat, screenshots, or an exposed file, rotate it in the provider dashboard and replace it locally.

## Deployment

### Frontend on Vercel

1. Import the repo into Vercel.
2. Set root directory to `frontend`.
3. Add environment variables:
   - `NEXT_PUBLIC_SITE_URL`
   - `NEXT_PUBLIC_API_URL`
   - `NEXT_PUBLIC_GOOGLE_CLIENT_ID`
   - `NEXT_PUBLIC_GA_MEASUREMENT_ID`
4. Deploy.

### Backend on Render or Railway

1. Create a new Node.js web service.
2. Set root directory to `backend`.
3. Add environment variables:
   - `PORT`
   - `NODE_ENV=production`
   - `MONGODB_URI`
   - `DB_CONNECT_RETRIES`
   - `DB_CONNECT_RETRY_DELAY_MS`
   - `DB_SERVER_SELECTION_TIMEOUT_MS`
   - `CLIENT_URL`
   - `JWT_SECRET`
   - `JWT_EXPIRES_IN`
   - `GOOGLE_CLIENT_ID`
   - `RAZORPAY_KEY_ID`
   - `RAZORPAY_KEY_SECRET`
   - `RAZORPAY_CURRENCY`
   - `RAZORPAY_PLAN_NAME`
   - `RAZORPAY_PRO_AMOUNT_PAISE`
   - `RAZORPAY_THEME_COLOR`
   - Cloudinary vars if using uploads
4. Deploy.
5. Use `npm start` as the start command if your platform asks for one.

### GitHub

- GitHub should store source code and safe example files, not live secrets.
- If you use GitHub Actions, store deployment credentials as repository or organization secrets.
- If you deploy from GitHub to Vercel, Render, or Railway, configure production env vars in that platform after connecting the repo.

### MongoDB Atlas

1. Create a cluster.
2. Create a database user.
3. Allow the backend IP or use trusted access.
4. Copy the connection string into `MONGODB_URI`.

## Certificate Flow

1. User enrolls in an internal course.
2. User completes all lessons.
3. Frontend calls `POST /api/certificates/courses/:courseId/generate`.
4. Backend creates a unique certificate ID.
5. PDFKit generates a branded certificate PDF.
6. Certificate metadata is saved to MongoDB.
7. Certificate becomes downloadable and publicly verifiable.

## Notes

- The original static HTML/CSS files remain in the repo, but the production application lives in `frontend/` and `backend/`.
- Cloudinary uploads are optional. Certificate PDFs are stored locally by default under `backend/src/public/certificates`.
- Google login in this stack uses a Google Identity Services client ID on both frontend and backend token verification.
- Razorpay Pro checkout is now wired into the main ElevateX app. To go live, add the Razorpay API keys, enable auto-capture, and redeploy both apps.
- `frontend/src/app/robots.js` and `frontend/src/app/sitemap.js` provide SEO-friendly crawl control and sitemap output for the Next.js app.
