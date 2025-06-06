// lib
import { useMemo } from "react"
// store
import { useSettings } from "@/store/settingStore";
// components
import { Layout, Menu } from "antd";
const { Sider } = Layout;
import NavLogo from "./NavLogo";
// outher
import { NAV_WIDTH } from "../config";

const NavVertical = () => {
  // store
  const settings = useSettings();
  const { themeLayout, themeMode, darkSidebar } = settings;


  // sider
  const collapsed = useMemo(() => themeLayout === 'mini', [themeLayout]);
  const sidebarTheme = useMemo(() => {
    if (themeMode === "dark") {
      return darkSidebar ? "light" : "dark"
    }
    return darkSidebar ? "dark" : "light";
  }, [themeMode, darkSidebar])



  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={NAV_WIDTH}
      theme={sidebarTheme}
      className="!fixed left-0 top-0 h-screen border-r border-dashed border-gray-500/10 chuxin-sider"
    >
      <div className="flex h-full flex-col">

      </div>
    </Sider>
  );
};

export default NavVertical;
