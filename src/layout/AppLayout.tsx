import { Outlet } from "react-router-dom";
import AppHeader from "../components/common/AppHeader";

const AppLayout = () => {
  return (
    <div className="min-h-screen">
      <AppHeader />
      <Outlet />
    </div>
  );
};

export default AppLayout;