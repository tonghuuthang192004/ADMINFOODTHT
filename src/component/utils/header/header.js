import '../../../css/main.css'
import '../../../css/util.css'
import '../../../css/style.css'
import { Link } from 'react-router-dom';
import { FaSmile } from 'react-icons/fa';
function AppHeader() {
  return (
    <header className="app-header">
      {/* Sidebar toggle button */}
      <a
        className="app-sidebar__toggle"
        href="#"
        data-toggle="sidebar"
        aria-label="Hide Sidebar"
      ></a>

      

      {/* Navbar Right Menu */}
      <ul className="app-nav">
        {/* User Menu */}
        <li>
           <Link className="app-nav__item " to="/">
               <FaSmile/>
             </Link>
          {/* <a className="app-nav__item" >
            <i className="bx bx-log-out bx-rotate-180"></i>
          </a> */}
        </li>
      </ul>
    </header>
  );
}

export default AppHeader;