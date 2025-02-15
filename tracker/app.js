import express from 'express';
import {PORT} from './config/env.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';  
import subscriptionRouter from './routes/subscription.routes.js'; 
import connectToDB from './database/mongodb.js';

const app = express();

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);

app.listen(PORT, async () => { 
    console.log(`Server is running on http://localhost:${PORT}`);
    await connectToDB();

    });

export default app;