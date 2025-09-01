'use client';

import { Avatar, Drawer } from '@mui/material';
import { useState, useEffect, useContext } from 'react';
import { usePathname } from 'next/navigation';
import SidebarUserPopup from '../Sidebar/SidebarUserPopup/SidebarUserPopup';
import Nav from '../Nav/Nav';
import Link from 'next/link';
import style from './MobileFooter.module.css';
import ClientSearch from '../ClientSearch/ClientSearch';
import BookingSearch from '../BookingSearch/BookingSearch';
import { AvatarContext } from '@/context/AvatarContext';
import { useUser } from '@/hooks/useUser';

const MobileFooter = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { avatarPreview } = useContext(AvatarContext);
  const { user } = useUser();

  const pathname = usePathname();
  useEffect(() => {
    setShowMenu(false);
  }, [pathname]);

  return (
    <footer className={style.footer}>
      <Drawer
        className={style.drawer}
        anchor="left"
        open={showMenu}
        onClose={() => setShowMenu(false)}
        sx={{ pt: 1 }}>
        <ClientSearch />
        <Nav className={style.nav} isOpen={true} />
        <BookingSearch />
      </Drawer>
      <SidebarUserPopup showPopup={showPopup} setShowPopup={setShowPopup} />
      <Avatar
        src={avatarPreview || ''}
        onClick={() => setShowPopup(!showPopup)}
        alt={user?.full_name}
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
