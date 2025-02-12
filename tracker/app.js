import express from 'express';
import {PORT} from './config/env.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';  
import subscriptionRouter from './routes/subscription.routes.js'; 

const app = express();

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/subscriptions', subscriptionRouter);

app.listen(PORT, () => { 
    console.log(`Server is running on http://localhost:${PORT}`);
    });

export default app;