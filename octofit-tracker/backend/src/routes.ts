import { Router } from 'express';
import {
  ActivityModel,
  LeaderboardModel,
  TeamModel,
  UserModel,
  WorkoutModel,
} from './models.js';

const router = Router();

router.get('/users', async (_req, res) => {
  try {
    const users = await UserModel.find().lean();
    res.json({ users });
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch users' });
  }
});

router.get('/teams', async (_req, res) => {
  try {
    const teams = await TeamModel.find().lean();
    res.json({ teams });
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch teams' });
  }
});

router.get('/activities', async (_req, res) => {
  try {
    const activities = await ActivityModel.find().lean();
    res.json({ activities });
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch activities' });
  }
});

router.get('/leaderboard', async (_req, res) => {
  try {
    const leaderboard = await LeaderboardModel.find().lean();
    res.json({ leaderboard });
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch leaderboard data' });
  }
});

router.get('/workouts', async (_req, res) => {
  try {
    const workouts = await WorkoutModel.find().lean();
    res.json({ workouts });
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch workouts' });
  }
});

export default router;
