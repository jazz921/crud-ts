import { FC } from "react";

const Header: FC = () => {
  return (
    <nav className="navbar">
      <h1>CRUD Application</h1>
      <div className="navbar__user-info">
        <p className="user-info__user-name">John Doe</p>
        <p className="user-info__user-type">Admin</p>
      </div>
    </nav>
  );
};

export default Header;
