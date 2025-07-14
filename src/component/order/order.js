import React, { useEffect, useState } from 'react';
import { FaArrowRight, FaArrowLeft ,FaEye} from 'react-icons/fa';
import { getallOrder } from '../../api/api';

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

  const validStatuses = ['Đang xử lý', 'Xác nhận', 'Đang chuẩn bị hàng','Đang giao', 'Đã giao', 'Đã hủy'];
  const validTransitions = {
    'Đang xử lý': ['Xác nhận', 'Đã hủy'],  // Valid next statuses from "Đang xử lý"
    'Xác nhận': ['Đang chuẩn bị hàng',],
    'Đang chuẩn bị hàng': ['Đang giao'],
    'Đang giao': ['Đã giao', ],
    'Đã giao': [],
    'Đã hủy': [],
  };
  // Hàm tính toán các trang hiển thị
  const getPageRange = () => {
    const pageCount = totalPages;
    const currentPage = filters.page;
    const maxVisiblePages = 5; // Số trang tối đa hiển thị

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(pageCount, currentPage + Math.floor(maxVisiblePages / 2));

    // Điều chỉnh nếu số trang quá ít
    if (endPage - startPage < maxVisiblePages - 1) {
      if (startPage > 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      } else {
        endPage = Math.min(pageCount, startPage + maxVisiblePages - 1);
      }
    }

    return { startPage, endPage };
  };

  const { startPage, endPage } = getPageRange();

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await getallOrder(filters);
        setOrders(data.orders);
        setTotal(data.total);
      } catch (err) {
        console.error('Lỗi khi lấy đơn hàng:', err);
        setError(err.message || 'Lỗi không xác định');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [filters]);
const handleStatusChange = async (id, newStatus, currentStatus) => {
  // Ensure the currentStatus is valid and has transitions defined
  if (!currentStatus || !validTransitions[currentStatus]) {
    alert('Trạng thái hiện tại không hợp lệ hoặc không có trạng thái tiếp theo.');
    return;
  }

  // Check if the new status is a valid transition
  if (!validTransitions[currentStatus].includes(newStatus)) {
    alert('Không thể chuyển trạng thái này.');
    return;
  }

  // Validate if the new status is a valid status overall
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

    // Update UI
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
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="tile">
              <div className="btn_active mb-3 margin-right">
                {/* Filter buttons */}
                <button
                  className={`btn btn-sm me-2 ${filters.status === '' ? 'btn-success' : 'btn-outline-success'}`}
                  onClick={() => setFilters({ status: '', search: '', page: 1, limit: 10 })}
                >
                  Tất Cả
                </button>
                {/* Repeat for other status filters */}
                <button
                  className={`btn btn-sm me-2 ${filters.status === 'Đang xử lý' ? 'btn-success' : 'btn-outline-success'}`}
                  onClick={() => setFilters(prev => ({ ...prev, status: 'Đang xử lý', page: 1 }))}
                >
                  Đang xử lý
                </button>
               
                 <button
                  className={`btn btn-sm me-2 ${filters.status === 'Xác nhận' ? 'btn-success' : 'btn-outline-success'}`}
                  onClick={() => setFilters(prev => ({ ...prev, status: 'Xác nhận', page: 1 }))}
                >
                  Xác nhận
                </button>
                  <button
                  className={`btn btn-sm me-2 ${filters.status === 'Đang chuẩn bị hàng' ? 'btn-success' : 'btn-outline-success'}`}
                  onClick={() => setFilters(prev => ({ ...prev, status: 'Đang chuẩn bị hàng', page: 1 }))}
                >
                Đang chuẩn bị hàng
                </button>
                 <button
                  className={`btn btn-sm me-2 ${filters.status === 'Đang giao' ? 'btn-success' : 'btn-outline-success'}`}
                  onClick={() => setFilters(prev => ({ ...prev, status: 'Đang giao', page: 1 }))}
                >
                Đang giao
                </button>
                 <button
                  className={`btn btn-sm me-2 ${filters.status === 'Đã giao' ? 'btn-success' : 'btn-outline-success'}`}
                  onClick={() => setFilters(prev => ({ ...prev, status: 'Đã giao', page: 1 }))}
                >
               Đã giao
                </button>
                 <button
                  className={`btn btn-sm me-2 ${filters.status === 'Đã hủy' ? 'btn-success' : 'btn-outline-success'}`}
                  onClick={() => setFilters(prev => ({ ...prev, status: 'Đã hủy', page: 1 }))}
                >
                   Đã hủy
                </button>
                {/* Add other status buttons here */}
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
       <td className='item-select' >
  <select
    value={order.trang_thai}
    onChange={(e) =>
      handleStatusChange(order.id_don_hang, e.target.value, order.trang_thai)
    }
  >
    <option>{order.trang_thai}</option>
    
    {/* Safeguard against undefined transitions */}
    {validTransitions[order.trang_thai]
      ? validTransitions[order.trang_thai].map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))
      : <option disabled>No valid transitions</option>}
  </select>
</td>


                            <td>{order.dia_chi_day_du}</td>
                            <td style={{ textAlign: 'center' }}>{order.phuong_thuc_thanh_toan}</td>
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
          <ul className="pagination d-flex justify-content-center">
            {/* Previous button */}
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => setFilters(prev => ({ ...prev, page: Math.max(1, prev.page - 1) }))}
                disabled={filters.page === 1}
              >
                <FaArrowLeft />
              </button>
            </li>

            {/* Page numbers */}
            {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map(p => (
              <li key={p} className={`page-item ${filters.page === p ? 'active' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => setFilters(prev => ({ ...prev, page: p }))}
                >
                  {p}
                </button>
              </li>
            ))}

            {/* Next button */}
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => setFilters(prev => ({ ...prev, page: Math.min(totalPages, prev.page + 1) }))}
                disabled={filters.page === totalPages}
              >
                <FaArrowRight />
              </button>
            </li>
          </ul>
        </nav>
      </main>
    </div>
  );
}

export default OrderList;
