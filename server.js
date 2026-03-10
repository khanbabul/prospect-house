import express from 'express';
import dotenv from 'dotenv';
import sendEstimateHandler from './api/send-estimate.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static('.')); // Serves index.html, assets, etc.

// Route the local fetch request to the handler
app.post('/api/send-estimate', sendEstimateHandler);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});