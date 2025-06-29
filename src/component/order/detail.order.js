import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AdminLayOut from '../adminLayOut';

const OrderDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrderDetail = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(`http://localhost:3000/admin/order/orderDetal/${id}`);
        if (!res.ok) throw new Error('Lỗi khi tải chi tiết đơn hàng');
        const data = await res.json();
        if (!data.success) throw new Error(data.message || 'Không tìm thấy đơn hàng');
        setOrder(data.order);
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
    <>
      {/* <AdminLayOut /> */}
      <div className='app-content' style={{
    maxWidth: '700px',
    margin: '40px auto',
    padding: '24px 32px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#333',
  }}
>
  <h2
    style={{
      marginBottom: '20px',
      color: '#2c3e50',
      borderBottom: '2px solid #3498db',
      paddingBottom: '8px',
      fontWeight: 700,
      fontSize: '28px',
    }}
  ></h2>
        <h2>Chi tiết đơn hàng #{order.id_don_hang}</h2>
          <p><strong>Khách hàng:</strong> {order.id_nguoi_dung}</p>

        <p><strong>Khách hàng:</strong> {order.ten_nguoi_dung}</p>
        <p><strong>Email:</strong> {order.email}</p>
        <p><strong>SĐT:</strong> {order.so_dien_thoai}</p>
        <p><strong>Ngày tạo:</strong> {new Date(order.ngay_tao).toLocaleString()}</p>
        <p><strong>Địa chỉ:</strong> {order.dia_chi_day_du}</p>
        <p><strong>Trạng thái đơn hàng:</strong> {order.trang_thai}</p>
        <p><strong>Phương thức thanh toán:</strong> {order.phuong_thuc_thanh_toan}</p>
        <p><strong>Trạng thái thanh toán:</strong> {order.trang_thai_thanh_toan}</p>
        <p><strong>Tổng giá:</strong> {order.tong_gia.toLocaleString()} VND</p>
        <p><strong>Ghi chú:</strong> {order.ghi_chu}</p>
      </div>
      </>

      
  );
};

export default OrderDetail;
