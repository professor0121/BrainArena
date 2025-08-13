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