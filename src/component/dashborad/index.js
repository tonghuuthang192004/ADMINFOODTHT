import React from 'react';
import Clock from '../clock';
import { LineChart, BarChart } from '../chart/chart';
import {  FaUsers,FaShoppingCart,FaClipboardList,FaExclamationTriangle } from 'react-icons/fa';
function IndexDashBoard() {
  const currentYear = new Date().getFullYear();

  return (
    <main className="app-content">
      <div className="row">
        <div className="col-md-12">
          <div className="app-title">
            <ul className="app-breadcrumb breadcrumb">
              <li className="breadcrumb-item">
                <a href="#"><b>Bảng điều khiển</b></a>
              </li>
            </ul>
            <div id="clock"><Clock /></div>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Left Column */}
        <div className="col-md-12 col-lg-6">
          <div className="row">
            {/* Widget 1 */}
            <div className="col-md-6">
              <div className="widget-small primary coloured-icon">
                  <FaUsers className='Icon_react' /> 
                <div className="info">
                  <h4>Tổng khách hàng</h4>
                  <p><b>56 khách hàng</b></p>
                  <p className="info-tong">Tổng số khách hàng được quản lý.</p>
                </div>
              </div>
            </div>
            {/* Widget 2 */}
            <div className="col-md-6">
              <div className="widget-small info coloured-icon">
                <FaShoppingCart className='Icon_react'/>

                <div className="info">
                  <h4>Tổng sản phẩm</h4>
                  <p><b>1850 sản phẩm</b></p>
                  <p className="info-tong">Tổng số sản phẩm được quản lý.</p>
                </div>
              </div>
            </div>
            {/* Widget 3 */}
            <div className="col-md-6">
              <div className="widget-small warning coloured-icon">
               <FaClipboardList className='Icon_react'/>
                <div className="info">
                  <h4>Tổng đơn hàng</h4>
                  <p><b>247 đơn hàng</b></p>
                  <p className="info-tong">Tổng số hóa đơn bán hàng trong tháng.</p>
                </div>
              </div>
            </div>
            {/* Widget 4 */}
            <div className="col-md-6">
              <div className="widget-small danger coloured-icon">
              <FaExclamationTriangle className='Icon_react'/>
                <div className="info">
                  <h4>Sắp hết hàng</h4>
                  <p><b>4 sản phẩm</b></p>
                  <p className="info-tong">Số sản phẩm cảnh báo hết cần nhập thêm.</p>
                </div>
              </div>
            </div>
            {/* Table tình trạng đơn hàng */}
            <div className="col-md-12">
              <div className="tile">
                <h3 className="tile-title">Tình trạng đơn hàng</h3>
                <div>
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>ID đơn hàng</th>
                        <th>Tên khách hàng</th>
                        <th>Tổng tiền</th>
                        <th>Trạng thái</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>AL3947</td>
                        <td>Phạm Thị Ngọc</td>
                        <td>19.770.000 đ</td>
                        <td><span className="badge bg-info">Chờ xử lý</span></td>
                      </tr>
                      <tr>
                        <td>ER3835</td>
                        <td>Nguyễn Thị Mỹ Yến</td>
                        <td>16.770.000 đ</td>
                        <td><span className="badge bg-warning">Đang vận chuyển</span></td>
                      </tr>
                      <tr>
                        <td>MD0837</td>
                        <td>Triệu Thanh Phú</td>
                        <td>9.400.000 đ</td>
                        <td><span className="badge bg-success">Đã hoàn thành</span></td>
                      </tr>
                      <tr>
                        <td>MT9835</td>
                        <td>Đặng Hoàng Phúc</td>
                        <td>40.650.000 đ</td>
                        <td><span className="badge bg-danger">Đã hủy</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {/* Table khách hàng mới */}
            <div className="col-md-12">
              <div className="tile">
                <h3 className="tile-title">Khách hàng mới</h3>
                <div>
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Tên khách hàng</th>
                        <th>Ngày sinh</th>
                        <th>Số điện thoại</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>#183</td>
                        <td>Hột vịt muối</td>
                        <td>21/7/1992</td>
                        <td><span className="tag tag-success">0921387221</span></td>
                      </tr>
                      <tr>
                        <td>#219</td>
                        <td>Bánh tráng trộn</td>
                        <td>30/4/1975</td>
                        <td><span className="tag tag-warning">0912376352</span></td>
                      </tr>
                      <tr>
                        <td>#627</td>
                        <td>Cút rang bơ</td>
                        <td>12/3/1999</td>
                        <td><span className="tag tag-primary">01287326654</span></td>
                      </tr>
                      <tr>
                        <td>#175</td>
                        <td>Hủ tiếu nam vang</td>
                        <td>4/12/20000</td>
                        <td><span className="tag tag-danger">0912376763</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Left */}

        {/* Right Column */}
        <div className="col-md-12 col-lg-6">
          <div className="row">
            {/* Line Chart */}
            <div className="col-md-12">
              <div className="tile">
                <h3 className="tile-title">Dữ liệu 6 tháng đầu vào</h3>
                <div className="embed-responsive embed-responsive-16by9">
                  <LineChart />
                </div>
              </div>
            </div>
            {/* Bar Chart */}
            <div className="col-md-12">
              <div className="tile">
                <h3 className="tile-title">Thống kê 6 tháng doanh thu</h3>
                <div className="embed-responsive embed-responsive-16by9">
                  <BarChart />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Right */}
      </div>

      <div className="text-center" style={{ fontSize: 13 }}>
        <p>
          <b>
            Copyright {currentYear} Phần mềm quản lý bán hàng | Dev Hữu Thắng
          </b>
        </p>
      </div>
    </main>
  );
}

export default IndexDashBoard;
