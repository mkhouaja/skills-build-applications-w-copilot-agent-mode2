import mongoose from 'mongoose';
import {
  ActivityModel,
  LeaderboardModel,
  TeamModel,
  UserModel,
  WorkoutModel,
} from '../models.js';

const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://localhost:27017/octofit_db';

async function seed() {
  console.log('Seed the octofit_db database with test data');

  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB at', MONGO_URI);

  await Promise.all([
    ActivityModel.deleteMany({}),
    LeaderboardModel.deleteMany({}),
    TeamModel.deleteMany({}),
    UserModel.deleteMany({}),
    WorkoutModel.deleteMany({}),
  ]);

  const users = await UserModel.create([
    { name: 'Avery Chen', email: 'avery.chen@example.com', role: 'member' },
    { name: 'Jordan Patel', email: 'jordan.patel@example.com', role: 'member' },
    { name: 'Riley Kim', email: 'riley.kim@example.com', role: 'coach' },
  ]);

  const teams = await TeamModel.create([
    {
      name: 'Coastal Runners',
      description: 'A team for running and endurance training',
      members: [users[0]._id, users[1]._id],
    },
    {
      name: 'Cardio Crew',
      description: 'High-energy workouts and accountability',
      members: [users[1]._id],
    },
  ]);

  const activities = await ActivityModel.create([
    {
      user: users[0]._id,
      type: 'running',
      durationMinutes: 42,
      caloriesBurned: 390,
      date: new Date('2026-06-14T07:30:00Z'),
    },
    {
      user: users[1]._id,
      type: 'cycling',
      durationMinutes: 55,
      caloriesBurned: 520,
      date: new Date('2026-06-15T09:00:00Z'),
    },
  ]);

  const leaderboard = await LeaderboardModel.create([
    { user: users[1]._id, score: 1540, rank: 1 },
    { user: users[0]._id, score: 1380, rank: 2 },
  ]);

  const workouts = await WorkoutModel.create([
    {
      name: 'Morning HIIT',
      category: 'cardio',
      durationMinutes: 25,
      intensity: 'high',
      description: 'A fast-paced interval training session to jumpstart the day.',
    },
    {
      name: 'Strength Builder',
      category: 'strength',
      durationMinutes: 50,
      intensity: 'medium',
      description: 'A full-body resistance workout for muscle conditioning.',
    },
  ]);

  console.log('Seeded users:', users.length);
  console.log('Seeded teams:', teams.length);
  console.log('Seeded activities:', activities.length);
  console.log('Seeded leaderboard records:', leaderboard.length);
  console.log('Seeded workouts:', workouts.length);

  await mongoose.disconnect();
  console.log('Disconnected from MongoDB.');
}

seed().catch((error) => {
  console.error('Seed script failed:', error);
  process.exit(1);
});
