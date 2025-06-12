import UserAvatar from '@/components/UserAvatar/UserAvatar';
import SidebarUserPopup from '../SidebarUserPopup/SidebarUserPopup';
import style from './SidebarUser.module.css';

const SidebarUser = () => {
  return (
    <div className={style.user}>
      <SidebarUserPopup />
      <div className={style.userDisplay}>
        <UserAvatar />
        <div className={style.userText}>
          <p className={style.userName}>Peter Koopman</p>
          <p className={style.userEmail}>peter@scribbledesign.co.nz</p>
        </div>
      </div>
    </div>
  );
};

export default SidebarUser;
