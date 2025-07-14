import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import AppHeader from '../utils/header/header';
import Sidebar from '../utils/sidebar/sidebar';
import Swal from 'sweetalert2';
import AdminLayOut from '../adminLayOut';
import { Editor } from '@tinymce/tinymce-react';

const AddProduct = () => {
  const [category, setCategory] = useState([]);
  const [preview, setPreview] = useState(null);
  const editorRef = useRef(null);

  // THÔNG BÁO 
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axios.get('http://localhost:3000/admin/category');
        setCategory(res.data);
      } catch (error) {
        console.error('Lỗi lấy danh mục:', error);
      }
    };

    fetchCategory();
  }, []);

  const [formData, setFormData] = useState({
    ten: '',
    id_danh_muc: '',
    gia: '',
    mo_ta: '',
    trang_thai: '',
    deleted: 0,
    noi_bat: 0         // Nổi bật (0 hoặc 1)
  });

  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setFileName(file.name);
    setPreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setImage(null);
    setFileName('');
    setPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const now = new Date().toISOString().split('T')[0];

    const formDataToSend = new FormData();
    formDataToSend.append('ten', formData.ten);
    formDataToSend.append('id_danh_muc', formData.id_danh_muc);
    formDataToSend.append('gia', formData.gia);
    formDataToSend.append('mo_ta', formData.mo_ta);
    formDataToSend.append('trang_thai', formData.trang_thai);
    formDataToSend.append('deleted', 0);
    formDataToSend.append('noi_bat', formData.noi_bat);              // Nổi bật
    formDataToSend.append('ngay_tao', now);
    formDataToSend.append('ngay_cap_nhat', now);
    if (image) {
      formDataToSend.append('hinh_anh', image);
    }

    try {
      const response = await axios.post(
        'http://localhost:3000/admin/products/create-product',
        formDataToSend
      );
      Swal.fire({
        icon: 'success',
        title: 'Thành công',
        text: 'Thêm sản phẩm thành công!',
        timer: 2000,
        showConfirmButton: false,
      });

      setFormData({
        ten: '',
        id_danh_muc: '',
        gia: '',
        mo_ta: '',
        trang_thai: '',
        deleted: 0,
        noi_bat: 0          // Reset giá trị
      });
      setImage(null);
      setFileName('');
      setPreview(null);
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: err.response?.data?.error || 'Đã xảy ra lỗi khi thêm sản phẩm',
      });
    }
  };

  return (
    <>
      <AdminLayOut />
      <main className="app-content">
        <div className="app-title">
          <ul className="app-breadcrumb breadcrumb">
            <li className="breadcrumb-item">Danh sách sản phẩm</li>
            <li className="breadcrumb-item">
              <a href="#">Thêm sản phẩm</a>
            </li>
          </ul>
        </div>
        <div className="tile">
          <h3 className="tile-title">Tạo mới sản phẩm</h3>

          <form className="row" onSubmit={handleSubmit} encType="multipart/form-data">
            {/* Tên sản phẩm */}
            <div className="form-group col-md-3">
              <label>Tên sản phẩm</label>
              <input
                name="ten"
                className="form-control"
                type="text"
                value={formData.ten}
                onChange={handleChange}
                required
              />
            </div>

            {/* Giá sản phẩm */}
            <div className="form-group col-md-3">
              <label>Giá bán</label>
              <input
                name="gia"
                className="form-control"
                type="number"
                min="0"
                value={formData.gia}
                onChange={handleChange}
                required
              />
            </div>

            {/* Tình trạng */}
            <div className="form-group col-md-3">
              <label>Tình trạng</label>
              <select
                name="trang_thai"
                className="form-control"
                value={formData.trang_thai}
                onChange={handleChange}
                required
              >
                <option value="">-- Chọn tình trạng --</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            {/* Danh mục */}
            <div className="form-group col-md-3">
              <label>Danh mục</label>
              <select
                name="id_danh_muc"
                className="form-control"
                value={formData.id_danh_muc}
                onChange={handleChange}
                required
              >
                <option value="">-- Chọn danh mục --</option>
                {category.map((item) => (
                  <option key={item.id_danh_muc} value={item.id_danh_muc}>
                    {item.id_danh_muc} - {item.ten}
                  </option>
                ))}
              </select>
            </div>

            {/* Số lượng kho */}
           

            {/* Nổi bật */}
            <div className="form-group col-md-3">
              <label>Nổi bật</label>
              <select
                name="noi_bat"
                className="form-control"
                value={formData.noi_bat}
                onChange={handleChange}
                required
              >
                <option value="0">Không nổi bật</option>
                <option value="1">Nổi bật</option>
              </select>
            </div>

            {/* Ảnh sản phẩm */}
            <div className="form-group col-md-12">
              <label>Ảnh sản phẩm</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                name="hinh_anh"
              />
              {preview && (
                <div style={{ position: 'relative', width: 400 }}>
                  <img
                    src={preview}
                    alt="Preview"
                    style={{ width: '100%', marginTop: '10px' }}
                  />
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
                      cursor: 'pointer',
                    }}
                  >
                    ×
                  </button>
                </div>
              )}
              {fileName && <p style={{ marginTop: '10px' }}>{fileName}</p>}
            </div>

            {/* Mô tả sản phẩm */}
            <div className="form-group col-md-12">
              <label>Mô tả sản phẩm</label>
              <Editor
              apiKey="9kyol25jpp20dl4q5gszb4weywn41lgftl28za01bhkknycn"
                onInit={(evt, editor) => (editorRef.current = editor)}
                value={formData.mo_ta}
                init={{
                  height: 300,
                  menubar: false,
                  plugins: ['lists', 'link', 'image', 'table', 'code'],
                  toolbar:
                    'undo redo | bold italic | alignleft aligncenter alignright | bullist numlist | link image',
                }}
                onEditorChange={(newValue) => setFormData({ ...formData, mo_ta: newValue })}
              />
            </div>

            {/* Submit Button */}
            <div className="form-group col-md-12">
              <button type="submit" className="btn btn-primary">
                Thêm sản phẩm
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default AddProduct;

