
import '../../../css/main.css'
import '../../../css/util.css'
import '../../../css/style.css'
import { Link } from 'react-router-dom';
import avatar from'../../../images/avatar.png'

import {
  FaUserTie, FaUsers, FaBox, FaClipboardList, FaChartLine,
  FaBuilding, FaFileInvoiceDollar,FaReact
} from 'react-icons/fa'
import { DiReact } from 'react-icons/di';
function Sidebar() {
  return (
    <>
      <div className="app-sidebar__overlay" data-toggle="sidebar"></div>
      <aside className="app-sidebar">
        <div className="app-sidebar__user">
          <img
            className="app-sidebar__user-avatar"
            src={avatar}
            width="50px"
            alt="User Image"
          />
          <div>
            <p className="app-sidebar__user-name">
              <b>Huu Thang</b>
            </p>
            <p className="app-sidebar__user-designation">Chào mừng bạn trở lại</p>
          </div>
        </div>
        <hr />
        <ul className="app-menu">
          <li>
            <a className="app-menu__item haha" href="phan-mem-ban-hang.html">
              <i className="app-menu__icon bx bx-cart-alt"></i>
              <span className="app-menu__label">POS Bán Hàng</span>
            </a>
          </li>
          <li>
            <a className="app-menu__item active" href="index.html">
             <DiReact className='app-menu__icon'/>
              <span className="app-menu__label">Bảng điều khiển</span>
            </a>
          </li>
          <li>
            <a className="app-menu__item" href="table-data-table.html">
            < FaUserTie className='app-menu__icon ' />
              <span className="app-menu__label">Quản lý nhân viên</span>
            </a>
          </li>
          <li>
            <a className="app-menu__item" href="#">
           <FaUsers className='app-menu__icon '/>
              <span className="app-menu__label">Quản lý khách hàng</span>
            </a>
          </li>
          <li>
            <Link className="app-menu__item" to="/Product">
              <FaBox className='app-menu__icon '/>
              <span className="app-menu__label">Quản lý sản phẩm</span>
            </Link>
          </li>
          <li>
            <a className="app-menu__item" href="table-data-oder.html">
           < FaClipboardList className='app-menu__icon '/>
              <span className="app-menu__label">Quản lý đơn hàng</span>
            </a>
          </li>
          <li>
            <a className="app-menu__item" href="table-data-banned.html">
            <FaBuilding className='app-menu__icon ' />
              <span className="app-menu__label">Quản lý nội bộ</span>
            </a>
          </li>
          <li>
            <a className="app-menu__item" href="table-data-money.html">
            <FaFileInvoiceDollar className='app-menu__icon '/>
              <span className="app-menu__label">Bảng kê lương</span>
            </a>
          </li>
          <li>
            <a className="app-menu__item" href="quan-ly-bao-cao.html">
              <FaChartLine className='app-menu__icon ' />
              <span className="app-menu__label">Báo cáo doanh thu</span>
            </a>
          </li>
          <li>
            <a className="app-menu__item" href="page-calendar.html">
            <FaReact className='app-menu__icon '/>
              <span className="app-menu__label">Lịch công tác </span>
            </a>
          </li>
          <li>
            <a className="app-menu__item" href="#">
            <DiReact className='app-menu__icon '/>
              <span className="app-menu__label">Cài đặt hệ thống</span>
            </a>
          </li>
        </ul>
      </aside>
    </>
  );
}

export default Sidebar;
