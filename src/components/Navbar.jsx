export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg ">
            
            <ul className="navbar-nav">
                <li className="nav-item active">
                    <a className="navbar-brand" href="/">  Home </a>
                    </li>
            <li className="nav-item active">
              <a className="nav-link" href="/dashboard">
                    Employee List
                    </a>
          </li>
        </ul>
        <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="#">Hukum gupta </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Log out</a>
            </li>
            
          </ul>
        
      </nav>
    );
  }
  