'use client';

import Link from 'next/link';
import style from './Nav.module.css';

const Nav = () => {
  const navItems = [
    { label: 'Dashboard', path: '/', icon: 'space_dashboard' },
    { label: 'Calendar', path: '/calendar', icon: 'calendar_month' },
    { label: 'Clients', path: '/clients', icon: 'face' },
    { label: 'Personnel', path: '/personnel', icon: 'group' },
  ];
  return (
    <nav className={style.nav}>
      <ul>
        {navItems.map((item, index) => (
          <li key={index}>
            <Link href={item.path} title={item.label}>
              <div className="material-symbols-outlined">{item.icon}</div>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
