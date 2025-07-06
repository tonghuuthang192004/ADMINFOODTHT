import '../../../css/main.css'
import '../../../css/util.css'
import '../../../css/style.css'
import { NavLink } from 'react-router-dom';
import avatar from '../../../images/avatar.png'
import React, { useEffect, useState } from 'react';

import {
  FaUserTie, FaUsers, FaBox, FaClipboardList, FaChartLine,
  FaBuilding, FaFileInvoiceDollar, FaReact
} from 'react-icons/fa'
import { DiReact } from 'react-icons/di';

function Sidebar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storeUser = localStorage.getItem('user');
    if (storeUser) {
      setUser(JSON.parse(storeUser));
    }
  }, []);

  return (
    <>
  
      <div className="app-sidebar__overlay" data-toggle="sidebar" style={{background: 'linear-gradient(90deg, #D1330B, #FF6B6B)'}}></div>
      <aside className="app-sidebar"   style={{ background: 'linear-gradient(90deg, #D1330B, #FF6B6B)', minHeight: '100vh' }}
>
        <div className="app-sidebar__user">
          <img
            className="app-sidebar__user-avatar"
            src={user?.avatar || avatar}
            width="50px"
            alt="User Image"
          />
          <div>
            <p className="app-sidebar__user-name">
              <b>{user?.ten || 'User'}</b>
            </p>
            <p className="app-sidebar__user-designation">Chào mừng bạn trở lại</p>
          </div>
        </div>
        <hr />
        <ul className="app-menu">
         {/* <li>
  <NavLink
    to="/admin/AI"
    className={({ isActive }) =>
      'app-menu__item ' + (isActive ? 'active' : '')
    }
  >
    <FaReact className='app-menu__icon' />
    <span className="app-menu__label">Trợ lý AI</span>
  </NavLink>
</li> */}
          <li>
            <NavLink
              to="/admin/Dashoard"
              className={({ isActive }) =>
                'app-menu__item ' + (isActive ? 'active' : '')
              }
              
            >
              <DiReact className='app-menu__icon' />
              <span className="app-menu__label">Tổng Quan</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/IndexUser"
              className={({ isActive }) =>
                'app-menu__item ' + (isActive ? 'active' : '')
              }
            >
              <FaUsers className='app-menu__icon' />
              <span className="app-menu__label">Quản Lý Người Dùng</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/Product"
              className={({ isActive }) =>
                'app-menu__item ' + (isActive ? 'active' : '')
              }
            >
              <FaBox className='app-menu__icon' />
              <span className="app-menu__label">Quản lý sản phẩm</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/Order"
              className={({ isActive }) =>
                'app-menu__item ' + (isActive ? 'active' : '')
              }
            >
              <FaClipboardList className='app-menu__icon' />
              <span className="app-menu__label">Quản lý đơn hàng</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/Category"
              className={({ isActive }) =>
                'app-menu__item ' + (isActive ? 'active' : '')
              }
            >
              <FaBuilding className='app-menu__icon' />
              <span className="app-menu__label">Quản Lý Danh Mục</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/Discountmanger"
              className={({ isActive }) =>
                'app-menu__item ' + (isActive ? 'active' : '')
              }
            >
              <FaFileInvoiceDollar className='app-menu__icon' />
              <span className="app-menu__label">Quản Lý Khuyến Mãi</span>
            </NavLink>
          </li>
           <li>
            <NavLink
              to="/page-calendar"
              className={({ isActive }) =>
                'app-menu__item ' + (isActive ? 'active' : '')
              }
            >
              <FaReact className='app-menu__icon' />
              <span className="app-menu__label">Quản Lý Đánh GIÁ</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/DashboardReport"
              className={({ isActive }) =>
                'app-menu__item ' + (isActive ? 'active' : '')
              }
            >
              <FaChartLine className='app-menu__icon' />
              <span className="app-menu__label">Báo cáo doanh thu</span>
            </NavLink>
          </li>
         
          {/* <li>
            <NavLink
              to="#"
              className={({ isActive }) =>
                'app-menu__item ' + (isActive ? 'active' : '')
              }
            >
              <DiReact className='app-menu__icon' />
              <span className="app-menu__label">Cài đặt hệ thống</span>
            </NavLink>
          </li> */}
        </ul>
      </aside>
        
      
      
    </>
  );
}

export default Sidebar;
