import dotenv from "dotenv";
dotenv.config();

import express from "express";
import path from "path";

import app from "./app";

import dashboardRoutes from "./routes/dashboardRoutes";

app.use(
  "/uploads",
  express.static(
    path.join(
      process.cwd(),
      "uploads"
    )
  )
);

app.use(
  "/api/dashboard",
  dashboardRoutes
);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});