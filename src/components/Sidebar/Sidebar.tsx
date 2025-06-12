import Nav from '@/components/Nav/Nav';
import Logo from '@/components/Logo/Logo';
import style from './Sidebar.module.css';
import SidebarUser from './SidebarUser/SidebarUser';

const Sidebar = () => {
  return (
    <div className={style.sidebar}>
      <Logo />
      <Nav />
      <SidebarUser />
    </div>
  );
};

export default Sidebar;
