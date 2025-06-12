import style from './Nav.module.css';
import Icon from '@mui/material/Icon';

const Nav = () => {
  const navItems = [
    { label: 'Dashboard', path: '/', icon: 'dashboard' },
    { label: 'Calendar', path: '/calendar', icon: 'calendar_month' },
    { label: 'Clients', path: '/clients', icon: 'face' },
    { label: 'Personnel', path: '/personnel', icon: 'group' },
  ];
  return (
    <nav className={style.nav}>
      <ul>
        {navItems.map((item, index) => (
          <li key={index}>
            <a href={item.path}>
              <Icon>{item.icon}</Icon>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
