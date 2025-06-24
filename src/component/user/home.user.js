import React, { useEffect, useState } from 'react';
import Clock from '../clock';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Swal from 'sweetalert2';
import { FaEye } from 'react-icons/fa';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [bulkAction, setBulkAction] = useState('active');
  const [message, setMessage] = useState('');
  const [filters, setFilters] = useState({ status: '', search: '', page: 1 });
const [totalPages, setTotalPages] = useState(1);

  // Load danh sách người dùng theo filter
  useEffect(() => {
    setLoading(true);
      const params = new URLSearchParams();
      
  if (filters.search) params.append('search', filters.search);
  if (filters.status) params.append('status', filters.status);
  params.append('page', filters.page);


    fetch(`http://localhost:3000/admin/user?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        setUsers(data);
              setTotalPages(data.totalPages); // tổng số trang

        setSelectedUsers([]);
        setLoading(false);
      })
      .catch(error => {
        console.error('Lỗi lấy danh sách người dùng:', error);
        setLoading(false);
      });
  }, [filters]);

  const handleStatusChange = async (id, currentStatus) => {
    try {
      const res = await fetch(`http://localhost:3000/admin/user/change-status/${currentStatus}/${id}`, { method: 'PUT' });
      const data = await res.json();
      if (data.success) setFilters(prev => ({ ...prev }));
    } catch (err) {
      console.error('Lỗi đổi trạng thái:', err);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Bạn có chắc chắn?',
      text: 'Người dùng sẽ bị xoá!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:3000/admin/user/deleted/${id}`, { method: 'DELETE' });
        const data = await res.json();
        if (data.success) {
          Swal.fire('Đã xóa!', 'Người dùng đã bị xóa.', 'success');
          setFilters(prev => ({ ...prev }));
        }
      } catch (err) {
        console.error(err);
        Swal.fire('Lỗi!', 'Không thể xóa người dùng.', 'error');
      }
    }
  };

  const handleBulkAction = async () => {
    if (selectedUsers.length === 0) {
      setMessage('Vui lòng chọn ít nhất 1 người dùng');
      return;
    }

    if (bulkAction === 'delete') {
      const result = await Swal.fire({
        title: 'Bạn có chắc?',
        text: 'Các người dùng sẽ bị xoá!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xóa',
        cancelButtonText: 'Hủy bỏ',
      });

      if (result.isConfirmed) {
        try {
          const res = await fetch('http://localhost:3000/admin/user/delete-multiple', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ids: selectedUsers }),
          });
          const data = await res.json();
          if (data.success) {
            Swal.fire('Đã xóa!', `Đã xoá ${selectedUsers.length} người dùng`, 'success');
            setSelectedUsers([]);
            setFilters(prev => ({ ...prev }));
          }
        } catch (err) {
          console.error(err);
          Swal.fire('Lỗi!', 'Không thể xoá người dùng.', 'error');
        }
      }
    } else {
      // Update status hàng loạt
      try {
        const res = await fetch('http://localhost:3000/admin/user/change-multi', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ids: selectedUsers, status: bulkAction }),
        });
        const data = await res.json();
        if (data.success) {
          setMessage(`Đã cập nhật trạng thái cho ${selectedUsers.length} người dùng`);
          setSelectedUsers([]);
          setFilters(prev => ({ ...prev }));
        }
      } catch (err) {
        console.error(err);
        setMessage('Lỗi khi cập nhật hàng loạt');
      }
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = users.map(u => u.id_nguoi_dung);
      setSelectedUsers(allIds);
    } else {
      setSelectedUsers([]);
    }
  };

  const handleCheckboxChange = (e, id) => {
    if (e.target.checked) {
      setSelectedUsers(prev => [...prev, id]);
    } else {
      setSelectedUsers(prev => prev.filter(uid => uid !== id));
    }
  };

  if (loading) return <p>Đang tải dữ liệu người dùng...</p>;

  return (
    <div className="app sidebar-mini rtl">
      <main className="app-content">
        <div className="app-title">
          <ul className="app-breadcrumb breadcrumb side">
            <li className="breadcrumb-item active">
              <b>Danh sách người dùng</b>
            </li>
          </ul>
          <div id="clock"><Clock /></div>
        </div>

        <div className="tile">
          <div className="tile-body">
            <div className="row element-button">

              <div className="col-sm-4">
    <form
                        id="form-search"
                        onSubmit={(e) => {
                          e.preventDefault();
                          const searchValue = e.target.keyword.value.trim();
                          setFilters((prev) => ({ ...prev, search: searchValue, page: 1 }));
                        }}
                      >
                        <div className="input-group">
                          <input type="text" placeholder="nhập từ khóa" name="keyword" className="form-control" />
                          <button className="btn btn-success btn-css" type="submit">
                            Tìm
                          </button>
                        </div>
                      </form>
  </div>
              
              <div className="col-sm-2">
                <a className="btn btn-add btn-sm" href="/admin/CreateUser">
                  <i className="fas fa-plus"></i> Tạo mới người dùng
                </a>
              </div>
            </div>

            <div style={{ marginBottom: '1rem' }} className="selected_all">
              <select
                value={bulkAction}
                onChange={(e) => setBulkAction(e.target.value)}
                className="form-control"
                style={{ width: '150px', display: 'inline-block', marginRight: '10px' }}
              >
                <option value="active">Kích hoạt</option>
                <option value="inactive">Vô hiệu</option>
                <option value="delete">Xóa</option>
              </select>
              <button className="btn btn-primary" onClick={handleBulkAction}>Cập nhật</button>
              <p style={{ color: 'green', marginTop: '10px' }}>{message}</p>
            </div>

            <table className="table table-hover table-bordered">
              <thead>
                <tr>
                  <th><input type="checkbox" checked={selectedUsers.length === users.length} onChange={handleSelectAll} /></th>
                  <th>ID</th>
                  <th>Họ tên</th>
                  <th>Email</th>
                  <th>Ảnh</th>
                  <th>Vai trò</th>
                  <th>SĐT</th>
                  <th>Ngày tạo</th>
                  <th>Trạng thái</th>

                  <th>Chức năng</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id_nguoi_dung}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id_nguoi_dung)}
                        onChange={(e) => handleCheckboxChange(e, user.id_nguoi_dung)}
                      />
                    </td>
                    <td>{user.id_nguoi_dung}</td>
                    <td>{user.ten}</td>
                    <td>{user.email}</td>
                    <td>
                      <img
                        src={user.avatar?.startsWith('http') ? user.avatar : `http://localhost:3000/uploads/${user.avatar}`}
                        alt="avatar"
                        width="50"
                        height="50"
                        style={{ borderRadius: '50%' }}
                      />
                    </td>
                    <td>{user.id_vai_tro === 1 ? 'Admin' : 'Người dùng'}</td>
                    <td>{user.so_dien_thoai}</td>
                    <td>{new Date(user.ngay_tao).toLocaleDateString()}</td>
                    <td className="button_status">
  <span
    className={`badge ${user.trang_thai === 'active' ? 'bg-success' : 'bg-secondary'}`}
    onClick={() => handleStatusChange(user.id_nguoi_dung, user.trang_thai)}
    style={{ cursor: 'pointer' }}
  >
    {user.trang_thai === 'active' ? 'Hoạt động' : 'Vô hiệu'}
  </span>
</td>
                    <td className="button-action">
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(user.id_nguoi_dung)}>
                        <i className="fas fa-trash"></i>
                      </button>
                      <a href={`/admin/edit-user/${user.id_nguoi_dung}`} className="btn btn-warning btn-sm">
                        <i className="fas fa-edit"></i>
                      </a>

<a href={`/admin/UserDetail/${user.id_nguoi_dung}`} className="btn btn-info btn-sm">
  <FaEye /></a>                      
                      
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <nav>
  <ul className="pagination">
    <li className="page-item">
      <button
        className="page-link"
        onClick={() =>
          setFilters((prev) => ({
            ...prev,
            page: Math.max(1, prev.page - 1),
          }))
        }
        disabled={filters.page === 1}
      >
        Trang trước
      </button>
    </li>

    {[...Array(totalPages)].map((_, i) => (
      <li
        key={i + 1}
        className={`page-item ${filters.page === i + 1 ? 'active' : ''}`}
      >
        <button
          className="page-link"
          onClick={() => setFilters((prev) => ({ ...prev, page: i + 1 }))}
        >
          {i + 1}
        </button>
      </li>
    ))}

    <li className="page-item">
      <button
        className="page-link"
        onClick={() =>
          setFilters((prev) => ({
            ...prev,
            page: Math.min(totalPages, prev.page + 1),
          }))
        }
        disabled={filters.page === totalPages}
      >
        Kế tiếp
      </button>
    </li>
  </ul>
</nav>

          </div>
        </div>
      </main>
    </div>
  );
}

export default UserList;

