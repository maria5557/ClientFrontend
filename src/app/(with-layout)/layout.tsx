import MainLayout from "@/common/components/MainLayout";
import Navbar from "@/common/components/Navbar";


export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <MainLayout layout="app">
          {children}
        </MainLayout>
  );
}
