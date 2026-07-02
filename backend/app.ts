import express from "express";
import cors from "cors";
import path from "path";

import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import partnerRoutes from "./routes/partnerRoutes";
import offerRoutes from "./routes/offerRoutes";
import campaignRoutes from "./routes/campaignRoutes";
import reportRoutes from "./routes/reportRoutes";
import adminRoutes from "./routes/adminRoutes";
import employeeRoutes from "./routes/employeeRoutes";
import clientRoutes from "./routes/clientRoutes";
import profileRoutes from "./routes/profileRoutes";
import twoFactorRoutes from "./routes/twoFactorRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";
import analyticsRoutes from "./routes/analyticsRoutes";

const app = express();

app.use(cors());

app.use(
  "/uploads",
  express.static(
    path.resolve(
      process.cwd(),
      "uploads"
    )
  )
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/partners", partnerRoutes);
app.use("/api/offers", offerRoutes);
app.use("/api/campaigns", campaignRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/admins", adminRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/clients", clientRoutes);
app.use(
  "/api/two-factor",
  twoFactorRoutes
);

app.use(
  "/api/dashboard",
  dashboardRoutes
);

app.use(
  "/api/analytics",
  analyticsRoutes
);

app.get("/", (_, res) => {
  res.json({
    message: "GN Alliances Backend Running",
  });
});

export default app;