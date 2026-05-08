import axios from "axios";

const API = axios.create({
  // Thay link mới của bạn vào đây
  baseURL: "https://hssvbackend.vercel.app/api",
});

export const getStudents = () => API.get("/students");
export const createStudent = (studentData) =>
  API.post("/students", studentData);
