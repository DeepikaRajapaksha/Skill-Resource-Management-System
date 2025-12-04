const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Import routes
app.use("/api/auth", require("./routes/auth"));

// Routes
const personnelRoutes = require('./routes/personnel');
app.use('/api/personnel', personnelRoutes);
const skillsRoutes = require('./routes/skills');
app.use('/api/skills', skillsRoutes);
const personnelSkillsRoutes = require('./routes/personnelSkills');
app.use('/api/personnel-skills', personnelSkillsRoutes);
app.get('/', (req, res) => res.send('Backend Running'));

app.listen(5000, () => console.log("Backend running on port 5000"));
