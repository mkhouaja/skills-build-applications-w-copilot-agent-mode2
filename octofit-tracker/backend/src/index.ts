import express from 'express';
import mongoose from 'mongoose';
import apiRouter from './routes.js';

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;
const CODESPACE_NAME = process.env.CODESPACE_NAME;
const API_BASE_URL = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.githubpreview.dev/api`
  : `http://localhost:${PORT}/api`;
const API_URL = process.env.API_URL ?? API_BASE_URL;
const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://localhost:27017/octofit_db';

app.use(express.json());
app.use('/api', apiRouter);

app.get('/api/config', (_req, res) => {
  res.json({ apiUrl: API_URL, codespaceName: CODESPACE_NAME ?? null });
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', backend: 'OctoFit Tracker' });
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB at', MONGO_URI);
    console.log('OctoFit backend API URL:', API_URL);
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`OctoFit backend running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });
