'use client';

import { Avatar } from '@mui/material';
import { useState } from 'react';
import SidebarUserPopup from '../Sidebar/SidebarUserPopup/SidebarUserPopup';
import MobileMenu from '@/components/MobileMenu/MobileMenu';
import Link from 'next/link';
import style from './MobileFooter.module.css';

// TODO: Check out the MUI Avatar component for this
const MobileFooter = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <footer className={style.footer}>
      <MobileMenu showMenu={showMenu} setShowMenu={setShowMenu} />
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
