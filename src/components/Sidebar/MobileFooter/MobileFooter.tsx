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
          <Icon>home</Icon>
        </Link>
      </div>
      <div className={style.menu}>
        <Icon>menu</Icon>
      </div>
    </footer>
  );
};

export default MobileFooter;
