import Link from 'next/link';
import style from './Logo.module.css';

const Logo = () => {
  return (
    <Link href="/" className={style.logo}>
      Entertainer
    </Link>
  );
};

export default Logo;
