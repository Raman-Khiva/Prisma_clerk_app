import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import clerkAuth from "./middlewares/auth.middleware.js";
import userRouter from "./routes/user.route.js";

dotenv.config();

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "server responsed successfully",
    health: "100%",
  });
});

app.use("/api/user", clerkAuth, userRouter);
const port = process.env.PORT || 4000;

app.listen(5000, "0.0.0.0", () => {
  console.log("server is running on port ", port);
  console.info("DATABASE_URL", process.env.DATABASE_URL);
});
