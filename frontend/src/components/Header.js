import { useContext } from "react";
import { Link, Route } from "react-router-dom";
import { MenuContext } from "../contexts/MenuContext";

export default function Header() {
  const menuContext = useContext(MenuContext);

  const buttonClassName = `button header__button ${menuContext.isMenuOpen ? 'header__button_close' : 'header__button_hamburger'}`

  function handleLogout() {
    menuContext.onLogout();
  }

  function handleMenuClick() {
    menuContext.setIsMenuOpen(!menuContext.isMenuOpen);
  }

  return (
    <header className="header">
      <div className="header__logo"></div>
      <nav className="header__navbar">
        <p className="header__email">{menuContext.email}</p>
        <Route path="/sign-in">
          <Link to="/sign-up" className="header__link">Регистрация</Link>
        </Route>
        <Route path="/sign-up">
          <Link to="/sign-in" className="header__link">Вход</Link>
        </Route>
        <Route exact path='/'>
          <Link to="/sign-in" className="header__link header__link_mobile" onClick={handleLogout}>Выход</Link>
          <button className={buttonClassName} onClick={handleMenuClick}></button>
        </Route>
      </nav>
    </header>
  )
}