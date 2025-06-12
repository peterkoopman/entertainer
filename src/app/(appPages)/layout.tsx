import Sidebar from '@/components/Sidebar/Sidebar';
import './appPages.css';
import MobileFooter from '@/components/Sidebar/MobileFooter/MobileFooter';

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="sidebar-layout">
      <Sidebar />
      <main>{children}</main>
      <MobileFooter />
    </div>
  );
}
