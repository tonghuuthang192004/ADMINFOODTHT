import '../../css/main.css'
import '../../css/util.css'
import '../../css/style.css'
import team from '../../images/team.jpg'
// src/components/Login.js
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

import React, { useState } from 'react';

function Login() {
  const navigate = useNavigate();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

 const handleLogin = async () => {
  try {
    const response = await fetch('http://localhost:3000/admin/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: formData.username,
        mat_khau: formData.password,
      }),
    });

    const data = await response.json();
    console.log(data);

if (response.ok && data) {
  const nameOrEmail = data.ho_ten || data.email || 'Người dùng';
    localStorage.setItem('user', JSON.stringify(data));

 navigate('/admin/DashBorad')
} else {
  alert(data.message || 'Đăng nhập thất bại');
}
  } catch (error) {
    console.error('Lỗi đăng nhập:', error);
    alert('Có lỗi xảy ra, vui lòng thử lại sau.');
  }
};

  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          <div className="login100-pic js-tilt" data-tilt>
            <img src={team} alt="IMG" />
          </div>

          <form className="login100-form validate-form" onSubmit={(e) => e.preventDefault()}>
            <span className="login100-form-title">
              <b>ĐĂNG NHẬP HỆ THỐNG HTH</b>
            </span>

            <div className="wrap-input100 validate-input">
              <input
                className="input100"
                type="text"
                placeholder="Tài khoản quản trị"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className='bx bx-user'></i>
              </span>
            </div>

            <div className="wrap-input100 validate-input">
              <input
                className="input100"
                type={passwordVisible ? "text" : "password"}
                placeholder="Mật khẩu"
                name="password"
                id="password-field"
                value={formData.password}
                onChange={handleChange}
              />
              <span
                onClick={togglePasswordVisibility}
                className={`bx fa-fw field-icon click-eye ${passwordVisible ? "bx-show" : "bx-hide"}`}
              ></span>
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className='bx bx-key'></i>
              </span>
            </div>

            <div className="container-login100-form-btn">
              <input type="button" value="Đăng nhập" onClick={handleLogin} />
            </div>

            <div className="text-right p-t-12">
              <Link className="txt2" to="/passwordRecovery">
                Bạn quên mật khẩu?
              </Link>
            </div>

            <div className="text-center p-t-70 txt2">
              Phần mềm quản lý bán hàng &copy; {new Date().getFullYear()}
              <a className="txt2" href="#"> Hữu Thắng </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
