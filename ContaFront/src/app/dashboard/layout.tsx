import BottomRightMenu from "@/components/BottomRightMenu";
import CenterLeftMenu from "@/components/CenterLeftMenu";
import NavbarBpro from "@/components/NavbarBPro";
import { Box } from "@mui/material";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <NavbarBpro />
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Box sx={{ flexGrow: 1, mx: 10, p: 2 }}>
          {children}
        </Box>
        <CenterLeftMenu />
        <BottomRightMenu />
      </Box>
    </Box>
  );
}