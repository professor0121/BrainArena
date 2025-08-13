# Online Exam System — Node.js Microservices + React/Electron (Student & Admin)

A production‑ready monorepo skeleton with Node.js microservices, a secure API gateway, real‑time websockets, and two Electron + React apps (Student & Admin). Includes Docker Compose for infra.

> Clone the structure below into your repo. Replace `YOUR_APP_NAME` where noted.

---

## Monorepo Layout

```
online-exam/
├─ docker-compose.yml
├─ .env.example
├─ package.json
├─ README.md
├─ gateway/               # API gateway & auth guard
│  ├─ package.json
│  └─ src/
│     ├─ index.js
│     ├─ authMiddleware.js
│     └─ routes.js
├─ services/
│  ├─ common/             # shared utils/types
│  │  ├─ package.json
│  │  └─ src/index.js
│  ├─ auth-service/
│  │  ├─ package.json
│  │  └─ src/{index.js,usersRepo.js}
│  ├─ question-service/
│  │  ├─ package.json
│  │  └─ src/{index.js,questionsRepo.js}
│  ├─ exam-service/
│  │  ├─ package.json
│  │  └─ src/{index.js,examsRepo.js}
│  ├─ submission-service/
│  │  ├─ package.json
│  │  └─ src/{index.js,submissionsRepo.js,grader.js}
│  ├─ proctor-service/    # hooks for webcam/ML (placeholder endpoints)
│  │  ├─ package.json
│  │  └─ src/{index.js}
│  └─ notification-service/
│     ├─ package.json
│     └─ src/{index.js}
├─ ws-service/            # Socket.IO service
│  ├─ package.json
│  └─ src/{index.js}
├─ apps/
│  ├─ student-electron/
│  │  ├─ package.json
│  │  ├─ vite.config.ts
│  │  ├─ electron/{main.ts,preload.ts}
│  │  └─ src/{main.tsx,App.tsx}
│  └─ admin-electron/
│     ├─ package.json
│     ├─ vite.config.ts
│     ├─ electron/{main.ts,preload.ts}
│     └─ src/{main.tsx,App.tsx}
└─ infra/
   ├─ migrations/         # SQL migrations
   └─ init.sql
```

---

## Environment Variables (`.env.example`)

```
# Shared
NODE_ENV=development
JWT_SECRET=supersecret_change_me
POSTGRES_URL=postgres://exam_user:exam_pass@postgres:5432/exam_db
REDIS_URL=redis://redis:6379
NATS_URL=nats://nats:4222
MINIO_ENDPOINT=minio
MINIO_ACCESS_KEY=minio
MINIO_SECRET_KEY=miniopass
MINIO_BUCKET=exam-artifacts
GATEWAY_PORT=8080
WS_PORT=8090

# Gateway
CORS_ORIGINS=http://localhost:5173,http://localhost:5174
```

Copy to `.env` and adjust.

---

## Docker Compose (root `docker-compose.yml`)

```yaml
version: "3.9"
services:
  postgres:
    image: postgres:16
    environment:
      POSTGRES_DB: exam_db
      POSTGRES_USER: exam_user
      POSTGRES_PASSWORD: exam_pass
    volumes:
      - pgdata:/var/lib/postgresql/data
      - ./infra/init.sql:/docker-entrypoint-initdb.d/init.sql
    ports: ["5432:5432"]

  redis:
    image: redis:7
    ports: ["6379:6379"]

  nats:
    image: nats:2
    command: -js
    ports: ["4222:4222"]

  minio:
    image: minio/minio:RELEASE.2024-06-13T22-53-53Z
    environment:
      MINIO_ROOT_USER: minio
      MINIO_ROOT_PASSWORD: miniopass
    command: server /data --console-address ":9001"
    ports: ["9000:9000","9001:9001"]
    volumes:
      - minio:/data

  gateway:
    build: ./gateway
    env_file: .env
    depends_on: [auth-service]
    ports: ["8080:8080"]

  ws-service:
    build: ./ws-service
    env_file: .env
    depends_on: [redis]
    ports: ["8090:8090"]

  auth-service:
    build: ./services/auth-service
    env_file: .env
    depends_on: [postgres, nats]

  question-service:
    build: ./services/question-service
    env_file: .env
    depends_on: [postgres, nats]

  exam-service:
    build: ./services/exam-service
    env_file: .env
    depends_on: [postgres, nats]

  submission-service:
    build: ./services/submission-service
    env_file: .env
    depends_on: [postgres, nats]

  proctor-service:
    build: ./services/proctor-service
    env_file: .env
    depends_on: [nats]

  notification-service:
    build: ./services/notification-service
    env_file: .env
    depends_on: [nats]

volumes:
  pgdata:
  minio:
```

---

## API Gateway (Express) — `gateway/src/index.js`

```js
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes.js';
import { authGuard } from './authMiddleware.js';

const app = express();
app.use(cors({ origin: (process.env.CORS_ORIGINS||'').split(','), credentials: true }));
app.use(express.json());
app.use(morgan('dev'));

// Health
app.get('/health', (_, res) => res.json({ ok: true }));

// Public routes
app.use('/auth', routes.auth);

// Protected routes
app.use('/questions', authGuard(['admin']), routes.questions);
app.use('/exams', authGuard(['admin']), routes.examsAdmin);
app.use('/exam', authGuard(['student','admin']), routes.examsStudent);
app.use('/submissions', authGuard(['student','admin']), routes.submissions);

const port = process.env.GATEWAY_PORT || 8080;
app.listen(port, () => console.log(`API Gateway on :${port}`));
```

### `gateway/src/authMiddleware.js`

```js
import jwt from 'jsonwebtoken';

export const authGuard = (roles = []) => (req, res, next) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'No token' });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    if (roles.length && !roles.includes(payload.role)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  } catch (e) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
```

### `gateway/src/routes.js`

```js
import { Router } from 'express';
import proxy from 'express-http-proxy';

const r = {
  auth: Router(),
  questions: Router(),
  examsAdmin: Router(),
  examsStudent: Router(),
  submissions: Router(),
};

// proxy helpers
const svc = (url) => proxy(url, { proxyReqPathResolver: req => req.originalUrl.replace(/^\/[^/]+/, '') });

r.auth.use(svc('http://auth-service:3000'));
r.questions.use(svc('http://question-service:3002'));
r.examsAdmin.use(svc('http://exam-service:3003/admin'));
r.examsStudent.use(svc('http://exam-service:3003/student'));
r.submissions.use(svc('http://submission-service:3004'));

export default r;
```

---

## Common Patterns (for each service)

**Base server**

```js
import express from 'express';
import morgan from 'morgan';
import pkg from 'pg';
import { connectNats, publish } from './nats.js';

const app = express();
app.use(express.json());
app.use(morgan('tiny'));

export const db = new pkg.Pool({ connectionString: process.env.POSTGRES_URL });
await connectNats();

app.get('/health', (_, res) => res.json({ ok: true }));

export default app;
```

\*\*NATS utility — \*\*``

```js
import { connect, StringCodec } from 'nats';
const sc = StringCodec();
let nc;
export async function connectNats(){
  nc = await connect({ servers: process.env.NATS_URL });
}
export function publish(topic, data){
  return nc.publish(topic, sc.encode(JSON.stringify(data)));
}
export function subscribe(topic, handler){
  const sub = nc.subscribe(topic);
  (async () => {
    for await (const m of sub) handler(JSON.parse(sc.decode(m.data)));
  })();
}
```

---

## Auth Service — `services/auth-service/src/index.js`

```js
import app, { db } from '../../common/src/base.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

app.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body; // role: 'student'|'admin'
  const hash = await bcrypt.hash(password, 10);
  await db.query('INSERT INTO users(name,email,pass_hash,role) VALUES($1,$2,$3,$4)', [name,email,hash,role||'student']);
  res.status(201).json({ ok: true });
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const { rows } = await db.query('SELECT id,pass_hash,role,name FROM users WHERE email=$1', [email]);
  if (!rows[0]) return res.status(401).json({ error: 'Invalid' });
  const ok = await bcrypt.compare(password, rows[0].pass_hash);
  if (!ok) return res.status(401).json({ error: 'Invalid' });
  const token = jwt.sign({ uid: rows[0].id, role: rows[0].role, name: rows[0].name }, process.env.JWT_SECRET, { expiresIn: '8h' });
  res.json({ token });
});

const port = 3000; app.listen(port, () => console.log('auth on', port));
```

### Minimal Schema — `infra/init.sql`

```sql
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  pass_hash TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('student','admin')),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS questions (
  id SERIAL PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('mcq','msq','short','long','code')),
  body JSONB NOT NULL,        -- {prompt, options, answerKey, points}
  tags TEXT[] DEFAULT '{}',
  created_by INT REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS exams (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  config JSONB NOT NULL,      -- {durationMin, shuffle, negativeMarking, windowLock}
  sections JSONB NOT NULL,    -- [{title, questionIds: [..]}]
  created_by INT REFERENCES users(id),
  starts_at TIMESTAMPTZ,
  ends_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS submissions (
  id SERIAL PRIMARY KEY,
  exam_id INT REFERENCES exams(id),
  student_id INT REFERENCES users(id),
  answers JSONB NOT NULL,     -- {questionId: {answer, timeSpent}}
  score NUMERIC,
  status TEXT NOT NULL DEFAULT 'in_progress',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX ON submissions (exam_id, student_id);
```

---

## Question Service — `services/question-service/src/index.js`

```js
import app, { db } from '../../common/src/base.js';

app.post('/questions', async (req, res) => {
  const { type, body, tags, created_by } = req.body;
  const { rows } = await db.query(
    'INSERT INTO questions(type, body, tags, created_by) VALUES($1,$2,$3,$4) RETURNING *',
    [type, body, tags||[], created_by]
  );
  res.status(201).json(rows[0]);
});

app.get('/questions', async (req, res) => {
  const { rows } = await db.query('SELECT * FROM questions ORDER BY id DESC LIMIT 100');
  res.json(rows);
});

const port = 3002; app.listen(port, () => console.log('questions on', port));
```

---

## Exam Service — Admin + Student routes

`services/exam-service/src/index.js`

```js
import app, { db } from '../../common/src/base.js';

// Admin routes (mounted under /admin by gateway)
app.post('/admin/exams', async (req, res) => {
  const { title, config, sections, created_by, schedule } = req.body;
  const { rows } = await db.query(
    'INSERT INTO exams(title, config, sections, created_by, starts_at, ends_at) VALUES($1,$2,$3,$4,$5,$6) RETURNING *',
    [title, config, sections, created_by, schedule?.start, schedule?.end]
  );
  res.status(201).json(
```
