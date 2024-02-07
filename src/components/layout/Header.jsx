import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { HiShoppingBag } from "react-icons/hi2";
import Search from "../form/Search";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";


const Header = () => {
  const { auth, setAuth } = useAuth();
  const { cart } = useCart();
  const categories = useCategory();

  const handleLogout = () => {
    setAuth((prevAuth) => {
      localStorage.removeItem("auth");
      return {
        ...prevAuth,
        user: null,
        token: "",
      };
    });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container-fluid">
        <Link
          style={{ color: "white", fontWeight: "bold" }}
          to="/"
          className="navbar-brand"
        >
          FashionFusion <HiShoppingBag className="mb-1" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <Search className="mt-3" />
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                Categories
              </Link>
              <ul
                className="dropdown-menu"
                style={{ maxHeight: "250px", overflowY: "auto" }}
              >
                {categories?.map((category) => (
                  <li key={category._id}>
                    <Link
                      to={`/category/${category.slug}`}
                      className="dropdown-item"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            {!auth.user ? (
              <>
                <li className="nav-item">
                  <NavLink to={"/register"} className="nav-link">
                    Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={"/login"} className="nav-link">
                    Login
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {auth.user.name}
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <NavLink
                        className="dropdown-item"
                        to={`/dashboard/${
                          auth?.user?.role === 1 ? "admin" : "user"
                        }`}
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      {" "}
                      <NavLink
                        className="dropdown-item"
                        onClick={handleLogout}
                        to={"/login"}
                      >
                        Logout
                      </NavLink>
                    </li>
                  </ul>
                </li>
              </>
            )}
            <li className="nav-item">
              <Badge
                count={cart?.length}
                showZero
                className="mt-2 "
                color="rgb(45, 183, 245)"
              >
                <NavLink to={"/cart"} className="nav-link">
                  Cart
                </NavLink>
              </Badge>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
