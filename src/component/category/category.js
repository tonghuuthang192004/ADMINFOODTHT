import React, { useEffect, useState } from 'react';
import Clock from '../clock';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { getCategory } from '../../api/api';  // Chuyển từ getProducts thành getCategories
import Swal from 'sweetalert2';

import { FaEye } from 'react-icons/fa';

function Category() {
  const [categories, setCategories] = useState([]); // Đổi từ products thành categories
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [bulkSAction, setbulkSAction] = useState('active'); // trạng thái cập nhật hàng loạt
  const [message, setMessage] = useState('');

  const [filters, setFilters] = useState({
    status: '',
    search: '',
    page: 1,
  });

  // Thay đổi trạng thái 1 danh mục
 const hanldeStatus = async (id, statusCategory) => {
    try {
      const response = await fetch(
        `http://localhost:3000/admin/category/change-status/${statusCategory}/${id}`,
        { method: 'PUT' }
      );
      const data = await response.json();
      if (data.success) {
        Swal.fire({
        title: 'Cập nhật trạng thái thành công!',
        text: `Trạng thái đã được thay đổi thành "${  !statusCategory}".`,
        icon: 'success',
        confirmButtonText: 'OK',
      });
        setFilters((prev) => ({ ...prev })); // Trigger useEffect để load lại danh sách
      }
    } catch (err) {
      console.error('Lỗi khi đổi trạng thái:', err);
    }
  };

  // Lấy danh sách danh mục theo filter
 useEffect(() => {
  setLoading(true);
  getCategory(filters)  // Lấy danh sách theo bộ lọc
    .then((data) => {
      setCategories(data);  // Cập nhật danh sách
      setLoading(false);
      setSelectedCategories([]); // Reset selected nếu có thay đổi
    })
    .catch((error) => {
      console.error('Lỗi khi lấy danh mục:', error);
      setLoading(false);
    });
}, [filters]); 
  // Chọn tất cả checkbox
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = categories.map((c) => c.id_danh_muc);  // Chỉnh lại từ products thành categories
      setSelectedCategories(allIds);
    } else {
      setSelectedCategories([]);
    }
  };

  // Chọn từng checkbox
  const handleCheckboxChange = (e, id) => {
    if (e.target.checked) {
      setSelectedCategories((prev) => [...prev, id]);
    } else {
      setSelectedCategories((prev) => prev.filter((cid) => cid !== id));
    }
  };

  // Cập nhật trạng thái hàng loạt và xóa
  const handleBulkAction = async () => {
    if (selectedCategories.length === 0) {
      setMessage('Vui lòng chọn ít nhất 1 danh mục');
      return;
    }

    if (bulkSAction === 'delete') {
      const result = await Swal.fire({
        title: 'Bạn có chắc chắn?',
        text: 'Danh mục sẽ được đưa vào thùng rác!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xóa',
        cancelButtonText: 'Hủy bỏ',
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
      });
      if (result.isConfirmed) {
        try {
          const res = await fetch('http://localhost:3000/admin/category/delete-multiple', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ids: selectedCategories }),
          });
          const data = await res.json();
          if (data.success) {
            Swal.fire('Đã xóa!', `Đã xóa ${selectedCategories.length} danh mục.`, 'success');
            setSelectedCategories([]);
            setFilters((prev) => ({ ...prev }));
          } else {
            Swal.fire('Lỗi!', data.error || 'Xóa thất bại.', 'error');
          }
        } catch (error) {
          console.error(error);
          Swal.fire('Lỗi!', 'Lỗi khi xóa danh mục hàng loạt.', 'error');
        }
      }
    } else {
      try {
        const res = await fetch('http://localhost:3000/admin/category/change-multi', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ids: selectedCategories, status: bulkSAction }),
        });
        const data = await res.json();
        if (data.success) {
          setMessage(`Đã cập nhật trạng thái cho ${selectedCategories.length} danh mục`);
          setSelectedCategories([]);
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

  const hanldDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Bạn có chắc chắn?',
      text: 'Danh mục sẽ được đưa vào thùng rác!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy bỏ',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    });
    if (result.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:3000/admin/category/deleted/${id}`, {
          method: 'DELETE',
        });

        const data = await res.json();

        if (data.success) {
          Swal.fire('Đã xóa!', 'Danh mục đã bị xóa.', 'success');
          setFilters((prev) => ({ ...prev })); // reload lại danh sách
        } else {
          Swal.fire('Lỗi!', data.message || 'Không thể xóa danh mục.', 'error');
        }
      } catch (error) {
        console.error(error);
        Swal.fire('Lỗi!', 'Đã xảy ra lỗi khi xóa danh mục.', 'error');
      }
    }
  };

  if (loading) return <p>Đang tải dữ liệu...</p>;

  return (
    <div className="app sidebar-mini rtl">
      <main className="app-content">
        <div className="app-title">
          <ul className="app-breadcrumb breadcrumb side">
            <li className="breadcrumb-item active">
              <a href="#">
                <b>Danh sách danh mục</b>
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
                    <a className="btn btn-add btn-sm" href="/admin/AddCategory" title="Thêm">
                      <i className="fas fa-plus"></i> Tạo mới Danh Mục
                    </a>
                  </div>
                </div>

                <div className="card mb-6">
                  <div className="card-body">
                    <div className="btn_active mb-3">
                      <button
                        className="btn btn-sm btn-outline-success me-2"
                        onClick={() => setFilters({ status: '', search: '', page: 1 })}
                      >
                        Tất Cả
                      </button>
                      <button
                        className="btn btn-sm btn-outline-success me-2"
                        onClick={() => setFilters((prev) => ({ ...prev, status: 'active', page: 1 }))}
                      >
                        Hoạt Động
                      </button>
                      <button
                        className="btn btn-sm btn-outline-success"
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
                  <div className='selected_category'>
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
                    <label>Danh sách ID danh mục được chọn:</label>
                    <input
                      type="text"
                      readOnly
                      value={selectedCategories.join(', ')}
                      style={{ width: '100%', padding: '8px' }}
                    />
                  </div>

                  <p style={{ color: 'green', marginTop: '10px' }}>{message}</p>

                </div>

                <table className="table table-hover table-bordered" id="sampleTable">
                  <thead>
                    <tr>
                      <th width="10">
                        {/* Checkbox chọn tất cả */}
                        <input
                          type="checkbox"
                          id="all"
                          checked={selectedCategories.length === categories.length && categories.length > 0}
                          onChange={handleSelectAll}
                        />
                      </th>
                      <th>Mã danh mục</th>
                      <th>Tên danh mục</th>
                      <th>hinh_anh</th>
                      <th>Ngày tạo</th>
                      <th>Ngày cập nhật</th>
                      <th>Tình trạng</th>
                      <th>Chức năng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((item) => (
                      <tr key={item.id_danh_muc}>
                        <td>
                          <input
                            type="checkbox"
                            name="check1"
                            value={item.id_danh_muc}
                            checked={selectedCategories.includes(item.id_danh_muc)}
                            onChange={(e) => handleCheckboxChange(e, item.id_danh_muc)}
                          />
                        </td>
                        <td>{item.id_danh_muc}</td>
                        <td>{item.ten}</td>
                        <td>
<img src={item.hinh_anh?.startsWith('http') ? item.hinh_anh : `http://localhost:3000/uploads/${item.hinh_anh}`} alt={item.ten} width="100" />
                        </td>
                        <td>
                          {item.ngay_tao}
                        </td>
                         <td>
                          {item.ngay_cap_nhat}
                        </td>
                        
                        
                      <td className="button_status">
  <span
    className={`badge ${item.trang_thai === 'active' ? 'bg-success' : 'bg-secondary'}`}
    onClick={() => hanldeStatus(item.id_danh_muc, item.trang_thai)} // Gọi hàm để chuyển đổi trạng thái
    style={{ cursor: 'pointer' }}
  >
    {item.trang_thai}
  </span>
</td>
                        <td className='button-action'>
                          <button className="btn btn-primary btn-sm trash" title="Xóa" onClick={() => hanldDelete(item.id_danh_muc)} >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                          <button
                            className="btn btn-primary btn-sm edit"
                            title="Sửa"
                            data-toggle="modal"
                            data-target="#ModalUP"
                          >
                            <a href={`/admin/EditCategory/${item.id_danh_muc}`} >
                             <i className="fas fa-edit"></i>
                            </a>
                          </button>
                          <button
                            className="btn btn-primary btn-sm edit"
                            title="Chi Tiet Danh Mục"
                            data-toggle="modal"
                            data-target="#ModalUP"
                          >
                            <a href={`/admin/CategoryDetail/${item.id_danh_muc}`} >
                              <FaEye />
                            </a>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div style={{ marginTop: '1rem' }}></div>
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
    </div>
  );
}

export default Category;
