import { Link } from "react-router-dom";

const NavLink = ({ title, icon, className, href = "#" }) => {
  return (
    <Link
      to={href}
      className={`navbar-item flex items-center gap-1.5 whitespace-nowrap rounded-lg p-2 text-sm hover:text-info hover:shadow ${className}`}
    >
      {icon && <img src={icon} alt="heart" width={18} />}
      {title}
    </Link>
  );
};

export default NavLink;
