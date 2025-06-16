'use client';

import { useState } from 'react';
import { Avatar } from '@mui/material';
import SidebarUserPopup from '../SidebarUserPopup/SidebarUserPopup';
import style from './SidebarUser.module.css';

const SidebarUser = ({ closed }: { closed: boolean }) => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <>
      <div className={style.user}>
        <SidebarUserPopup showPopup={showPopup} setShowPopup={setShowPopup} />
        <button
          className={`${style.userDisplay} ${closed ? style.closed : ''}`}
          onClick={togglePopup}>
          <Avatar src={'/PK_profile_pic.jpg'} alt={'Peter Koopman'} />
          <div className={style.userText}>
            <p className={style.userName}>Peter Koopman</p>
            <p className={style.userEmail}>peter@scribbledesign.co.nz</p>
          </div>
        </button>
      </div>
    </>
  );
};

export default SidebarUser;
