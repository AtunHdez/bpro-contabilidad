"use client";
import {
  createTheme,
  GlobalProvider,
  useMobileNav,
  Sidebar,
} from "@actualizaciontecnologica/at-itg";
import {ThemeProvider} from "@emotion/react";
import {useState} from "react";
import {CssBaseline, Direction, PaletteMode} from "@mui/material";
type Layout =
  | "vertical-shells-dark"
  | "vertical-shells-dark-alternate"
  | "vertical-shells-brand"
  | "vertical-shells-white"
  | "vertical-shells-white-off"
  | "vertical-shells-light"
  | "vertical-shells-accent-header"
  | "collapsed-shells-double"
  | "collapsed-shells-double-accent"
  | "collapsed-shells-double-dark"
  | "collapsed-shells-single"
  | "collapsed-shells-single-accent"
  | "collapsed-shells-single-white"
  | "collapsed-shells-single-white-off"
  | "stacked-shells-top-nav"
  | "stacked-shells-top-nav-accent"
  | "stacked-shells-top-nav-tabs"
  | "stacked-shells-top-nav-wide";
type ColorPreset =
  | "livingCoral"
  | "greenery"
  | "ultraViolet"
  | "roseQuartz"
  | "radiantOrchid"
  | "tangerineTango"
  | "emerald"
  | "honeyGold"
  | "monacoBlue"
  | "darkViolet"
  | "royalBlue";
type MenuItemsType =
  | [
      {
        title: string;
        route?: string;
        icon?: React.ReactNode;
        subMenu?: [
          {
            title: string;
            route?: string;
            icon?: React.ReactNode;
          }
        ];
      }
    ]
  | undefined;
type ThemeConfig = {
  colorPreset?: ColorPreset;
  direction?: Direction;
  paletteMode?: PaletteMode;
  layout: Layout;
};
const SidebarBPro = () => {
  const mobileNav = useMobileNav();
  const [menuItems, setMenuItems] = useState<MenuItemsType>();
  const [settings, setSettings] = useState<ThemeConfig>({
    colorPreset: "livingCoral",
    direction: "ltr",
    paletteMode: "dark",
    layout: "vertical-shells-dark",
  });
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);
  const RenderComponent = () => {
    return (
      <>
        <Sidebar
          menuItems={menuItems}
          onClose={mobileNav.handleClose}
          open={mobileNav.open}
          onOpen={mobileNav.handleOpen}
          isSidebarCollapsed={isSidebarCollapsed}
          setIsSidebarCollapsed={setIsSidebarCollapsed}
          isSidebarHovered={isSidebarHovered}
          setIsSidebarHovered={setIsSidebarHovered}
        />
      </>
    );
  };
  const theme = createTheme(settings);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalProvider theme={theme} settings={settings}>
        <RenderComponent />
      </GlobalProvider>
    </ThemeProvider>
  );
};
export default SidebarBPro;