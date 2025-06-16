'use client';

import { useClickOutside } from '@/hooks/useClickOutside';
import style from './SidebarUserPopup.module.css';
import Link from 'next/link';
import { useRef } from 'react';

interface SidebarUserPopupProps {
  showPopup: boolean;
  setShowPopup: (showPopup: boolean) => void;
}

const SidebarUserPopup = ({
  showPopup,
  setShowPopup,
}: SidebarUserPopupProps) => {
  const popupRef = useRef<HTMLDivElement | null>(null);
  useClickOutside(popupRef, () => setShowPopup(false));

  const navItems = [
    { label: 'User account', path: '/account', icon: 'space_dashboard' },
    { label: 'Settings', path: '/settings', icon: 'settings' },
    { label: 'Logout', path: '/logout', icon: 'logout' },
  ];

  return (
    <div
      ref={popupRef}
      className={`${style.popup} ${showPopup ? style.show : ''}`}>
      <ul>
        {navItems.map((item, index) => (
          <li key={index}>
            <Link href={item.path} title={item.label}>
              <div className={`material-symbols-outlined ${style.icon}`}>
                {item.icon}
              </div>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarUserPopup;
