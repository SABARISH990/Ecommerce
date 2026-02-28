const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const connectDatabase = require('./config/connectDatabase');
const cors = require('cors');

const app = express();

// Load env
dotenv.config({ path: path.join(__dirname, "config", "config.env") });

// Connect DB
connectDatabase();

// Middleware
app.use(express.json());
app.use(cors());


// Routes
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");

app.use("/api/v1", productRoutes);
app.use("/api/v1", orderRoutes);

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
