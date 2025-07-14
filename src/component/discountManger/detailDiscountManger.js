import React, { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import '../../css/style.css';
import AdminLayOut from '../adminLayOut';

function DisCountMangerDetail() {
  const { id_giam_gia } = useParams(); 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/admin/disCountManger/disCountMangerDetail/${id_giam_gia}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProduct(data.product);  
        } else {
          console.error("Error fetching product details");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product details:", err);
        setLoading(false);
      });
  }, [id_giam_gia]);

  if (loading) return <p>Đang tải chi tiết sản phẩm...</p>;
  if (!product) return <p>Không tìm thấy sản phẩm</p>;

  return (
    <>
      <AdminLayOut />

      <div className="container mt-4 container-detail">
        <NavLink to="/admin/disCountManger" className="btn btn-secondary mb-3">
          ← Quay lại danh sách
        </NavLink>
        <h2>Mã giảm giá: {product.ma_giam_gia}</h2>
        <div className="row">
          <div className="col-md-4">
            <img    className="img-fluid" src='https://quantrinhahang.edu.vn/wp-content/uploads/2019/06/fast-food-la-gi.jpg'/>

          </div>
          <div className="col-md-8">
            <p><strong>Tên:</strong> {product.ten}</p>
            <p><strong>Giá trị:</strong> {product.gia_tri} VND</p>
            <p><strong>Điều kiện:</strong> {product.dieu_kien}</p>
            <p><strong>Ngày bắt đầu:</strong> {new Date(product.ngay_bat_dau).toLocaleDateString()}</p>
            <p><strong>Ngày kết thúc:</strong> {new Date(product.ngay_ket_thuc).toLocaleDateString()}</p>
            <p><strong>Số lượng:</strong> {product.so_luong}</p>
            <p><strong>Số lượng còn lại:</strong> {product.so_luong_con_lai}</p>
            <p><strong>Trạng thái:</strong> {product.trang_thai === 'active' ? 'Đang hoạt động' : 'Không hoạt động'}</p>

            <NavLink
              to={`/admin/EditdisCountManger/${product.id_giam_gia}`}
              className="btn btn-primary btn-sm edit"
              title="Sửa"
            >
              <i className="fas fa-edit"></i>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default DisCountMangerDetail;
