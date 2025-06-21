import AppHeader from '../utils/header/header';
import Sidebar from '../utils/sidebar/sidebar';

function EditProduct() {
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
          <h3 className="tile-title">Tạo mới sản phẩm</h3>
          <form className="row">
            <div className="form-group col-md-3">
              <label>Tên sản phẩm</label>
              <input
                name="ten"
                className="form-control"
                type="text"
                required
              />
            </div>
            <div className="form-group col-md-3">
              <label>Giá bán</label>
              <input
                name="gia"
                className="form-control"
                type="number"
                min="0"
                required
              />
            </div>
            <div className="form-group col-md-3">
              <label>Tình trạng</label>
              <select
                name="trang_thai"
                className="form-control"
                required
              >
                <option value="">-- Chọn tình trạng --</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="form-group col-md-3">
              <label>Danh mục</label>
              <select
                name="id_danh_muc"
                className="form-control"
                required
              >
                <option value="">-- Chọn danh mục --</option>
                <option value="1"></option>
                <option value="2"></option>
                {/* Thêm các option khác nếu muốn */}
              </select>
            </div>

            <div className="form-group col-md-12">
              <label>Ảnh sản phẩm</label>
              <input type="file" accept="image/*" />
              {/* Nếu cần hiển thị ảnh mẫu, thêm ở đây */}
            </div>

            <div className="form-group col-md-12">
              <label>Mô tả sản phẩm</label>
              <textarea
                name="mo_ta"
                className="form-control"
                rows={4}
              />
            </div>

            <div className="form-group col-md-12">
              <button className="btn btn-save" type="submit">
                Lưu lại
              </button>
              <a
                className="btn btn-cancel"
                href="/product-list"
                style={{ marginLeft: '10px' }}
              >
                Hủy bỏ
              </a>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

export default EditProduct;
