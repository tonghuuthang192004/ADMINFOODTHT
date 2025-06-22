import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AppHeader from '../utils/header/header';
import Sidebar from '../utils/sidebar/sidebar';

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    ten: '',
    gia: '',
    trang_thai: '',
    id_danh_muc: '',
    mo_ta: '',
    hinh_anh: null,
    hinh_anh_cu: '', // Để lưu ảnh cũ
  });

  const [categories, setCategories] = useState([]);

  // Lấy danh mục từ server
  useEffect(() => {
    fetch('http://localhost:3000/admin/category')  // Đảm bảo URL lấy danh mục là chính xác
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);  // Lưu danh mục vào state categories
      })
      .catch((err) => console.error('Lỗi lấy danh mục:', err));
  }, []);

  // Lấy thông tin sản phẩm khi page load
  useEffect(() => {
    fetch(`http://localhost:3000/admin/products/edit-product/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct({
          ten: data.ten,
          gia: data.gia,
          trang_thai: data.trang_thai,
          id_danh_muc: data.id_danh_muc, // Gán danh mục cho sản phẩm
          mo_ta: data.mo_ta,
          hinh_anh: data.hinh_anh, // không load ảnh cũ vào input file
          
        });
      })
      .catch((err) => console.error('Lỗi lấy sản phẩm:', err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setProduct((prev) => ({ ...prev, hinh_anh: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('ten', product.ten);
    formData.append('gia', product.gia);
    formData.append('trang_thai', product.trang_thai);
    formData.append('id_danh_muc', product.id_danh_muc);
    formData.append('mo_ta', product.mo_ta);

    if (product.hinh_anh) {
      formData.append('hinh_anh', product.hinh_anh);
    } else {
      formData.append('hinh_anh_cu', product.hinh_anh_cu || ''); // Thêm trường ảnh cũ
    }

    try {
      const response = await fetch(`http://localhost:3000/admin/products/edit-product/${id}`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Cập nhật sản phẩm thành công!');
        navigate('/admin/Product');
      } else {
        const data = await response.json();
        alert(`Cập nhật thất bại! ${data.message}`);
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật:', error);
    }
  };

  return (
    <>
      <AppHeader />
      <Sidebar />
      <main className="app-content">
        <div className="app-title">
          <ul className="app-breadcrumb breadcrumb">
            <li className="breadcrumb-item">Danh sách sản phẩm</li>
            <li className="breadcrumb-item">
              <a href="#">Sửa Sản phẩm</a>
            </li>
          </ul>
        </div>
        <div className="tile">
          <h3 className="tile-title">Sửa sản phẩm</h3>
          <form className="row" onSubmit={handleSubmit}>
            <div className="form-group col-md-3">
              <label>Tên sản phẩm</label>
              <input name="ten" className="form-control" type="text" required value={product.ten} onChange={handleChange} />
            </div>

            <div className="form-group col-md-3">
              <label>Giá bán</label>
              <input name="gia" className="form-control" type="number" min="0" required value={product.gia} onChange={handleChange} />
            </div>

            <div className="form-group col-md-3">
              <label>Tình trạng</label>
              <select name="trang_thai" className="form-control" required value={product.trang_thai} onChange={handleChange}>
                <option value="">-- Chọn tình trạng --</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div className="form-group col-md-3">
              <label>Danh mục</label>
              <select name="id_danh_muc" className="form-control" required value={product.id_danh_muc} onChange={handleChange}>
                <option value="">-- Chọn danh mục --</option>
                {categories.map((item) => (
                  <option key={item.id_danh_muc} value={item.id_danh_muc}>
                    {item.id_danh_muc} - {item.ten}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group col-md-12">
  <label>Ảnh sản phẩm</label>
  
  {/* Hiển thị ảnh cũ nếu có */}

 {product.hinh_anh && (
  <div>
    <img
      src={
        typeof product.hinh_anh === 'string' && product.hinh_anh.startsWith('http')
          ? product.hinh_anh // Nếu là string và bắt đầu bằng http, đó là URL ảnh cũ
          : product.hinh_anh instanceof File
          ? URL.createObjectURL(product.hinh_anh) // Nếu là đối tượng File, tạo URL tạm thời
          : `http://localhost:3000/uploads/${product.hinh_anh}` // Nếu không, giả sử là đường dẫn ảnh cũ
      }
      alt={product.ten}
      width="100"
    />
  </div>
)}

  {/* Input file để người dùng chọn ảnh mới */}
  <input 
    type="file" 
    accept="image/*" 
    onChange={handleFileChange} 
  />
</div>

            <div className="form-group col-md-12">
              <label>Mô tả sản phẩm</label>
              <textarea name="mo_ta" className="form-control" rows={4} value={product.mo_ta} onChange={handleChange} />
            </div>

            <div className="form-group col-md-12">
              <button className="btn btn-save" type="submit">Lưu lại</button>
              <a className="btn btn-cancel" href="/admin/Product" style={{ marginLeft: '10px' }}>Hủy bỏ</a>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

export default EditProduct;
