import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Clock from '../clock';
import { FaEye } from 'react-icons/fa';

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Hàm fetch đơn hàng từ server
  const fetchOrders = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:3000/admin/order'); // URL backend API lấy danh sách đơn hàng
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

  // Hàm cập nhật trạng thái đơn hàng
  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`http://localhost:3000/admin/order/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trang_thai: newStatus }),
      });
      const data = await res.json();
      if (!data.success) {
        alert(data.message || 'Cập nhật trạng thái thất bại');
        return;
      }
      // Cập nhật trạng thái trong state để UI thay đổi ngay
      setOrders((prev) =>
        prev.map((order) =>
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
                {error && <p style={{color: 'red'}}>{error}</p>}

                {!loading && !error && (
                  <table className="table table-hover table-bordered" id="orderTable">
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
                                onChange={(e) => handleStatusChange(order.id_don_hang, e.target.value)}
                              >
                                <option value="cho_duyet">Chờ duyệt</option>
                                <option value="dang_xu_ly">Đang xử lý</option>
                                <option value="hoan_thanh">Hoàn thành</option>
                                <option value="huy">Hủy</option>
                              </select>
                            </td>
                            <td>{order.tong_gia.toLocaleString()} VND</td>
                            <td>
                              <Link to={`/admin/OrderDetail/${order.id_don_hang}`} className="btn btn-sm btn-info" title="Xem chi tiết">
                                <FaEye />
                              </Link>
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
