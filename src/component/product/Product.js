import React, { useEffect, useState } from 'react';
import Clock from '../clock';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { getProducts } from '../../api/api';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const [bulkStatus, setBulkStatus] = useState('active'); // trạng thái cập nhật hàng loạt
  const [message, setMessage] = useState('');

  const [filters, setFilters] = useState({
    status: '',
    search: '',
    page: 1,
  });

  // Thay đổi trạng thái 1 sản phẩm
  const hanldeStatus = async (id, statusProduct) => {
    try {
      const response = await fetch(
        `http://localhost:3000/admin/products/change-status/${statusProduct}/${id}`,
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
    getProducts(filters)
      .then((data) => {
        setProducts(data);
        setLoading(false);
        // Reset selected nếu page hoặc filters thay đổi để tránh lỗi chọn sai
        setSelectedProducts([]);
      })
      .catch((error) => {
        console.error('Lỗi khi lấy sản phẩm:', error);
        setLoading(false);
      });
  }, [filters]);

  // Chọn tất cả checkbox
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = products.map((p) => p.id_san_pham);
      setSelectedProducts(allIds);
    } else {
      setSelectedProducts([]);
    }
  };

  // Chọn từng checkbox
  const handleCheckboxChange = (e, id) => {
    if (e.target.checked) {
      setSelectedProducts((prev) => [...prev, id]);
    } else {
      setSelectedProducts((prev) => prev.filter((pid) => pid !== id));
    }
  };

  // Cập nhật trạng thái hàng loạt
  const handleBulkUpdate = async () => {
    if (selectedProducts.length === 0) {
      setMessage('Vui lòng chọn ít nhất 1 sản phẩm');
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/admin/products/change-multi', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: selectedProducts, status: bulkStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage(`Đã cập nhật trạng thái cho ${selectedProducts.length} sản phẩm`);
        setSelectedProducts([]);
        setFilters((prev) => ({ ...prev })); // reload danh sách
      } else {
        setMessage(data.error || 'Cập nhật thất bại');
      }
    } catch (error) {
      console.error(error);
      setMessage('Lỗi khi cập nhật trạng thái hàng loạt');
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
                <b>Danh sách sản phẩm</b>
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
                    <Link className="btn btn-add btn-sm" to="/AddProduct" title="Thêm">
                      <i className="fas fa-plus"></i> Tạo mới Sản Phẩm
                    </Link>
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
                  <div className='selected_product'>
              <select
                    value={bulkStatus}
                    onChange={(e) => setBulkStatus(e.target.value)}
                    className="form-control"
                    style={{ width: '150px', display: 'inline-block', marginRight: '10px' }}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                  <button className="btn btn-primary" onClick={handleBulkUpdate}>
                    Cập nhật trạng thái hàng loạt
                  </button>
                  </div>
                
                  <div className='selected_id'>
  <label>Danh sách ID sản phẩm được chọn:</label>
                  <input
                    type="text"
                    readOnly
                    value={selectedProducts.join(', ')}
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
                          checked={selectedProducts.length === products.length && products.length > 0}
                          onChange={handleSelectAll}
                        />
                      </th>
                      <th>Mã sản phẩm</th>
                      <th>Tên sản phẩm</th>
                      <th>Ảnh</th>
                      <th>Tình trạng</th>
                      <th>Giá tiền</th>
                      <th>Danh mục</th>
                      <th>Chức năng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((item) => (
                      <tr key={item.id_san_pham}>
                        <td>
                          <input
                            type="checkbox"
                            name="check1"
                            value={item.id_san_pham}
                            checked={selectedProducts.includes(item.id_san_pham)}
                            onChange={(e) => handleCheckboxChange(e, item.id_san_pham)}
                          />
                        </td>
                        <td>{item.id_san_pham}</td>
                        <td>{item.ten}</td>
                        <td>
                          <img src={item.hinh_anh || '/images/default-product.jpg'} alt={item.ten} width="100" />
                        </td>
                        <td className="button_status">
                          <span
                            className={`badge ${item.trang_thai === 'active' ? 'bg-success' : 'bg-secondary'}`}
                            onClick={() => hanldeStatus(item.id_san_pham, item.trang_thai)}
                            style={{ cursor: 'pointer' }}
                          >
                            {item.trang_thai}
                          </span>
                        </td>
                        <td>{item.gia}</td>
                        <td>{item.id_danh_muc || 'Chưa rõ'}</td>
                        <td>
                          <button className="btn btn-primary btn-sm trash" title="Xóa">
                            <i className="fa-solid fa-trash"></i>
                          </button>
                          <button
                            className="btn btn-primary btn-sm edit"
                            title="Sửa"
                            data-toggle="modal"
                            data-target="#ModalUP"
                          >
                            <i className="fas fa-edit"></i>
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

      {/* Modal chỉnh sửa sản phẩm */}
      <div
        className="modal fade"
        id="ModalUP"
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
        data-backdrop="static"
        data-keyboard="false"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <div className="form-group col-md-12">
                <h5>Chỉnh sửa thông tin sản phẩm cơ bản</h5>
              </div>
              <div className="form-group col-md-6">
                <label className="control-label">Mã sản phẩm</label>
                <input className="form-control" type="number" defaultValue="71309005" />
              </div>
              {/* Tiếp tục các input khác nếu cần */}
              <button className="btn btn-save" type="button">
                Lưu lại
              </button>
              <button className="btn btn-cancel" data-dismiss="modal" type="button">
                Hủy bỏ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
