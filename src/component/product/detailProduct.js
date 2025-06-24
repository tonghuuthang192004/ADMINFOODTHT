import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import AppHeader from '../utils/header/header';

import Sidebar from '../utils/sidebar/sidebar';
import '../../css/style.css'
import AdminLayOut from '../adminLayOut';
function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/admin/products/productDetail/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.product); // Giả sử API trả về { product: {...} }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Lỗi khi lấy chi tiết sản phẩm:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Đang tải chi tiết sản phẩm...</p>;
  if (!product) return <p>Không tìm thấy sản phẩm</p>;

  return (
    <>
  <AdminLayOut/>

        <div className="container mt-4 container-detail">
      <a href="/admin/Product" className="btn btn-secondary mb-3">← Quay lại danh sách</a>
      <h2>Chi tiết sản phẩm #{product.id_san_pham}</h2>
      <div className="row">
        <div className="col-md-4">
          <img
            src={
              product.hinh_anh?.startsWith('http')
                ? product.hinh_anh
                : `http://localhost:3000/uploads/${product.hinh_anh}`
            }
            alt={product.ten}
            className="img-fluid"
          />
        </div>
        <div className="col-md-8">
          <p><strong>Tên:</strong> {product.ten}</p>
          <p><strong>Giá:</strong> {product.gia} VND</p>
          <p><strong>Mô tả:</strong> {product.mo_ta}</p>
          <p><strong>Trạng thái:</strong> {product.trang_thai}</p>
          <p><strong>Danh mục:</strong> {product.id_danh_muc}</p>
          <p><strong>Ngày cập nhật:</strong> {product.ngay_cap_nhat}</p>
          <p><strong>Ngày Tao:</strong> {product.ngay_tao}</p>

   <button
                            className="btn btn-primary btn-sm edit"
                            title="Sửa"
                            data-toggle="modal"
                            button-delete
                            data-id=""
                            data-target="#ModalUP"
                          >
                            <a to="/admin/EditProduct" >
                             <i className="fas fa-edit"></i>
                            </a>
                           
                          </button>
        </div>
        
      </div>
    </div>
    </>
  
  );
}

export default ProductDetail;
