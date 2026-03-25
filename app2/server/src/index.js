import express from "express";
import cors from "cors";
import prisma from "./config/prisma.js";

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server reached successfully",
    health: "100%",
  });
});
app.post("/api/test/add", async (req, res) => {
  try {
    const { test } = req.body;
    const testObj = await prisma.test.create({
      data: {
        projectName: test.projectName,
      },
    });
    res.status(200).json({
      success: true,
      message: "Test created successfully",
      test: testObj,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error creating test",
      error: err.message,
    });
  }
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
