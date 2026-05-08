const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
const studentRoutes = require("./routes/studentRoutes");
app.use("/api/students", studentRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({
    message: "🚀 Hệ thống API Quản lý Chính sách HSSV đang hoạt động!",
  });
});

// Kết nối MongoDB
const MONGO_URI = process.env.MONGO_URI;
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ Đã kết nối MongoDB!"))
  .catch((error) => console.error("❌ Lỗi kết nối MongoDB:", error.message));

// Chạy local nếu không ở môi trường production
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`📡 Server đang chạy tại http://localhost:${PORT}`);
  });
}

// Bắt buộc cho Vercel Serverless
module.exports = app;
