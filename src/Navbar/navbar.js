import './navbar.css';
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
        <div className="container">
            <div className='leftnav'>

            <Link to="/" className='navbar'>Demo</Link>
            <NavLink className={ ({ isActive }) => (isActive ? "navbar active" : "navbar")  } to="basic"> Basic </NavLink>

            <NavLink className={ ({ isActive }) => (isActive ? "navbar active" : "navbar")  }  to="notification"> Notifications </NavLink>

            <NavLink className={ ({ isActive }) => (isActive ? "navbar active" : "navbar")  }  to="pull_request"> Live Queue Updates </NavLink>
            </div>
            <div className='rightnav'>
                {/* <a href=''><div className='navbar'>Level 4</div></a> */}
            </div>
        </div>
  );
}

export default Navbar;