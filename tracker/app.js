import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World');
    });

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => { 
    console.log(`Server is running on http://localhost:${PORT}`);
    });

export default app;