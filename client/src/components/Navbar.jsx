import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <a className="navbar-brand">PARKr</a>
        <div className="d-flex gap-2">
          <Link to="/signup" className="btn btn-outline-success">
            Signup
          </Link>
          <Link to="/login" className="btn btn-outline-success">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
