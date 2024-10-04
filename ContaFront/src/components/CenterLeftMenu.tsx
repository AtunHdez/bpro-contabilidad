"use client"
import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import CarouselIcon from '@mui/icons-material/ViewCarousel';
import TimelineIcon from '@mui/icons-material/Timeline'
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useState } from 'react';

export default function CenterLeftMenu() {
  const [selected, setSelected] = useState('carrusel');

  const handleSelection = (event: React.MouseEvent<HTMLElement>, newSelection: string) => {
    if (newSelection !== null) {
      setSelected(newSelection);
    }
  };
  
  return (
    <Box
      sx={{
        position: 'fixed',
        top: '50%',
        transform: 'translateY(-50%)',
        boxShadow: 3,
        borderRadius: '0 4px 4px 0',
        zIndex: 1000,
      }}
    >
      <ToggleButtonGroup
        value={selected}
        orientation="vertical"
        exclusive
        onChange={handleSelection}
      >
        <ToggleButton 
          value="carrusel" 
          aria-label="carrusel"
          sx={{
            '&.Mui-selected': {
              color: 'white', 
              bgcolor: 'primary.main',
              '&:hover': {
                bgcolor: 'primary.light',
              },
            },
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <CarouselIcon />
            <Box sx={{ fontSize: 10, textTransform: 'none' }}>Carrusel</Box>
          </Box>
        </ToggleButton>
        <ToggleButton 
          value="graficos" 
          aria-label="graficos"
          sx={{
            '&.Mui-selected': {
              color: 'white', 
              bgcolor: 'primary.main',
              '&:hover': {
                bgcolor: 'primary.light',
              },
            },
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <TimelineIcon />
            <Box sx={{ fontSize: 10, textTransform: 'none' }}>Gráficos</Box>
          </Box>
        </ToggleButton>
        <ToggleButton 
          value="lista" 
          aria-label="lista"
          sx={{
            '&.Mui-selected': {
              color: 'white', 
              bgcolor: 'primary.main',
              '&:hover': {
                bgcolor: 'primary.light',
              },
            },
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ListAltIcon />
            <Box sx={{ fontSize: 10, textTransform: 'none' }}>Lista</Box>
          </Box>
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}