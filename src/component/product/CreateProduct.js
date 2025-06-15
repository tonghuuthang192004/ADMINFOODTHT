import React, { useState } from 'react';
import AppHeader from '../utils/header/header';
import Sidebar from '../utils/sidebar/sidebar';


const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImage(null);
    setFileName('');
  };

  return (
    <>
    <AppHeader/>
    <Sidebar/>
     <main className="app-content">
      <div className="app-title">
        <ul className="app-breadcrumb breadcrumb">
          <li className="breadcrumb-item">Danh sách sản phẩm</li>
          <li className="breadcrumb-item"><a href="#">Thêm sản phẩm</a></li>
        </ul>
      </div>
      <div className="tile">
        <h3 className="tile-title">Tạo mới sản phẩm</h3>
        <form className="row">
          <div className="form-group col-md-3">
            <label>Mã sản phẩm</label>
            <input className="form-control" type="number" />
          </div>
          <div className="form-group col-md-3">
            <label>Tên sản phẩm</label>
            <input className="form-control" type="text" />
          </div>
          <div className="form-group col-md-3">
            <label>Số lượng</label>
            <input className="form-control" type="number" />
          </div>
          <div className="form-group col-md-3">
            <label>Tình trạng</label>
            <select className="form-control">
              <option>-- Chọn tình trạng --</option>
              <option>Còn hàng</option>
              <option>Hết hàng</option>
            </select>
          </div>
          <div className="form-group col-md-3">
            <label>Danh mục</label>
            <select className="form-control">
              <option>-- Chọn danh mục --</option>
              <option>Bàn ăn</option>
              <option>Bàn thông minh</option>
              {/* ...các danh mục khác */}
            </select>
          </div>
          <div className="form-group col-md-3">
            <label>Nhà cung cấp</label>
            <select className="form-control">
              <option>-- Chọn nhà cung cấp --</option>
              <option>Phong Vũ</option>
              <option>Thế giới di động</option>
              {/* ... */}
            </select>
          </div>
          <div className="form-group col-md-3">
            <label>Giá bán</label>
            <input className="form-control" type="text" />
          </div>
          <div className="form-group col-md-3">
            <label>Giá vốn</label>
            <input className="form-control" type="text" />
          </div>

          <div className="form-group col-md-12">
            <label>Ảnh sản phẩm</label>
            <input type="file" onChange={handleImageChange} />
            {image && (
              <div style={{ position: 'relative', width: 400 }}>
                <img src={image} alt="Preview" style={{ width: '100%', marginTop: '10px' }} />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  style={{
                    position: 'absolute',
                    top: 10,
                    left: 10,
                    backgroundColor: 'red',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: 25,
                    height: 25,
                    cursor: 'pointer'
                  }}
                >
                  ×
                </button>
              </div>
            )}
            {fileName && <p style={{ marginTop: '10px' }}>{fileName}</p>}
          </div>

          <div className="form-group col-md-12">
            <label>Mô tả sản phẩm</label>
            <textarea className="form-control" name="mota" />
          </div>

          <div className="form-group col-md-12">
            <button className="btn btn-save" type="submit">Lưu lại</button>
            <a className="btn btn-cancel" href="/product-list">Hủy bỏ</a>
          </div>
        </form>
      </div>
    </main>
    </>
   
  );
};

export default AddProduct;