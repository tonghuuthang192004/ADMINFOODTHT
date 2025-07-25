import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import AdminLayOut from '../adminLayOut';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const CreateCategory = () => {
  const [formData, setFormData] = useState({
    ten: '',
    tieu_de: '',
    trang_thai: 'active',
    deleted: 0,
  });
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const now = new Date().toISOString().split('T')[0];

    const formDataToSend = new FormData();
    formDataToSend.append('ten', formData.ten);
    formDataToSend.append('tieu_de', formData.tieu_de);
    formDataToSend.append('trang_thai', formData.trang_thai);
    formDataToSend.append('deleted', 0);
    formDataToSend.append('ngay_tao', now);
    formDataToSend.append('ngay_cap_nhat', now);

    if (image) {
      formDataToSend.append('hinh_anh', image);
    }

    try {
      await axios.post('http://localhost:3000/admin/category/create-Category', formDataToSend);
      Swal.fire('Thành công', 'Thêm danh mục thành công!', 'success');
       navigate('/admin/Category');
      // Reset form
      setFormData({
        ten: '',
        tieu_de: '',
        trang_thai: 'active',
        deleted: 0,
      });
      setImage(null);
      setPreview(null);
    } catch (err) {
      Swal.fire('Lỗi', err.response?.data?.message || 'Không thể thêm danh mục', 'error');
    }
  };

  return (
    <>
      <AdminLayOut />
      <main className="app-content">
        <div className="app-title">
          <ul className="app-breadcrumb breadcrumb">
            <li className="breadcrumb-item">Danh sách danh mục</li>
            <li className="breadcrumb-item">
              <a href="#">Thêm danh mục</a>
            </li>
          </ul>
        </div>
        <div className="tile">
          <h3 className="tile-title">Tạo mới danh mục</h3>
          <form onSubmit={handleSubmit} encType="multipart/form-data" autoComplete="off">
            <div className="form-group">
              <label>Tên danh mục</label>
              <input
                type="text"
                name="ten"
                className="form-control"
                value={formData.ten}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Tiêu đề</label>
              <input
                type="text"
                name="tieu_de"
                className="form-control"
                value={formData.tieu_de}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Hình ảnh</label>
              <input
                type="file"
                name="hinh_anh"
                accept="image/*"
                onChange={handleImageChange}
              />
              {preview && <img src={preview} alt="Hình ảnh" style={{ maxWidth: 200, marginTop: 10 }} />}
            </div>
            <div className="form-group">
              <label>Trạng thái</label>
              <select
                name="trang_thai"
                className="form-control"
                value={formData.trang_thai}
                onChange={handleChange}
                required
              >
                <option value="active">Hoạt động</option>
                <option value="inactive">Vô hiệu</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">Thêm danh mục</button>
          </form>
        </div>
      </main>
    </>
  );
};

export default CreateCategory;
