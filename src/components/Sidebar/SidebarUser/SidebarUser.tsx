'use client';

import { useState } from 'react';
import { Avatar } from '@mui/material';
import { useUser } from '@/hooks/useUser';
import SidebarUserPopup from '../SidebarUserPopup/SidebarUserPopup';
import style from './SidebarUser.module.css';

const SidebarUser = ({ sidebarOpen }: { sidebarOpen: boolean }) => {
  const [showPopup, setShowPopup] = useState(false);
  const { user, profile, loading } = useUser();

  if (loading && !user) {
    return <h1>Loading...</h1>;
  }

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <>
      <div className={style.user}>
        <SidebarUserPopup showPopup={showPopup} setShowPopup={setShowPopup} />
        <button
          className={`${style.userDisplay} ${sidebarOpen ? '' : style.closed}`}
          onClick={togglePopup}>
          <Avatar src={profile?.avatar_url} alt={profile?.full_name} />
          <div
            className={`${style.userText} ${sidebarOpen ? '' : style.closed}`}>
            <p className={style.userName}>{profile?.full_name}</p>
            <p className={style.userEmail}>{user?.email}</p>
          </div>
        </button>
      </div>
    </>
  );
};

export default SidebarUser;
