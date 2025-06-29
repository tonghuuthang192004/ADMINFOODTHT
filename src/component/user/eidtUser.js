import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayOut from '../adminLayOut';

const EditUser = () => {
  const { id_nguoi_dung } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    ten: '',
    email: '',
    mat_khau: '',
    so_dien_thoai: '',
    id_vai_tro: 2,
    trang_thai: 'active',
    avatar: null,      // có thể là File hoặc string url
    avatar_cu: '',     // lưu tên ảnh cũ
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/admin/user/edit-user/${id_nguoi_dung}`);
        const data = res.data;

        setUser({
          ten: data.ten,
          email: data.email,
          mat_khau: '',
          so_dien_thoai: data.so_dien_thoai,
          id_vai_tro: data.id_vai_tro,
          trang_thai: data.trang_thai,
          avatar: data.avatar,    // string ảnh cũ
          avatar_cu: data.avatar, // lưu lại ảnh cũ
        });
      } catch (err) {
        Swal.fire('Lỗi', 'Không thể tải dữ liệu người dùng', 'error');
      }
    };
    fetchUser();
  }, [id_nguoi_dung]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUser(prev => ({ ...prev, avatar: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('ten', user.ten);
    formDataToSend.append('email', user.email);
    if (user.mat_khau) formDataToSend.append('mat_khau', user.mat_khau);
    formDataToSend.append('so_dien_thoai', user.so_dien_thoai);
    formDataToSend.append('id_vai_tro', user.id_vai_tro);
    formDataToSend.append('trang_thai', user.trang_thai);

      const now = new Date().toISOString();  // ví dụ: '2025-06-26T10:20:30.000Z'
  formDataToSend.append('ngay_cap_nhat', now);

    if (user.avatar instanceof File) {
      formDataToSend.append('avatar', user.avatar);
    } else {
      formDataToSend.append('avatar_cu', user.avatar_cu || '');
    }

    try {
      await axios.post(`http://localhost:3000/admin/user/edit-user/${id_nguoi_dung}`, formDataToSend);
      Swal.fire('Thành công', 'Cập nhật người dùng thành công!', 'success').then(() => {
window.location.href = '/admin/IndexUser';
});
     
    } catch (err) {
      Swal.fire('Lỗi', err.response?.data?.message || 'Không thể cập nhật người dùng', 'error');
    }
  };

  return (
    <>
      <AdminLayOut />
      <main className="app-content">
        <div className="app-title">
          <ul className="app-breadcrumb breadcrumb">
            <li className="breadcrumb-item">Danh sách người dùng</li>
            <li className="breadcrumb-item"><a href="#">Chỉnh sửa người dùng</a></li>
          </ul>
        </div>

        <div className="tile">
          <h3 className="tile-title">Chỉnh sửa người dùng</h3>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="form-group">
              <label>Tên người dùng</label>
              <input
                type="text"
                name="ten"
                className="form-control"
                value={user.ten}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={user.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* <div className="form-group">
              <label>Mật khẩu mới (nếu đổi)</label>
              <input
                type="hidden"
                name="mat_khau"
                className="form-control"
                value={user.mat_khau}
                onChange={handleChange}
              />
            </div> */}

            <div className="form-group">
              <label>Số điện thoại</label>
              <input
                type="text"
                name="so_dien_thoai"
                className="form-control"
                value={user.so_dien_thoai}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Ảnh đại diện</label>
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={handleFileChange}
              />
              {user.avatar && (
                <div>
                  <img
                    src={
                      typeof user.avatar === 'string' && user.avatar.startsWith('http')
                        ? user.avatar
                        : user.avatar instanceof File
                        ? URL.createObjectURL(user.avatar)
                        : `http://localhost:3000/uploads/${user.avatar}`
                    }
                    alt={user.ten}
                    width="100"
                    style={{ marginTop: 10 }}
                  />
                </div>
              )}
            </div>

            <div className="form-group">
              <label>Vai trò</label>
              <select
                name="id_vai_tro"
                className="form-control"
                value={user.id_vai_tro}
                onChange={handleChange}
              >
                <option value={1}>Admin</option>
                <option value={2}>Người dùng</option>
              </select>
            </div>

            <div className="form-group">
              <label>Trạng thái</label>
              <select
                name="trang_thai"
                className="form-control"
                value={user.trang_thai}
                onChange={handleChange}
              >
                <option value="active">Hoạt động</option>
                <option value="inactive">Vô hiệu</option>
              </select>
            </div>

            <button type="submit" className="btn btn-success mt-3">
              Cập nhật
            </button>
          </form>
        </div>
      </main>
    </>
  );
};

export default EditUser;
