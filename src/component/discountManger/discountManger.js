import React, { useEffect, useState } from 'react';
import Clock from '../clock';
import { Link, NavLink } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

import Swal from 'sweetalert2';
import { getDisCountManger } from '../../api/api';
import {FaEye } from 'react-icons/fa'
import AdminLayOut from '../adminLayOut';
function DisCountMangerList() {
  const [DisCountManger, setDisCountManger] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDisCountManger, setSelectedDisCountManger] = useState([]);

  const [bulkSAction, setbulkSAction] = useState('active'); // trạng thái cập nhật hàng loạt
  const [message, setMessage] = useState('');

  const [filters, setFilters] = useState({
    status: '',
    search: '',
    page: 1,
  });

  // Thay đổi trạng thái 1 Khuyến Mãi
  const hanldeStatus = async (id, statusDisCountManger) => {
    try {
      const response = await fetch(
        `http://localhost:3000/admin/DisCountManger/change-status/${statusDisCountManger}/${id}`,
        { method: 'PUT' }
      );
      const data = await response.json();
      if (data.success) {
        setFilters((prev) => ({ ...prev })); // Trigger useEffect để load lại danh sách
      }
    } catch (err) {
      console.error('Lỗi khi đổi trạng thái:', err);
    }
  };

  // Lấy danh sách sản phẩm theo filter
  useEffect(() => {
    setLoading(true);
    getDisCountManger(filters)
      .then((data) => {
        setDisCountManger(data);
        setLoading(false);
        // Reset selected nếu page hoặc filters thay đổi để tránh lỗi chọn sai
        setSelectedDisCountManger([]);
      })
      .catch((error) => {
        console.error('Lỗi khi lấy sản phẩm:', error);
        setLoading(false);
      });
  }, [filters]);

  // Chọn tất cả checkbox
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = DisCountManger.map((p) => p.id_san_pham);
      setSelectedDisCountManger(allIds);
    } else {
      setSelectedDisCountManger([]);
    }
  };

  // Chọn từng checkbox
  const handleCheckboxChange = (e, id) => {
    if (e.target.checked) {
      setSelectedDisCountManger((prev) => [...prev, id]);
    } else {
      setSelectedDisCountManger((prev) => prev.filter((pid) => pid !== id));
    }
  };

  // Cập nhật trạng thái hàng loạt và xóa
  const handleBulkAction = async () => {
  if (selectedDisCountManger.length === 0) {
    setMessage('Vui lòng chọn ít nhất 1 Khuyến Mãi');
    return;
  }

  if (bulkSAction === 'delete') {
   const result = await Swal.fire({
    title: 'Bạn có chắc chắn?',
    text: 'Khuyến Mãi sẽ được đưa vào thùng rác!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Xóa',
    cancelButtonText: 'Hủy bỏ',
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
  });
  if(result.isConfirmed)
  {
  try {
      const res = await fetch('http://localhost:3000/admin/DisCountManger/delete-multiple', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: selectedDisCountManger }),
      });
      const data = await res.json();
      if (data.success) {
      Swal.fire('Đã xóa!', `Đã xóa ${selectedDisCountManger.length} Khuyến Mãi.`, 'success');
        setSelectedDisCountManger([]);
        setFilters((prev) => ({ ...prev }));
      } else {
      Swal.fire('Lỗi!', data.error || 'Xóa thất bại.', 'error');
      }
    } catch (error) {
      console.error(error);
    Swal.fire('Lỗi!', 'Lỗi khi xóa Khuyến Mãi hàng loạt.', 'error');

    }
  }

    
  } else {
    try {
      const res = await fetch('http://localhost:3000/admin/DisCountManger/change-multi', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: selectedDisCountManger, status: bulkSAction }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage(`Đã cập nhật trạng thái cho ${selectedDisCountManger.length} Khuyến Mãi`);
        setSelectedDisCountManger([]);
        setFilters((prev) => ({ ...prev }));
      } else {
        setMessage(data.error || 'Cập nhật thất bại');
      }
    } catch (error) {
      console.error(error);
      setMessage('Lỗi khi cập nhật trạng thái hàng loạt');
    }
  }
};


  if (loading) return <p>Đang tải dữ liệu...</p>;

  // xóa mềm 


  const hanldDelete = async(id)=>{
  const result = await Swal.fire({
    title: 'Bạn có chắc chắn?',
    text: 'Khuyến Mãi sẽ được đưa vào thùng rác!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Xóa',
    cancelButtonText: 'Hủy bỏ',
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
  });
    if (result.isConfirmed) {
    try {
      const res = await fetch(`http://localhost:3000/admin/DisCountManger/deleted/${id}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (data.success) {
        Swal.fire('Đã xóa!', 'Khuyến Mãi đã bị xóa.', 'success');
        setFilters(prev => ({ ...prev })); // reload lại danh sách
      } else {
        Swal.fire('Lỗi!', data.message || 'Không thể xóa Khuyến Mãi.', 'error');
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Lỗi!', 'Đã xảy ra lỗi khi xóa Khuyến Mãi.', 'error');
    }
  }
};

  return (
    <>
     <AdminLayOut/>
    <div className="app sidebar-mini rtl">
      <main className="app-content">
        <div className="app-title">
          <ul className="app-breadcrumb breadcrumb side">
            <li className="breadcrumb-item active">
              <a href="#">
                <b>Danh sách Khuyến Mãi</b>
              </a>
            </li>
          </ul>
          <div id="clock">
            <Clock />
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="tile">
              <div className="tile-body">
                <div className="row element-button">
                  <div className="col-sm-2">
                    <a className="btn btn-add btn-sm" href="/admin/AddDisCountManger" title="Thêm">
                      <i className="fas fa-plus"></i> Tạo mới Mã Khuyến Mãi
                    </a>
                  </div>
                </div>

                <div className="card mb-6">
                  <div className="card-body">
             <div className="btn_active mb-3 margin-right">
  <button
    className={`btn btn-sm me-2 ${filters.status === '' ? 'btn-success' : 'btn-outline-success'}`}
    onClick={() => setFilters({ status: '', search: '', page: 1 })}
  >
    Tất Cả
  </button>

  <button
    className={`btn btn-sm me-2 ${filters.status === 'active' ? 'btn-success' : 'btn-outline-success'}`}
    onClick={() => setFilters((prev) => ({ ...prev, status: 'active', page: 1 }))}
  >
    Hoạt Động
  </button>

  <button
    className={`btn btn-sm ${filters.status === 'inactive' ? 'btn-success' : 'btn-outline-success'}`}
    onClick={() => setFilters((prev) => ({ ...prev, status: 'inactive', page: 1 }))}
  >
    Dừng Hoạt Động
  </button>
</div>



                    <div className="form-search mb-3">
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
                  </div>
                </div>

                <div style={{ marginBottom: '1rem' }} className='selected_all'>
                  <div className='selected_DisCountManger'>
              <select
                    value={bulkSAction}
                    onChange={(e) => setbulkSAction(e.target.value)}
                    className="form-control"
                    style={{ width: '150px', display: 'inline-block', marginRight: '10px' }}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="delete">Xóa tất cả</option>
                  </select>
                  <button className="btn btn-primary" onClick={handleBulkAction}>
                    Cập nhật 
                  </button>

                  </div>
                
                  <div className='selected_id'>
  <label>Danh sách ID Khuyến Mãi được chọn: {selectedDisCountManger.join(', ')}</label>
                  {/* <input
                    type="text"
                    readOnly
                    value=
                    style={{ width: '100%', padding: '8px' }}
                  /> */}
                  </div>
                
                  <p style={{ color: 'green', marginTop: '10px' }}>{message}</p>

                </div>

              <table className="table table-hover table-bordered" id="sampleTable">
  <thead>
    <tr>
      <th width="10">
        <input
          type="checkbox"
          id="all"
          checked={selectedDisCountManger.length === DisCountManger.length && DisCountManger.length > 0}
          onChange={handleSelectAll}
        />
      </th>
      <th>ID Giảm Giá</th>
      <th>Mã Giảm Giá</th>
      <th>Tên</th>
      <th>Loại</th>
      <th>Giá Trị</th>
      {/* <th>Điều Kiện</th> */}
      <th>Ngày Bắt Đầu</th>
      <th>Ngày Kết Thúc</th>
      <th>Số Lượng</th>
      <th>Số Lượng Còn Lại</th>
      <th>Trạng Thái</th>
      <th>Chức năng</th>
    </tr>
  </thead>
  <tbody>
    {DisCountManger.map((item) => (
      <tr key={item.id_giam_gia}>
        <td>
          <input
            type="checkbox"
            name="check1"
            value={item.id_giam_gia}
            checked={selectedDisCountManger.includes(item.id_giam_gia)}
            onChange={(e) => handleCheckboxChange(e, item.id_giam_gia)}
          />
        </td>
        <td>{item.id_giam_gia}</td>
        <td>{item.ma_giam_gia}</td>
        <td>{item.ten}</td>
        <td>{item.loai}</td>
        <td>{item.gia_tri}</td>
        {/* <td>{item.dieu_kien}</td> */}
     <td>{new Date(item.ngay_bat_dau).toLocaleString('vi-VN', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit'
})}</td>
     <td>{new Date(item.ngay_ket_thuc).toLocaleString('vi-VN', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit'
})}</td>
        <td>{item.so_luong}</td>
        <td>{item.so_luong_con_lai}</td>
        <td>
          <span
            className={`badge ${item.trang_thai === 'active' ? 'bg-success' : 'bg-secondary'}`}
            onClick={() => hanldeStatus(item.id_giam_gia, item.trang_thai)}
            style={{ cursor: 'pointer' }}
          >
            {item.trang_thai}
          </span>
        </td>
     
        <td className='button-action margin-right'>
          <button className="btn btn-primary btn-sm trash" title="Xóa" onClick={() => hanldDelete(item.id_giam_gia)} >
            <i className="fa-solid fa-trash"></i>
          </button>
          <button
            className="btn btn-primary btn-sm edit"
            title="Sửa"
          >
            <NavLink to={`/admin/EditDisCountManger/${item.id_giam_gia}`}>
              <i className="fas fa-edit"></i>
            </NavLink>
          </button>
          <button
            className="btn btn-primary btn-sm edit"
            title="Chi Tiết"
          >
            <NavLink to={`/admin/DisCountMangerDetail/${item.id_giam_gia}`}>
              <FaEye />
            </NavLink>
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

                <div style={{ marginTop: '1rem' }}>

                </div>
              </div>
            </div>
          </div>
        </div>

        <nav>
          <ul className="pagination">
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => setFilters((prev) => ({ ...prev, page: Math.max(1, prev.page - 1) }))}
              >
                Trang trước
              </button>
            </li>
            {[1, 2, 3].map((p) => (
              <li key={p} className={`page-item ${filters.page === p ? 'active' : ''}`}>
                <button className="page-link" onClick={() => setFilters((prev) => ({ ...prev, page: p }))}>
                  {p}
                </button>
              </li>
            ))}
            <li className="page-item">
              <button className="page-link" onClick={() => setFilters((prev) => ({ ...prev, page: prev.page + 1 }))}>
                Kế tiếp
              </button>
            </li>
          </ul>
        </nav>
      </main>

      {/* Modal chỉnh sửa Khuyến Mãi */}
     
    </div>
    </>
   
  );
}

export default DisCountMangerList;
