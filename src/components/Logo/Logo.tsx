'use client';

import Link from 'next/link';
import style from './Logo.module.css';

const Logo = ({ closed }: { closed: boolean }) => {
  return (
    <Link href="/" className={`${style.logo} ${closed ? style.closed : ''}`}>
      Entertainer
    </Link>
  );
};

export default Logo;
