import React from 'react';
import { Link } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import Clock from '../clock';

function Category() {
  return (
    <div className="app sidebar-mini rtl">
      <main className="app-content">
        <div className="app-title">
          <ul className="app-breadcrumb breadcrumb side">
            <li className="breadcrumb-item active">
              <a href="#"><b>Danh sách Danh Mục</b></a>
            </li>
          </ul>
          <div id="clock">
            <Clock />
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="tile">
              <div className="tile-body">
                <div className="row element-button">
                  <div className="col-sm-2">
                    <Link className="btn btn-add btn-sm" to="/admin/AddProduct" title="Thêm">
                      <i className="fas fa-plus"></i> Tạo Mới Danh Mục
                    </Link>
                  </div>
                </div>

                <div className="card mb-6">
                  <div className="card-body">
                    <div className="btn_active mb-3">
                      {/* <button className="btn btn-sm btn-outline-success me-2">Tất Cả</button>
                      <button className="btn btn-sm btn-outline-success me-2">Hoạt Động</button>
                      <button className="btn btn-sm btn-outline-success">Dừng Hoạt Động</button> */}
                    </div>

                    <div className="form-search mb-3">
                      <form id="form-search">
                        <div className="input-group">
                          <input type="text" placeholder="nhập từ khóa" name="keyword" className="form-control" />
                          <button className="btn btn-success btn-css" type="submit">Tìm</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>

                {/* <div style={{ marginBottom: '1rem' }} className='selected_all'>
                  <div className='selected_product'>
                    <select className="form-control" style={{ width: '150px', display: 'inline-block', marginRight: '10px' }}>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="delete">Xóa tất cả</option>
                    </select>
                    <button className="btn btn-primary">Cập nhật</button>
                  </div>

                  <div className='selected_id'>
                    <label>Danh sách ID sản phẩm được chọn:</label>
                    <input type="text" readOnly value="" style={{ width: '100%', padding: '8px' }} />
                  </div>

                  <p style={{ color: 'green', marginTop: '10px' }}></p>
                </div> */}

                <table className="table table-hover table-bordered" id="sampleTable">
                  <thead>
                    <tr>
                      <th width="10"><input type="checkbox" id="all" /></th>
                      <th>id Danh mục</th>
                      <th>Tên Danh Mục</th>
                      <th>Tiêu Đề</th>
                      <th>Trạng Thái</th>
                      <th>Ngày Tạo</th>
                      <th>Chức năng</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><input type="checkbox" name="check1" /></td>
                      <td>001</td>
                      <td>Sản phẩm mẫu</td>
                      <td><img src="http://placehold.it/100x100" alt="sample" width="100" /></td>
                      <td><span className="badge bg-success">active</span></td>
                      <td>100.000</td>
                      
                 

                      <td className='button-action'>
                        <button className="btn btn-primary btn-sm trash" title="Xóa">
                          <i className="fa-solid fa-trash"></i>
                        </button>
                        <button className="btn btn-primary btn-sm edit" title="Sửa">
                          <Link to="/admin/EditProduct"><i className="fas fa-edit"></i></Link>
                        </button>
                        <button className="btn btn-primary btn-sm edit" title="Chi Tiet San Pham">
                          <Link to="/admin/ProductDetail/001"><FaEye /></Link>
                        </button>
                      </td>
                    </tr>
                    {/* Có thể thêm nhiều dòng giả ở đây */}
                  </tbody>
                </table>

                <div style={{ marginTop: '1rem' }}></div>
              </div>
            </div>
          </div>
        </div>

        <nav>
          <ul className="pagination">
            <li className="page-item"><button className="page-link">Trang trước</button></li>
            <li className="page-item active"><button className="page-link">1</button></li>
            <li className="page-item"><button className="page-link">2</button></li>
            <li className="page-item"><button className="page-link">3</button></li>
            <li className="page-item"><button className="page-link">Kế tiếp</button></li>
          </ul>
        </nav>
      </main>
    </div>
  );
}

export default Category;
