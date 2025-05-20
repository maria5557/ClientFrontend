
import Navbar from "@/common/components/Navbar";
import { ReactNode } from "react";

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    < >
        <Navbar />
        {children}
      </>
  );
};

export default AppLayout;
