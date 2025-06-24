
import '../../../css/main.css'
import '../../../css/util.css'
import '../../../css/style.css'
import { Link } from 'react-router-dom';
import avatar from'../../../images/avatar.png'
import React, { useEffect, useState } from 'react';

import {
  FaUserTie, FaUsers, FaBox, FaClipboardList, FaChartLine,
  FaBuilding, FaFileInvoiceDollar,FaReact
} 
from 'react-icons/fa'
import { DiReact } from 'react-icons/di';
function Sidebar() {
    const [user, setUser] = useState(null);

  useEffect(()=>{
    const storeUser=localStorage.getItem('user');
    if(storeUser)
    {
      setUser(JSON.parse(storeUser));
    }
  })
  return (
    <>
      <div className="app-sidebar__overlay" data-toggle="sidebar"></div>
      <aside className="app-sidebar">
        <div className="app-sidebar__user">
          <img
            className="app-sidebar__user-avatar"
            src={user?.avatar}
            width="50px"
            alt="User Image"
          />
          <div>
            <p className="app-sidebar__user-name">
              <b>{user?.ten}</b>
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
            <a className="app-menu__item" href='/admin/IndexUser'>
           <FaUsers className='app-menu__icon '/>
              <span className="app-menu__label">Quản Lý Người Dùng</span>
            </a>
          </li>
          <li>
            <a className="app-menu__item" href="/admin/Product">
              <FaBox className='app-menu__icon '/>
              <span className="app-menu__label">Quản lý sản phẩm</span>
            </a>
          </li>
          <li>
           <a href="/admin/Order" className="app-menu__item">
            < FaClipboardList className='app-menu__icon '/>
              <span className="app-menu__label">Quản lý đơn hàng</span>
            
           </a>
          
          </li>
          <li>
            <a className="app-menu__item" href="/admin/Category">
              <FaBuilding className='app-menu__icon ' />
              <span className="app-menu__label"> Quản Lý Danh Mục</span>
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
