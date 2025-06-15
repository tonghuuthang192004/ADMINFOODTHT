import '../../css/main.css'
import '../../css/util.css'
import '../../css/style.css'
import forgot from '../../images/fg-img.png'

function PasswordRecovery() {
  const RegexEmail = (inputId) => {
    const email = document.getElementById(inputId).value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Bạn cần nhập đúng thông tin như: ex@abc.xyz');
      return false;
    }
    alert("Email hợp lệ. Hệ thống sẽ gửi mật khẩu cho bạn!");
    // Logic tiếp theo (gửi email khôi phục...) ở đây
    return true;
  };

  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          <div className="login100-pic js-tilt" data-tilt>
            <img src={forgot}alt="IMG" />
          </div>

          <form className="login100-form validate-form">
            <span className="login100-form-title">
              <b>KHÔI PHỤC MẬT KHẨU</b>
            </span>

            <div
              className="wrap-input100 validate-input"
              data-validate="Bạn cần nhập đúng thông tin như: ex@abc.xyz"
            >
              <input
                className="input100"
                type="text"
                placeholder="Nhập email"
                name="emailInput"
                id="emailInput"
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="bx bx-mail-send"></i>
              </span>
            </div>

            <div className="container-login100-form-btn">
              <input
                type="button"
                onClick={() => RegexEmail('emailInput')}
                value="Lấy mật khẩu"
              />
            </div>

            <div className="text-center p-t-12">
              <a className="txt2" href="/index.html">
                Trở về đăng nhập
              </a>
            </div>

            <div className="text-center p-t-70 txt2">
              Phần mềm quản lý bán hàng{' '}
              <i className="far fa-copyright" aria-hidden="true"></i>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PasswordRecovery;