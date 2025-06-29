import React, { useEffect, useState } from 'react';
import { FaEye } from 'react-icons/fa';
import Clock from '../clock';

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validStatuses = ['Đang xử lý', 'Xác nhận', 'Chờ thanh toán', 'Đã giao', 'Đã hủy'];

  // Lấy danh sách đơn hàng
  const fetchOrders = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:3000/admin/order');
      if (!res.ok) throw new Error('Lỗi khi tải dữ liệu đơn hàng');
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      setError(err.message || 'Lỗi không xác định');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Cập nhật trạng thái đơn hàng
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
                        <th>Tổng giá</th>
                        <th>Chức năng</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.length === 0 ? (
                        <tr><td colSpan="7">Không có đơn hàng nào</td></tr>
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
      </main>
    </div>
  );
}

export default OrderList;
