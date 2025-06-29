import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import AdminLayOut from '../adminLayOut';
import Clock from '../clock';

function AddDisCountManger() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    ten: '',
    loai: 'phan_tram', // hoặc 'tien_mat'
    gia_tri: '',
    dieu_kien: '',
    trang_thai:'active',
    ngay_bat_dau: '',
    ngay_ket_thuc: '',
    so_luong: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra đơn giản
    if (!formData.ten) {
      Swal.fire('Lỗi', 'Vui lòng nhập đầy đủ thông tin!', 'warning');
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/admin/disCountManger/createDisCountManger', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success) {
        Swal.fire('Thành công', 'Thêm mã khuyến mãi thành công!', 'success').then(() => {
          navigate('/admin/Discountmanger');
        });
      } else {
        Swal.fire('Lỗi', data.message || 'Không thể thêm mã khuyến mãi', 'error');
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Lỗi', 'Đã xảy ra lỗi trong quá trình thêm mã khuyến mãi.', 'error');
    }
  };

  return (
    <>
      <AdminLayOut />
      <div className="app sidebar-mini rtl">
        <main className="app-content">
          <div className="app-title">
            <ul className="app-breadcrumb breadcrumb side">
              <li className="breadcrumb-item"><a href="#"><b>Thêm Mã Khuyến Mãi</b></a></li>
            </ul>
            <div id="clock"><Clock /></div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="tile">
                <h3 className="tile-title">Thêm mã khuyến mãi mới</h3>
                <div className="tile-body">
                  <form onSubmit={handleSubmit}>
                    {/* <div className="form-group">
                      <label>Mã giảm giá</label>
                      <input type="text" className="form-control" name="ma_giam_gia" value={formData.ma_giam_gia} readOnly />
                    </div> */}
                    <div className="form-group">
                      <label>Tên chương trình</label>
                      <input type="text" className="form-control" name="ten" value={formData.ten} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                      <label>Loại</label>
                      <select className="form-control" name="loai" value={formData.loai} onChange={handleChange}>
                        <option value="phan_tram">Phần trăm (%)</option>
                        <option value="tien_mat">Tiền mặt (VNĐ)</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Giá trị</label>
                      <input type="number" className="form-control" name="gia_tri" value={formData.gia_tri} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                      <label>Điều kiện</label>
                      <input type="text" className="form-control" name="dieu_kien" value={formData.dieu_kien} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                      <label>Ngày bắt đầu</label>
                      <input type="date" className="form-control" name="ngay_bat_dau" value={formData.ngay_bat_dau} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                      <label>Ngày kết thúc</label>
                      <input type="date" className="form-control" name="ngay_ket_thuc" value={formData.ngay_ket_thuc} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                      <label>Số lượng</label>
                      <input type="number" className="form-control" name="so_luong" value={formData.so_luong} onChange={handleChange} />
                    </div>
                  <div className="form-group">
  <label>Trạng thái</label>
  <select
    className="form-control"
    name="trang_thai"
    value={formData.trang_thai}
    onChange={handleChange}
  >
    <option value="">-- Chọn trạng thái --</option>
    <option value="active">Active</option>
    <option value="inactive">InActive</option>
  </select>
</div>

                    <div className="form-group mt-3">
                      <button type="submit" className="btn btn-save">Lưu lại</button>
                      <button type="button" className="btn btn-cancel ms-2" onClick={() => navigate(-1)}>Hủy bỏ</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default AddDisCountManger;
