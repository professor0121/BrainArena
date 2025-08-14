// import { Router } from 'express';
// import proxy from 'express-http-proxy';

// const r = {
//   auth: Router(),
//   questions: Router(),
//   examsAdmin: Router(),
//   examsStudent: Router(),
//   submissions: Router(),
// };

// // proxy helpers
// const svc = (url) => proxy(url, { proxyReqPathResolver: req => req.originalUrl.replace(/^\/[^/]+/, '') });


// // 3001 gateway
// r.auth.use(svc('http://localhost:3000'));//Auth
// r.questions.use(svc('http://question-service:3002'));
// r.examsAdmin.use(svc('http://localhost:3003/admin'));//exam for admin
// r.examsStudent.use(svc('http://localhost:3003/student'));//exam for student
// r.submissions.use(svc('http://submission-service:3004'));

// export default r;

import { Router } from 'express';
import proxy from 'express-http-proxy';

const r = {
  auth: Router(),
  questions: Router(),
  examsAdmin: Router(),
  examsStudent: Router(),
  submissions: Router(),
};

// Helper to create proxy with path rewriting
const svc = (target, rewriteFn) =>
  proxy(target, {
    proxyReqPathResolver: (req) => rewriteFn(req.originalUrl),
  });

// 3001 gateway mappings
// Auth → direct passthrough
r.auth.use(svc('http://localhost:3000', (url) => url.replace(/^\/auth/, '')));

// Questions → keep clean
r.questions.use(svc('http://localhost:3002', (url) => url.replace(/^\/questions/, '')));

// Exams (admin) → map /exams → /admin
r.examsAdmin.use(svc('http://localhost:3003', (url) => url.replace(/^\/exams/, '/admin')));

// Exams (student) → map /exam → /student
r.examsStudent.use(svc('http://localhost:3003', (url) => url.replace(/^\/exam/, '/student')));

// Submissions → keep clean
r.submissions.use(svc('http://submission-service:3004', (url) => url.replace(/^\/submissions/, '')));

export default r;
