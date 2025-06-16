'use client';

import { Avatar } from '@mui/material';
import { useState } from 'react';
import SidebarUserPopup from '../Sidebar/SidebarUserPopup/SidebarUserPopup';
import style from './MobileFooter.module.css';
import Link from 'next/link';

// TODO: Check out the MUI Avatar component for this
const MobileFooter = () => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <footer className={style.footer}>
      <SidebarUserPopup showPopup={showPopup} setShowPopup={setShowPopup} />
      <Avatar
        src={'/PK_profile_pic.jpg'}
        onClick={togglePopup}
        alt={'Peter Koopman'}
      />
      <div className={style.homeLink}>
        <Link href="/dashboard">
          <div className="material-symbols-outlined">home</div>
        </Link>
      </div>
      <div className={style.menu}>
        <div className="material-symbols-outlined">menu</div>
      </div>
    </footer>
  );
};

export default MobileFooter;
