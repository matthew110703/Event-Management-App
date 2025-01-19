import app from "./app.js";
import dotenv from "dotenv";
// Load Environment Variables
dotenv.config();

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
