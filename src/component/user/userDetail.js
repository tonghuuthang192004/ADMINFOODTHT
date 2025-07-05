import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import AppHeader from '../utils/header/header';
import Sidebar from '../utils/sidebar/sidebar';

function UserDetail() {
  const { id_nguoi_dung } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  console.log('Fetching user with id:', id_nguoi_dung);
  setLoading(true);
  setUser(null);  // reset user mỗi khi id đổi
  fetch(`http://localhost:3000/admin/user/user-detail/${id_nguoi_dung}`)
    .then(res => res.json())
    .then(data => {
      setUser(data.user || data);
      setLoading(false);
    })
    .catch(() => {
      setUser(null);
      setLoading(false);
    });
}, [id_nguoi_dung]);

  if (loading) return <p>Đang tải chi tiết người dùng...</p>;
  if (!user) return <p>Không tìm thấy người dùng</p>;

  return (
    <>
      <AppHeader />
      <Sidebar />

      <div className="container mt-4 container-detail">
        <a href="/admin/IndexUser" className="btn btn-secondary mb-3">← Quay lại danh sách</a>
        <h2>Chi Tiết Người Dùng</h2>
        <div className="row">
          <div className="col-md-4">
            <img
              src={
                user.avatar?.startsWith('http')
                  ? user.avatar
                  : `http://localhost:3000/uploads/${user.avatar}`
              }
              alt={user.ten}
              className="img-fluid"
              style={{ borderRadius: '50%', width: '200px', height: '200px', objectFit: 'cover' }}
            />
          </div>
          <div className="col-md-8">
            <p><strong>ID:</strong> {user.id_nguoi_dung}</p>
            <p><strong>Tên:</strong> {user.ten}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Số điện thoại:</strong> {user.so_dien_thoai}</p>
            <p><strong>Vai trò:</strong> {user.id_vai_tro === 1 ? 'Admin' : 'Người dùng'}</p>
            <p><strong>Trạng thái:</strong> {user.trang_thai === 'active' ? 'Hoạt động' : 'Vô hiệu'}</p>
          <p><strong>Ngày Chỉnh Sửa:</strong> {user.ngay_chinh_sua ? new Date(user.ngay_cap_nhat).toLocaleString() : 'Chưa cập nhật'}</p>

            <p><strong>Ngày tạo:</strong> {new Date(user.ngay_tao).toLocaleDateString()}</p>

            <Link to={`/admin/edit-user/${user.id_nguoi_dung}`} className="btn btn-primary">
              <i className="fas fa-edit"></i> Chỉnh sửa
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserDetail;
