import { useContext } from "react";
import { Link } from "react-router-dom";
import { MenuContext } from "../contexts/MenuContext";

export default function Menu() {
  const menuContext = useContext(MenuContext);
  const menuClassName = `menu ${menuContext.isMenuOpen && 'menu_opened'}`;

  function handleLogOut() {
    menuContext.onLogout();
    menuContext.setIsMenuOpen(false);
  }

  return (
    <div className={menuClassName}>
      <p className="menu__email">{menuContext.email}</p>
      <Link to="/sign-in" className="menu__link" onClick={handleLogOut}>Выход</Link>
    </div>
  )
}