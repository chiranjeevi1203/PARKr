function Navbar() {
  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <a className="navbar-brand">PARKr</a>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-success" type="button">
            Signup
          </button>
          <button  className="btn btn-outline-success" type="button">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
