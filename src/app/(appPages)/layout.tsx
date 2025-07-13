import PagesLayout from '@/components/PagesLayout/PagesLayout';

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <PagesLayout>{children}</PagesLayout>;
}
