import app from "./app.js";
import dotenv from "dotenv";
import dbConnect from "./lib/dbConnect.js";

// Load Environment Variables
dotenv.config();

// Database Connection
dbConnect();

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
