import { FC, ReactNode } from "react";
import AppLayout from "./AppLayout";

interface MainLayoutProps {
  children: ReactNode;
  layout: string;
}

const MainLayout: FC<MainLayoutProps> = ({ children, layout }) => {
    const layouts: Record<string,React.ReactNode> = {
         app: <AppLayout >{children}</AppLayout>,
    }

  return(

    <main >
        {layouts[layout]}
    </main>
  );
};

export default MainLayout;
    