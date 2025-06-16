import Nav from '../Nav/Nav';
import { useEffect, useRef } from 'react';
import { useClickOutside } from '@/hooks/useClickOutside';
import style from './MobileMenu.module.css';
import { usePathname } from 'next/navigation';

interface MobileMenuProps {
  showMenu: boolean;
  setShowMenu: (showMenu: boolean) => void;
}

const MobileMenu = ({ showMenu, setShowMenu }: MobileMenuProps) => {
  const menuRef = useRef<HTMLDivElement | null>(null);
  useClickOutside(menuRef, () => setShowMenu(false));

  const pathname = usePathname();

  useEffect(() => {
    setShowMenu(false);
  }, [pathname]);

  return (
    <div
      ref={menuRef}
      className={`${style.mobileMenu} ${showMenu ? style.show : ''}`}>
      <Nav />
    </div>
  );
};

export default MobileMenu;
