import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import personnelRoutes from './routes/personnelRoutes.js';
import skillsRoutes from './routes/skillsRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import matchRoutes from './routes/matchRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/personnel", personnelRoutes);
app.use("/api/skills", skillsRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/match", matchRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Backend API running...");
});

export default app;
