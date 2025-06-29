import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import AdminLayOut from '../adminLayOut';
import Clock from '../clock';

function EditDisCountManger() {
  const navigate = useNavigate();
  const { id_giam_gia } = useParams();
  console.log("ID:", id_giam_gia);

  const [formData, setFormData] = useState({
    ten: '',
    loai: '',
    gia_tri: '',
    dieu_kien: '',
    trang_thai: '',
    ngay_bat_dau: '',
    ngay_ket_thuc: '',
    so_luong: '',
  });

  useEffect(() => {
    fetch(`http://localhost:3000/admin/disCountManger/edit-discountManger/${id_giam_gia}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const item = data[0];
          setFormData({
            ten: item.ten || '',
            loai: item.loai || '',
            gia_tri: item.gia_tri || '',
            dieu_kien: item.dieu_kien || '',
            trang_thai: item.trang_thai?.toLowerCase() || '',
            ngay_bat_dau: item.ngay_bat_dau?.split('T')[0] || '',
            ngay_ket_thuc: item.ngay_ket_thuc?.split('T')[0] || '',
            so_luong: item.so_luong || '',
          });
        } else {
          Swal.fire('Lỗi', 'Không tìm thấy mã giảm giá', 'error');
          navigate('/admin/Discountmanger');
        }
      })
      .catch((err) => {
        console.error('Lỗi khi lấy dữ liệu:', err);
        Swal.fire('Lỗi', 'Không thể lấy dữ liệu từ server', 'error');
      });
  }, [id_giam_gia]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/admin/disCountManger/edit-discountManger/${id_giam_gia}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire('Thành công', 'Cập nhật thành công!', 'success').then(() => {
          navigate('/admin/Discountmanger');
        });
      } else {
        Swal.fire('Lỗi', data.message || 'Cập nhật thất bại', 'error');
      }
    } catch (error) {
      console.error('Lỗi khi gửi dữ liệu:', error);
      Swal.fire('Lỗi', 'Lỗi server khi gửi dữ liệu', 'error');
    }
  };

  return (
    <>
      <AdminLayOut />
      <div className="app sidebar-mini rtl">
        <main className="app-content">
          <div className="app-title">
            <ul className="app-breadcrumb breadcrumb side">
              <li className="breadcrumb-item">
                <a href="#"><b>Sửa Mã Khuyến Mãi</b></a>
              </li>
            </ul>
            <div id="clock"><Clock /></div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="tile">
                <h3 className="tile-title">Chỉnh sửa mã khuyến mãi</h3>
                <div className="tile-body">
                  <form onSubmit={handleSubmit}>
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
                      <select className="form-control" name="trang_thai" value={formData.trang_thai} onChange={handleChange}>
                        <option value="">-- Chọn trạng thái --</option>
                        <option value="active">Hoạt động</option>
                        <option value="inactive">Không hoạt động</option>
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

export default EditDisCountManger;
