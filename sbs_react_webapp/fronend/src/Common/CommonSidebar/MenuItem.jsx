import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setMenuTitle } from '../../Redux/actions/menuActions';

const MenuItem = ({ title, icon, menuItems, link }) => {

  const dispatch = useDispatch();
  const menuTitle = title;
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
    dispatch(setMenuTitle(menuTitle));
  };

  return (
    <li>
      <Link to={link}
        onClick={handleToggle}
        className={`${!isCollapsed ? "show" : ""} ${menuItems.length === 0 ? "" : "dropdown-toggle"}`}
        aria-expanded={!isCollapsed}
        aria-label={title}
      >
        {icon}
        <span className="mx-2">{title}{title === "Changelog:" && <b> v.1.0</b>}</span>
      </Link>
      <ul className={`collapse list-unstyled ${isCollapsed ? "" : "show"}`} >
        {menuItems.map((menuItem, index) => (
          <li key={index}>
            <Link to={menuItem.link} aria-label={menuItem.label}>
              {menuItem.label}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default MenuItem