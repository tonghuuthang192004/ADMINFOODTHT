import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import AdminLayOut from '../adminLayOut';

const CreateUser = () => {
  const [formData, setFormData] = useState({
    ten: '',
    email: '',
    mat_khau: '',
    so_dien_thoai: '',
    id_vai_tro: 2, // default: user
    trang_thai: 'active',
      deleted: 0,
  });

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
    // const now = new Date().toISOString();

    // const formDataToSend = new FormData();
    // for (let key in formData) {
    //   formDataToSend.append(key, formData[key]);
    // }

    // formDataToSend.append('ngay_tao', now);
    // formDataToSend.append('ngay_cap_nhat', now);
    // formDataToSend.append('deleted', 0);

    // if (image) {
    //   formDataToSend.append('avatar', image);
    // }


     e.preventDefault();
    const now = new Date().toISOString().split('T')[0];

    const formDataToSend = new FormData();
    formDataToSend.append('ten', formData.ten);
    formDataToSend.append('id_vai_tro', formData.id_vai_tro);
    formDataToSend.append('mat_khau', formData.mat_khau);
    formDataToSend.append('so_dien_thoai', formData.so_dien_thoai);
    formDataToSend.append('trang_thai', formData.trang_thai);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('deleted', 0);
    formDataToSend.append('ngay_tao', now);
    formDataToSend.append('ngay_cap_nhat', now);
    if (image) {
      formDataToSend.append('avatar', image);
    }


    try {
      await axios.post('http://localhost:3000/admin/user/create-user', formDataToSend);
      Swal.fire('Thành công', 'Thêm người dùng thành công!', 'success');
      window.location.href ='/admin/IndexUser'

      // Reset
      setFormData({
        ten: '',
        email: '',
        mat_khau: '',
        so_dien_thoai: '',
        id_vai_tro: 2,
        trang_thai: '',
      });
      setImage(null);
      setPreview(null);
    } catch (err) {
      Swal.fire('Lỗi', err.response?.data?.message || 'Không thể thêm người dùng', 'error');
    }
  };

  return (
    <>
      <AdminLayOut />
      <main className="app-content">
        <div className="app-title">
          <ul className="app-breadcrumb breadcrumb">
            <li className="breadcrumb-item">Danh sách người dùng</li>
            <li className="breadcrumb-item">
              <a href="#">Thêm người dùng</a>
            </li>
          </ul>
        </div>
        <div className="tile">
          <h3 className="tile-title">Tạo mới người dùng</h3>
          <form onSubmit={handleSubmit} encType="multipart/form-data" autoComplete="off">
            <div className="form-group">
              <label>Tên người dùng</label>
              <input  type="text"
    name="ten"
    className="form-control"
    value={formData.ten}
    onChange={handleChange}
    required />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Mật khẩu</label>
              <input   type="password"
  name="mat_khau"
  autoComplete="new-password"
  className="form-control"
  value={formData.mat_khau}
  onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Số điện thoại</label>
              <input type="text" name="so_dien_thoai" className="form-control" value={formData.so_dien_thoai} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Ảnh đại diện</label>
              <input type="file" name="avatar" accept="image/*" onChange={handleImageChange} />
              {preview && <img src={preview} alt="avatar" style={{ maxWidth: 200, marginTop: 10 }} />}
            </div>
            <div className="form-group">
              <label>Vai trò</label>
              <select name="id_vai_tro" className="form-control" value={formData.id_vai_tro} onChange={handleChange}>
                <option value={1}>Admin</option>
                <option value={2}>Người dùng</option>
              </select>
            </div>
            <div className="form-group">
              <label>Trạng thái</label>
              <select name="trang_thai" className="form-control" value={formData.trang_thai} onChange={handleChange} required>
          <option value="" disabled>-- Chọn trạng thái --</option>
<option value="active">Hoạt động</option>
<option value="inactive">Vô hiệu</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">Thêm</button>
          </form>
        </div>
      </main>
    </>
  );
};

export default CreateUser;
