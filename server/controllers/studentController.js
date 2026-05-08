const StudentPolicy = require("../models/StudentPolicy");

const getAllStudents = async (req, res) => {
  try {
    const students = await StudentPolicy.find().sort({ createdAt: -1 });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Lỗi lấy danh sách: " + error.message });
  }
};

const createStudent = async (req, res) => {
  try {
    const newStudent = new StudentPolicy(req.body);
    const savedStudent = await newStudent.save();
    res.status(201).json({ message: "Thêm thành công!", data: savedStudent });
  } catch (error) {
    if (error.code === 11000)
      return res.status(400).json({ message: "Mã Sinh viên đã tồn tại!" });
    res.status(400).json({ message: "Lỗi thêm mới: " + error.message });
  }
};

module.exports = { getAllStudents, createStudent };
