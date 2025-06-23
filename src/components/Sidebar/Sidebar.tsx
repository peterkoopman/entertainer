'use client';

import Nav from '@/components/Nav/Nav';
import Logo from '@/components/Logo/Logo';
import style from './Sidebar.module.css';
import SidebarUser from './SidebarUser/SidebarUser';
import { useContext, useRef, MouseEvent } from 'react';
import { useClickOutside } from '@/hooks/useClickOutside';
import { SidebarContext, SidebarContextType } from '@/context/SidebarContext';
import ClientSearch from '../ClientSearch/ClientSearch';
import BookingSearch from '../BookingSearch/BookingSearch';

const Sidebar = () => {
  const { isOpen, openSidebar, closeSidebar }: SidebarContextType =
    useContext<SidebarContextType>(SidebarContext);
  const clientSearchRef = useRef<HTMLDivElement | null>(null);
  const bookingSearchRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(bookingSearchRef, () => {
    bookingSearchRef.current?.children[1].classList.remove(style.show);
  });

  useClickOutside(clientSearchRef, () => {
    clientSearchRef.current?.children[1].classList.remove(style.show);
  });

  const showSearch = (e: MouseEvent<HTMLDivElement>) => {
    e.currentTarget.nextElementSibling?.classList.toggle(style.show);
  };

  return (
    <div className={`${style.sidebar} ${isOpen ? '' : style.closed}`}>
      <div
        onClick={() => closeSidebar()}
        className={`${style.closeIcon} ${
          isOpen ? '' : style.closed
        } material-symbols-outlined`}>
        left_panel_close
      </div>
      <div
        onClick={() => openSidebar()}
        className={`${style.openIcon} ${
          isOpen ? '' : style.closed
        } material-symbols-outlined`}>
        left_panel_open
      </div>
      <Logo closed={!isOpen} />
      {isOpen ? (
        <ClientSearch />
      ) : (
        <div ref={clientSearchRef} className={style.clientSearch}>
          <div
            onClick={(e) => showSearch(e)}
            className={`${style.searchIcon} material-symbols-outlined`}
            title="Client search">
            search
          </div>
          <div className={style.flyoutBox}>
            <ClientSearch />
          </div>
        </div>
      )}
      <Nav isOpen={isOpen} />
      {isOpen ? (
        <BookingSearch />
      ) : (
        <div ref={bookingSearchRef} className={style.bookingSearch}>
          <div
            onClick={(e) => showSearch(e)}
            className={`${style.bookingIcon} material-symbols-outlined`}
            title="Booking search">
            event
          </div>
          <div className={style.flyoutBox}>
            <BookingSearch />
          </div>
        </div>
      )}
      <SidebarUser sidebarOpen={isOpen} />
    </div>
  );
};

export default Sidebar;
