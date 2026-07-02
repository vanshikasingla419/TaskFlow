const express = require('express');
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(cors());
const connectDB = require("./config/db");
const taskRoutes = require('./routes/taskRoutes');
app.use(express.json());
connectDB();

app.get('/', (req, res) => {
    res.send('welcome to taskflow api');
});

app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "TaskFlow API is running"
    });
});

app.use("/tasks", taskRoutes);
const userRoutes = require("./routes/userRoutes");
app.use("/users", userRoutes);
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});