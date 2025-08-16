import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes/route.js';
import { authGuard } from './middlewares/auth.middleware.js';

const app = express();
app.use(cors({ origin: (process.env.CORS_ORIGINS||'').split(','), credentials: true }));
app.use(express.json());
app.use(morgan('dev'));

// Health
app.get('/health', (_, res) => res.json({ ok: true }));

// Public routes
app.use('/auth', routes.auth);

// Protected routes
app.use('/questions', routes.questions);
// app.use('/questions', authGuard(['admin']), routes.questions);
app.use('/exams', routes.examsAdmin);
// app.use('/exams', authGuard(['admin']), routes.examsAdmin);
app.use('/exam', routes.examsStudent);
// app.use('/exam', authGuard(['student','admin']), routes.examsStudent);
app.use('/submissions', routes.submissions);
// app.use('/submissions', authGuard(['student','admin']), routes.submissions);

export default app;

