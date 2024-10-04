"use client"
import { Box, Typography } from "@mui/material";
import CustomCarousel from "@/components/indicators/CustomCarousel";

export default function page1() {
  return (
    <Box flexGrow={1} minHeight={'100%'} display={'flex'} flexDirection={'column'} >
      <Typography variant="h5">Indicadores</Typography>
      <Box display={'flex'} className='w-full'>
        <CustomCarousel />
      </Box>
    </Box>
  );
}