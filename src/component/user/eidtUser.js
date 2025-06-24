import React, { useState } from 'react';
import './main.css'; // Giữ nguyên CSS cũ
import 'boxicons/css/boxicons.min.css';
import 'font-awesome/css/font-awesome.min.css';

const EditUser = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [newRole, setNewRole] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleImageRemove = () => {
    setImage(null);
    setPreview(null);
  };

  const handleModalToggle = () => setShowModal(!showModal);

  return (
    <div className="app sidebar-mini rtl">
    

      
      <main className="app-content">
        <div className="app-title">
          <ul className="app-breadcrumb breadcrumb">
            <li className="breadcrumb-item">Danh Sach Người Dùng</li>
            <li className="breadcrumb-item"><a href="#">Thêm Thêm Người Dùng</a></li>
          </ul>
        </div>

        <div className="tile">
          <h3 className="tile-title">Tạo mới Người Dùng</h3>
          <div className="tile-body">
            <div className="row element-button">
              <div className="col-sm-2">
                <button className="btn btn-add btn-sm" onClick={handleModalToggle}>
                  <b><i className="fas fa-folder-plus"></i> Tạo chức vụ mới</b>
                </button>
              </div>
            </div>

            <form className="row">
              <div className="form-group col-md-4">
                <label>ID_NGUOI_DUNG</label>
                <input className="form-control" type="text" />
              </div>
              <div className="form-group col-md-4">
                <label>Họ và tên</label>
                <input className="form-control" type="text" required />
              </div>
              <div className="form-group col-md-4">
                <label>Email</label>
                <input className="form-control" type="email" required />
              </div>
              <div className="form-group col-md-4">
                <label>Vai Trò</label>
                <input className="form-control" type="text" required />
              </div>
              <div className="form-group col-md-4">
                <label>Số điện thoại</label>
                <input className="form-control" type="tel" required />
              </div>
              <div className="form-group col-md-4">
                <label>Ngày Tạo</label>
                <input className="form-control" type="date" />
              </div>
            
              <div className="form-group col-md-12">
                <label>Ảnh 3x4 nhân viên</label>
                <input type="file" accept="image/*" onChange={handleImageChange} />
                {preview && (
                  <div style={{ position: 'relative', marginTop: '10px' }}>
                    <img src={preview} alt="Preview" width="200" />
                    <button type="button" className="removeimg" onClick={handleImageRemove}>×</button>
                  </div>
                )}
              </div>
            </form>
          </div>

          <button className="btn btn-save" type="submit">Lưu lại</button>
          <a className="btn btn-cancel" href="/doc/table-data-table.html">Hủy bỏ</a>
        </div>
      </main>

      {/* Modal */}
      {showModal && (
        <div className="modal show" style={{ display: 'block' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body">
            
             
                <button className="btn btn-save" onClick={() => alert(`Đã lưu: ${newRole}`)}>Lưu lại</button>
                <button className="btn btn-cancel" onClick={handleModalToggle}>Hủy bỏ</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditUser;
