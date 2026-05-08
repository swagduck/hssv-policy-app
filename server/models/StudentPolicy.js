const mongoose = require("mongoose");

const studentPolicySchema = new mongoose.Schema(
  {
    studentId: { type: String, required: true, unique: true, trim: true },
    fullName: { type: String, required: true, trim: true },
    className: { type: String, required: true },
    policyType: { type: String, required: true },
    benefitLevel: { type: String, required: true },
    status: {
      type: String,
      enum: ["Đang học", "Thôi học", "Nghỉ học tạm thời", "Chuyển lớp"],
      default: "Đang học",
    },
    effectiveDate: { type: Date },
    decisionNumber: { type: String, default: "" },
    processingStatus: {
      type: String,
      enum: ["Chưa xử lý", "Đã dừng chi trả", "Đã cập nhật mức mới"],
      default: "Chưa xử lý",
    },
    updatedBy: { type: String },
    note: { type: String, default: "" },
    autoReconciliation: {
      type: String,
      enum: ["Khớp", "Sai lệch", "Chưa đối chiếu"],
      default: "Khớp",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("StudentPolicy", studentPolicySchema);
