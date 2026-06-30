import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes";
import healthRoutes from "./routes/health.routes";
import companyRoutes from "./routes/company.routes";
import ledgerRoutes from "./routes/ledger.routes";
import groupRoutes from "./routes/group.routes";
import categoryRoutes from "./routes/category.routes";
import unitRoutes from "./routes/unit.routes";
import productRoutes from "./routes/product.routes";
import purchaseRoutes from "./routes/purchase.routes";
import salesRoutes from "./routes/sales.routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/health", healthRoutes);
app.use("/api/ledger", ledgerRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/units", unitRoutes);
app.use("/api/products", productRoutes);
app.use("/api/purchase", purchaseRoutes);
app.use("/api/sales", salesRoutes);

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