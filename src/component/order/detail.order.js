import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrderDetail = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(`http://localhost:3000/admin/order/orderDetal/${id}`);
        if (!res.ok) throw new Error('Lỗi khi tải chi tiết đơn hàng');
        const data = await res.json();
        if (!data.success) throw new Error(data.message || 'Không tìm thấy đơn hàng');
        setOrder(data.product);
      } catch (err) {
        setError(err.message || 'Lỗi không xác định');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetail();
  }, [id]);

  if (loading) return <p>Đang tải chi tiết đơn hàng...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!order) return <p>Không có dữ liệu đơn hàng.</p>;

  return (
    <div className="container mt-4">
      <h2>Chi tiết đơn hàng #{order.id_don_hang}</h2>
      <p><strong>Khách hàng:</strong> {order.ten_nguoi_dung}</p>
      <p><strong>Email:</strong> {order.email}</p>
      <p><strong>SĐT:</strong> {order.so_dien_thoai}</p>
      <p><strong>Ngày tạo:</strong> {new Date(order.ngay_tao).toLocaleString()}</p>
      <p><strong>Địa chỉ:</strong> {order.dia_chi_day_du}</p>
      <p><strong>Trạng thái đơn hàng:</strong> {order.trang_thai}</p>
      <p><strong>Thanh toán:</strong> {order.trang_thai_thanh_toan}</p>

      <h4 className="mt-4">Sản phẩm:</h4>
      <ul>
        {order.chi_tiet_san_pham.map((item) => (
          <li key={item.id_chi_tiet}>
            {item.ten_san_pham} - SL: {item.so_luong} - Giá: {item.gia_don_vi.toLocaleString()} VND
          </li>
        ))}
      </ul>

      <h4 className="mt-4">Lịch sử trạng thái:</h4>
      <ul>
        {order.lich_su_trang_thai.map((ls, index) => (
          <li key={index}>
            {new Date(ls.thoi_gian).toLocaleString()} - <strong>{ls.trang_thai}</strong>: {ls.mo_ta}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderDetail;
