import axios from "axios";

const API = axios.create({
  // Đổi link này thành link Backend trên Vercel của bạn sau khi deploy
  baseURL: "https://link-backend-vercel-cua-ban.app/api",
});

export const getStudents = () => API.get("/students");
export const createStudent = (studentData) =>
  API.post("/students", studentData);
