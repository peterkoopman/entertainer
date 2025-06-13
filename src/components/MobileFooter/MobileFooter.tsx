import UserAvatar from '@/components/UserAvatar/UserAvatar';
import style from './MobileFooter.module.css';
import Link from 'next/link';
import { Icon } from '@mui/material';

// TODO: Check out the MUI Avatar component for this
const MobileFooter = () => {
  return (
    <footer className={style.footer}>
      <UserAvatar />
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
