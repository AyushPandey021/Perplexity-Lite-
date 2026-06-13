import app from "./app.js";
import connectDatabase from "./src/config/database.js";
import {testAi} from "./src/services/ai.service.js";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 5000;
testAi()
const startServer = async () => {
  try {
    await connectDatabase();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
