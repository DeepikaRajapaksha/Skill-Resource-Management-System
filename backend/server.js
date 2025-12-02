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

app.get('/', (req, res) => res.send('Backend Running'));

app.listen(5000, () => console.log("Backend running on port 5000"));
