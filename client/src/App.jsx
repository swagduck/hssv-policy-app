import React, { useState, useEffect } from 'react';
import { getStudents, createStudent } from './services/api';

function App() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    studentId: '', fullName: '', className: '', policyType: 'Hộ nghèo',
    benefitLevel: 'Miễn 100%', status: 'Đang học', effectiveDate: '',
    decisionNumber: '', processingStatus: 'Chưa xử lý', updatedBy: '',
    note: '', autoReconciliation: 'Khớp'
  });

  useEffect(() => { fetchStudents(); }, []);

  const fetchStudents = async () => {
    try {
      const { data } = await getStudents();
      setStudents(data);
    } catch (error) { console.error("Lỗi lấy dữ liệu:", error); }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createStudent(formData);
      fetchStudents(); 
      setFormData({ 
        ...formData, studentId: '', fullName: '', className: '',
        effectiveDate: '', decisionNumber: '', updatedBy: '', note: ''
      }); 
    } catch (error) {
      alert('Lỗi: Mã SV đã tồn tại hoặc thiếu thông tin!');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const inputClass = "w-full px-3 py-2.5 sm:px-4 sm:py-2 text-sm md:text-base border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white";

  return (
    <div className="min-h-screen p-3 sm:p-6 lg:p-8 font-sans text-slate-800 bg-slate-50">
      
      <div className="mb-6 md:mb-8 text-center md:text-left">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Hệ Thống Số Hóa Quản Lý Chính Sách
        </h1>
        <p className="text-sm md:text-base text-slate-500 mt-2">Dữ liệu liên thông thời gian thực giữa HSSV và Phòng Chính sách</p>
      </div>
      
      <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-sm border border-slate-200 mb-6 md:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center mb-5 md:mb-6">
          <div className="flex items-center">
            <div className="bg-blue-100 p-2 rounded-lg mr-3">
              <svg className="w-5 h-5 md:w-6 md:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
            </div>
            <h2 className="text-lg md:text-xl font-bold text-slate-800">Thêm / Cập nhật Hồ sơ</h2>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          <input name="studentId" placeholder="Mã SV (*)" value={formData.studentId} onChange={handleInputChange} required className={inputClass}/>
          <input name="fullName" placeholder="Họ và tên (*)" value={formData.fullName} onChange={handleInputChange} required className={inputClass}/>
          <input name="className" placeholder="Lớp / Khóa (*)" value={formData.className} onChange={handleInputChange} required className={inputClass}/>
          
          <select name="policyType" value={formData.policyType} onChange={handleInputChange} className={inputClass}>
            <option value="Hộ nghèo">Hộ nghèo</option>
            <option value="Cận nghèo">Cận nghèo</option>
            <option value="Dân tộc thiểu số">Dân tộc thiểu số</option>
            <option value="Mồ côi">Mồ côi</option>
            <option value="Con TB/LS">Con TB/LS</option>
          </select>
          
          <input name="benefitLevel" placeholder="Mức hưởng (VD: Miễn 100%)" value={formData.benefitLevel} onChange={handleInputChange} required className={inputClass}/>
          
          <select name="status" value={formData.status} onChange={handleInputChange} className={inputClass}>
            <option value="Đang học">Đang học</option>
            <option value="Thôi học">Thôi học</option>
            <option value="Nghỉ học tạm thời">Nghỉ học tạm thời</option>
            <option value="Chuyển lớp">Chuyển lớp</option>
          </select>
          
          <input type="date" name="effectiveDate" title="Ngày hiệu lực" value={formData.effectiveDate} onChange={handleInputChange} className={inputClass}/>
          <input name="decisionNumber" placeholder="Số Quyết định" value={formData.decisionNumber} onChange={handleInputChange} className={inputClass}/>

          <select name="processingStatus" value={formData.processingStatus} onChange={handleInputChange} className={inputClass}>
            <option value="Chưa xử lý">Chưa xử lý</option>
            <option value="Đã dừng chi trả">Đã dừng chi trả</option>
            <option value="Đã cập nhật mức mới">Đã cập nhật mức mới</option>
          </select>
          
          <input name="updatedBy" placeholder="Người cập nhật" value={formData.updatedBy} onChange={handleInputChange} className={inputClass}/>
          <input name="note" placeholder="Ghi chú" value={formData.note} onChange={handleInputChange} className={inputClass}/>
          
          <select name="autoReconciliation" value={formData.autoReconciliation} onChange={handleInputChange} className={`${inputClass} font-semibold ${formData.autoReconciliation === 'Sai lệch' ? 'text-red-600 bg-red-50 border-red-200' : 'text-emerald-600 bg-emerald-50 border-emerald-200'}`}>
            <option value="Khớp">Khớp</option>
            <option value="Sai lệch">Sai lệch</option>
            <option value="Chưa đối chiếu">Chưa đối chiếu</option>
          </select>

          <button type="submit" className="col-span-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 sm:py-3.5 px-6 rounded-xl shadow-md shadow-blue-500/30 transition-all duration-200 flex justify-center items-center text-sm md:text-base">
            💾 Lưu Dữ Liệu
          </button>
        </form>
      </div>

      <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-slate-200 overflow-hidden relative">
        <div className="p-4 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:justify-between sm:items-center bg-slate-50/50 gap-3">
          <h3 className="text-base md:text-lg font-bold text-slate-800">Bảng theo dõi điện tử</h3>
          <span className="bg-blue-100 text-blue-700 py-1.5 px-4 rounded-full text-xs md:text-sm font-semibold inline-block w-max">
            Tổng: {students.length} hồ sơ
          </span>
        </div>
        
        <div className="md:hidden px-4 py-2 bg-amber-50 border-b border-amber-100 text-amber-700 text-xs italic flex items-center justify-center">
          <svg className="w-4 h-4 mr-1 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg>
          Vuốt ngang bảng để xem đầy đủ thông tin
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full text-left text-xs sm:text-sm whitespace-nowrap min-w-[1000px]">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 sm:px-6 py-3 sm:py-4 font-semibold sticky left-0 bg-slate-50 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">Mã SV</th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 font-semibold">Họ và tên</th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 font-semibold">Lớp</th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 font-semibold">Diện CS</th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 font-semibold">Tình trạng</th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 font-semibold">Trạng thái xử lý</th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 font-semibold">Đối chiếu</th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 font-semibold">Chi tiết khác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {students.map((sv) => (
                <tr key={sv._id} className={`hover:bg-slate-50 transition-colors ${sv.autoReconciliation === 'Sai lệch' ? 'bg-red-50/50' : ''}`}>
                  <td className={`px-4 sm:px-6 py-3 sm:py-4 font-bold text-slate-900 sticky left-0 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] ${sv.autoReconciliation === 'Sai lệch' ? 'bg-red-50' : 'bg-white'}`}>
                    {sv.studentId}
                  </td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4">{sv.fullName}</td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-slate-500">{sv.className}</td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 font-medium">{sv.policyType}</td>
                  
                  <td className="px-4 sm:px-6 py-3 sm:py-4">
                    <span className={`px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold ${
                      sv.status === 'Đang học' ? 'bg-emerald-100 text-emerald-700' : 
                      sv.status === 'Thôi học' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {sv.status}
                    </span>
                  </td>

                  <td className="px-4 sm:px-6 py-3 sm:py-4">
                    <span className={`px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold ${
                      sv.processingStatus === 'Chưa xử lý' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {sv.processingStatus}
                    </span>
                  </td>

                  <td className={`px-4 sm:px-6 py-3 sm:py-4 font-bold ${sv.autoReconciliation === 'Khớp' ? 'text-emerald-600' : 'text-red-600'}`}>
                    {sv.autoReconciliation}
                  </td>
                  
                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-[11px] sm:text-xs text-slate-500">
                    <div>Mức: <span className="font-semibold text-slate-700">{sv.benefitLevel}</span></div>
                    <div>Ngày HL: {formatDate(sv.effectiveDate)}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  );
}

export default App;