import http from 'http';

import app from './src/app.js';

const server=http.createServer(app);

server.listen(process.env.PORT,()=>{
    console.log("auth routes are running ",process.env.PORT)
})