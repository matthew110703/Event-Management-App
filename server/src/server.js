import app from "./app.js";
import dotenv from "dotenv";
import dbConnect from "./lib/dbConnect.js";
import cors from "cors";

// Load Environment Variables
dotenv.config();

// CORS
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));

// Database Connection
dbConnect();

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
