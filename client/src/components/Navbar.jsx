import { Link, useNavigate } from "react-router-dom";

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // remove JWT
    setIsLoggedIn(false);             // update state
    navigate("/login");               // redirect to login page
  };

  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <a className="navbar-brand">PARKr</a>
        <div className="d-flex gap-2">
          {!isLoggedIn ? (
            <>
              <Link to="/signup" className="btn btn-outline-success">
                Signup
              </Link>
              <Link to="/login" className="btn btn-outline-success">
                Login
              </Link>
            </>
          ) : (
            <button onClick={handleLogout} className="btn btn-outline-danger">
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
