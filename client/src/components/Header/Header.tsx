import { NavLink } from 'react-router-dom';
import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <span className="header__logo">MeshAI</span>
      <nav className="header__nav">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? 'header__nav-link header__nav-link--active' : 'header__nav-link'
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/chat"
          className={({ isActive }) =>
            isActive ? 'header__nav-link header__nav-link--active' : 'header__nav-link'
          }
        >
          Chat
        </NavLink>
        <NavLink
          to="/knowledge-base"
          className={({ isActive }) =>
            isActive ? 'header__nav-link header__nav-link--active' : 'header__nav-link'
          }
        >
          Knowledge Base
        </NavLink>
      </nav>
    </header>
  );
}
