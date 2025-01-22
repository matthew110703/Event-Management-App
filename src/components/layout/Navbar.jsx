import { Link } from "react-router-dom";

// UI
import { logo, menuIcon } from "../../assets";
import NavLink from "../ui/NavLink";

// Constants
import { navLinks } from "../../lib/constants";

const Navbar = () => {
  return (
    <header className="navbar rounded-md shadow-lg">
      <div className="navbar-start">
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold text-info"
        >
          <img src={logo} alt="logo" width={32} />
          Eventify
        </Link>
      </div>

      <div className="navbar-end hidden gap-6 text-sm *:font-semibold md:flex">
        {navLinks.map((link) => (
          <NavLink
            key={link.label}
            icon={link.icon}
            title={link.label}
            href={link.href}
          />
        ))}
        <Link
          to="/login"
          className="navbar-item btn btn-info btn-sm text-white"
        >
          Logout
        </Link>
      </div>

      {/* Dropdown menu for mobile */}
      <div className="navbar-end flex flex-none gap-4 md:hidden">
        <div className="dropdown dropdown-left">
          <button tabIndex={0} className="btn btn-square btn-sm">
            <img src={menuIcon} alt="menu" width={24} />
          </button>

          <ul
            tabIndex={0}
            className="dropdown-content z-[1] mt-14 w-52 space-y-2 text-nowrap rounded-lg bg-white px-4 py-2 shadow *:text-sm"
          >
            {navLinks.map((link) => (
              <li key={link.label}>
                <NavLink
                  icon={link.icon}
                  title={link.label}
                  href={link.href}
                  className="block"
                />
              </li>
            ))}
            <li>
              <Link
                to="/login"
                className="navbar-item btn btn-info btn-sm mx-auto w-full text-white"
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
