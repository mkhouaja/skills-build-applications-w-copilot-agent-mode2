import express from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;
const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://localhost:27017/octofit';

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', backend: 'OctoFit Tracker' });
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB at', MONGO_URI);
    app.listen(PORT, () => {
      console.log(`OctoFit backend running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });
