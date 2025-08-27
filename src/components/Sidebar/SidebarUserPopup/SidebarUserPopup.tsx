'use client';

import { useClickOutside } from '@/hooks/useClickOutside';
import style from './SidebarUserPopup.module.css';
import Link from 'next/link';
import { useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { List, ListItem } from '@mui/material';
import { redirect } from 'next/navigation';

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

  // Hide popup on navigate
  const pathname = usePathname();
  useEffect(() => {
    setShowPopup(false);
  }, [pathname, setShowPopup]);

  const logout = async () => {
    // await supabase.auth.signOut();
    // // Redirect or refresh the page to reflect logged out state
    redirect('/login');
  };

  return (
    <div
      ref={popupRef}
      className={`${style.popup} ${showPopup ? style.show : ''}`}>
      <List>
        <ListItem>
          <Link href="/account" title="User account">
            <div className={`material-symbols-outlined ${style.icon}`}>
              space_dashboard
            </div>
            User account
          </Link>
        </ListItem>
        <ListItem>
          <Link href="/settings" title="Settings">
            <div className={`material-symbols-outlined ${style.icon}`}>
              settings
            </div>
            Settings
          </Link>
        </ListItem>
        <ListItem onClick={logout}>
          <Link href={''} title="Logout">
            <div className={`material-symbols-outlined ${style.icon}`}>
              logout
            </div>
            Logout
          </Link>
        </ListItem>
      </List>
    </div>
  );
};

export default SidebarUserPopup;
