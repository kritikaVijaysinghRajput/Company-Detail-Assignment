// Import required modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const companyRoutes = require("./routes/companyRoutes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(cors());

app.use("/companies", companyRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
