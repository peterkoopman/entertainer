import Image from 'next/image';
import style from './UserAvatar.module.css';

const UserAvatar = () => {
  return (
    <Image
      className={style.image}
      width="32"
      height="32"
      src="/PK_profile_pic.jpg"
      alt="Profile picture"
    />
  );
};

export default UserAvatar;
