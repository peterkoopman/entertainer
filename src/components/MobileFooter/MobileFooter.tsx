'use client';

import { Avatar, Drawer } from '@mui/material';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import SidebarUserPopup from '../Sidebar/SidebarUserPopup/SidebarUserPopup';
import Nav from '../Nav/Nav';
import Link from 'next/link';
import style from './MobileFooter.module.css';

const MobileFooter = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    setShowMenu(false);
  }, [pathname]);
  // TODO: replace SidebarUserPopup with MUI Menu
  return (
    <footer className={style.footer}>
      <Drawer anchor="left" open={showMenu} onClose={() => setShowMenu(false)}>
        <Nav className={style.nav} />
      </Drawer>
      <SidebarUserPopup showPopup={showPopup} setShowPopup={setShowPopup} />
      <Avatar
        src={'/PK_profile_pic.jpg'}
        onClick={() => setShowPopup(!showPopup)}
        alt={'Peter Koopman'}
      />
      <div className={style.homeLink}>
        <Link href="/dashboard">
          <div className="material-symbols-outlined">home</div>
        </Link>
      </div>
      <div className={style.menu} onClick={() => setShowMenu(!showMenu)}>
        <div className="material-symbols-outlined">menu</div>
      </div>
    </footer>
  );
};

export default MobileFooter;
