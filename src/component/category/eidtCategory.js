import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import AdminLayOut from '../adminLayOut';
import { useNavigate, useParams } from 'react-router-dom';

const EditCategory = () => {
  const [formData, setFormData] = useState({
    ten: '',
    tieu_de: '',
    trang_thai: 'active',
    deleted: 0,
    ngay_tao: '', 

  });
  const navigate = useNavigate();
  const { id_danh_muc } = useParams();

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // Tải dữ liệu danh mục hiện tại
  useEffect(() => {
      console.log('ID danh mục cần sửa:', id_danh_muc); // 👈 kiểm tra ID

    const fetchCategory = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/admin/category/edit-Category/${id_danh_muc}`);
        const data = response.data;
        setFormData({
          ten: data.ten,
          tieu_de: data.tieu_de,
          trang_thai: data.trang_thai,
          deleted: data.deleted,
            ngay_tao: data.ngay_tao, // 👈 thêm dòng này

        });
        if (data.hinh_anh) {
  if (data.hinh_anh.startsWith('http')) {
    setPreview(data.hinh_anh);
  } else {
    setPreview(`http://localhost:3000/uploads/${data.hinh_anh}`);
  }
}
      } catch (error) {
        Swal.fire('Lỗi', 'Không thể tải dữ liệu danh mục', 'error');
      }
    };

    fetchCategory();
  }, [id_danh_muc]);

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
    formDataToSend.append('deleted', formData.deleted);
    formDataToSend.append('ngay_cap_nhat', now);
    formDataToSend.append('ngay_tao', formData.ngay_tao); // 👈 thêm dòng này


    if (image) {
      formDataToSend.append('hinh_anh', image);
    }

    try {
      await axios.post(`http://localhost:3000/admin/category/edit-Category/${id_danh_muc}`, formDataToSend);
      Swal.fire('Thành công', 'Cập nhật danh mục thành công!', 'success');
      navigate('/admin/Category');
    } catch (err) {
      Swal.fire('Lỗi', err.response?.data?.message || 'Không thể cập nhật danh mục', 'error');
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
              <a href="#">Chỉnh sửa danh mục</a>
            </li>
          </ul>
        </div>
        <div className="tile">
          <h3 className="tile-title">Chỉnh sửa danh mục</h3>
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
            <button type="submit" className="btn btn-primary">Cập nhật danh mục</button>
          </form>
        </div>
      </main>
    </>
  );
};

export default EditCategory;
