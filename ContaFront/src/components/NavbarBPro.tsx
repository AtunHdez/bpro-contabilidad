import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Image from "next/image";

function NavbarBpro() {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Image src="/images/logos/itgLogo.webp" alt="Logo" width={55} height={20} />
        </Box>
        <Typography variant="h6" sx={{ flexGrow: 1, marginLeft: 1 }}>
          Business Pro
        </Typography>
        <Box>
          <Button color="inherit" sx={{ textTransform: 'none' }}>Todos</Button>
          <Button color="inherit" sx={{ textTransform: 'none' }}>Nuevos</Button>
          <Button color="inherit" sx={{ textTransform: 'none' }}>Seminuevos</Button>
          <Button color="inherit" sx={{ textTransform: 'none' }}>Servicio</Button>
          <Button color="inherit" sx={{ textTransform: 'none' }}>Refacciones</Button>
          <Button color="inherit" sx={{ textTransform: 'none' }}>LyP</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavbarBpro;