  import React, { useEffect, useState } from 'react';
  import { FaAlignCenter, FaArrowRight, FaEye } from 'react-icons/fa';
  import Clock from '../clock';
  import { getallOrder } from '../../api/api';
      import { FaArrowLeft } from 'react-icons/fa'; // or import { IoArrowBack } from 'react-icons/io5';

  function OrderList() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [total, setTotal] = useState(0);

    const [filters, setFilters] = useState({
      status: '',
      search: '',
      page: 1,
      limit: 10,
    });

    const totalPages = Math.ceil(total / filters.limit) || 1;

    const validStatuses = ['Đang xử lý', 'Xác nhận', 'Chờ thanh toán', 'Đã giao', 'Đã hủy'];

    useEffect(() => {
      const fetchOrders = async () => {
        setLoading(true);
        setError('');
        try {
          const data = await getallOrder(filters);
          setOrders(data.orders);  // <-- Sửa ở đây
          setTotal(data.total);    // <-- Sửa ở đây
        } catch (err) {
          console.error('Lỗi khi lấy đơn hàng:', err);
          setError(err.message || 'Lỗi không xác định');
        } finally {
          setLoading(false);
        }
      };

      fetchOrders();
    }, [filters]);

    const handleStatusChange = async (id, newStatus) => {
      if (!validStatuses.includes(newStatus)) {
        alert('Trạng thái không hợp lệ');
        return;
      }

      try {
        const res = await fetch(`http://localhost:3000/admin/order/orderStatus/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ trang_thai: newStatus }),
        });

        const data = await res.json();
        if (!data.success) {
          alert(data.message || 'Cập nhật trạng thái thất bại');
          return;
        }

        // Cập nhật UI
        setOrders(prev =>
          prev.map(order =>
            order.id_don_hang === id ? { ...order, trang_thai: newStatus } : order
          )
        );

        alert('Cập nhật trạng thái thành công');
      } catch (err) {
        alert('Lỗi khi cập nhật trạng thái');
        console.error(err);
      }
    };

    return (
      <div className="app sidebar-mini rtl">
        <main className="app-content">
          <div className="app-title">
            <ul className="app-breadcrumb breadcrumb side">
              <li className="breadcrumb-item active">
                <a href="#"><b>Danh sách đơn hàng</b></a>
              </li>
            </ul>
            <div id="clock"><Clock /></div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="tile">
                  <div className="btn_active mb-3 margin-right">
                        <button 
                      
                          className={`btn btn-sm me-2 ${filters.status === '' ? 'btn-success' : 'btn-outline-success'}` }
                          onClick={() => setFilters({ status: '', search: '', page: 1 ,limit:10})}
                        >
                          Tất Cả
                        </button>

                        <button
                          className={`btn btn-sm me-2 ${filters.status === 'Đã giao' ? 'btn-success' : 'btn-outline-success'}`}
                          onClick={() => setFilters((prev) => ({ ...prev, status: 'Đã giao', page: 1 }))}
                        >
                          Đã giao 
                        </button>

                        <button
                          className={`btn btn-sm ${filters.status === 'Đang Xử lý' ? 'btn-success' : 'btn-outline-success'}`}
                          onClick={() => setFilters((prev) => ({ ...prev, status: 'Đang Xử lý', page: 1 }))}
                        >
                          Đang Xử lý
                        </button>
                          <button
                          className={`btn btn-sm ${filters.status === 'Xác nhận' ? 'btn-success' : 'btn-outline-success'}`}
                          onClick={() => setFilters((prev) => ({ ...prev, status: 'Xác nhận', page: 1 }))}
                        >
                        Xác nhận
                        </button>

                          <button
                          className={`btn btn-sm ${filters.status === 'Chờ thanh toán' ? 'btn-success' : 'btn-outline-success'}`}
                          onClick={() => setFilters((prev) => ({ ...prev, status: 'Chờ thanh toán', page: 1 }))}
                        >
                        Chờ thanh toán
                        </button>
                            <button
                          className={`btn btn-sm ${filters.status === 'Đã hủy' ? 'btn-success' : 'btn-outline-success'}`}
                          onClick={() => setFilters((prev) => ({ ...prev, status: 'Đã hủy', page: 1 }))}
                        >
                      Đã hủy
                        </button>
                           <form
                        id="form-search"
                        onSubmit={(e) => {
                          e.preventDefault();
                          const searchValue = e.target.keyword.value.trim();
                          setFilters((prev) => ({ ...prev, search: searchValue, page: 1  }));
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
                <div className="tile-body">
                  {loading && <p>Đang tải đơn hàng...</p>}
                  {error && <p style={{ color: 'red' }}>{error}</p>}

                  {!loading && !error && (
                    <table className="table table-hover table-bordered">
                      <thead>
                        <tr>
                          <th><input type="checkbox" /></th>
                          <th>Mã Đơn</th>
                          <th>Khách hàng</th>
                          <th>Ngày tạo</th>
                          <th>Trạng thái</th>
                          <th>Địa chỉ</th>
                          <th>Phương thức thanh toán</th>
                          <th>Số Điện Thoại</th>
                          <th>Tổng giá</th>
                          <th>Chức năng</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.length === 0 ? (
                          <tr><td colSpan="9">Không có đơn hàng nào</td></tr>
                        ) : (
                          orders.map(order => (
                            <tr key={order.id_don_hang}>
                              <td><input type="checkbox" /></td>
                              <td>{order.id_don_hang}</td>
                              <td>{order.ten_nguoi_dung}</td>
                              <td>{new Date(order.ngay_tao).toLocaleDateString()}</td>
                              <td>
                                <select
                                  value={order.trang_thai}
                                  onChange={(e) =>
                                    handleStatusChange(order.id_don_hang, e.target.value)
                                  }
                                >
                                  {validStatuses.map(status => (
                                    <option key={status} value={status}>{status}</option>
                                  ))}
                                </select>
                              </td>
                              <td>{order.dia_chi_day_du}</td>
                              <td style={{textAlign: 'center'}}>{order.phuong_thuc_thanh_toan}</td>
                              <td>{order.so_dien_thoai}</td>
                              <td>{order.tong_gia.toLocaleString()} VND</td>

                              <td>
                                <a
                                  href={`/admin/OrderDetail/${order.id_don_hang}`}
                                  className="btn btn-sm btn-info"
                                  title="Xem chi tiết"
                                >
                                  <FaEye />
                                </a>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Pagination */}
          <nav>
            <ul className="pagination">
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={() => setFilters(prev => ({ ...prev, page: Math.max(1, prev.page - 1) }))}
                  disabled={filters.page === 1}
                >
  <FaArrowLeft/>
                </button>
              </li>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <li key={p} className={`page-item ${filters.page === p ? 'active' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => setFilters(prev => ({ ...prev, page: p }))}
                  >
                    {p} {/* sửa chỗ này, hiển thị đúng số trang */}
                  </button>
                </li>
              ))}

              <li className="page-item">
                <button style={{}}
                  className="page-link"
                  onClick={() => setFilters(prev => ({ ...prev, page: Math.min(totalPages, prev.page + 1) }))}
                  disabled={filters.page === totalPages}
                >
          <FaArrowRight/>
                </button>
              </li>
            </ul>
          </nav>
        </main>
      </div>
    );
  }

  export default OrderList;
