import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes";
import healthRoutes from "./routes/health.routes";
import companyRoutes from "./routes/company.routes";
import ledgerRoutes from "./routes/ledger.routes";
import groupRoutes from "./routes/group.routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/health", healthRoutes);
app.use("/api/ledger", ledgerRoutes);
app.use("/api/groups", groupRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "SmartERP Backend Running"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});