"use client"
import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import GridViewIcon from '@mui/icons-material/GridView';
import { useState } from 'react';

export default function BottomRightMenu() {
  const [selected, setSelected] = useState('analysis');

  const handleSelection = (event: React.MouseEvent<HTMLElement>, newSelection: string) => {
    if (newSelection !== null) {
      setSelected(newSelection);
    }
  };
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        right: 0,
        boxShadow: 3,
        borderRadius: '4px 0 0 4px',
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
          value="analysis"
          aria-label="analysis"
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
            <BarChartIcon />
            <Box sx={{ fontSize: 10, textTransform: 'none' }}>Análisis</Box>
          </Box>
        </ToggleButton>
        <ToggleButton 
          value="ranking" 
          aria-label="ranking"
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
            <MilitaryTechIcon />
            <Box sx={{ fontSize: 10, textTransform: 'none' }}>Ranking</Box>
          </Box>
        </ToggleButton>
        <ToggleButton 
          value="detail" 
          aria-label="detail"
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
            <GridViewIcon />
            <Box sx={{ fontSize: 10, textTransform: 'none' }}>Detalle</Box>
          </Box>
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}