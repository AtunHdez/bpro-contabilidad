"use client"

import React, { useEffect, useMemo, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid, Navigation } from 'swiper/modules';
import { Box, Button, IconButton, Paper, Tooltip, Typography } from "@mui/material";
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Star, StarBorder } from '@mui/icons-material';
import IndicatorCard from './IndicatorCard';
import ListNoVisibles from './ListNoVisibles';
import { useLazyLoadQuery } from 'react-relay';
import { IndicadoresQuery } from '@/queries/IndicadoresQuery';
import { IndicadoresQuery as IndicadoresQueryType } from '@/__generated__/IndicadoresQuery.graphql';
import { IndicadoresQuery$data } from '@/__generated__/IndicadoresQuery.graphql';

import "swiper/css";
import "swiper/css/navigation";
import 'swiper/css/grid';

const CustomCarousel = () => {
  const [indicators, setIndicators] = useState<IndicadoresQuery$data["getIndicadores"]>([]);
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success');
  const usuarioId = 1;
  const data = useLazyLoadQuery<IndicadoresQueryType>(IndicadoresQuery, { usuarioId });

  // filtrar solo los indicadores visibles 
  const filteredIndicators = useMemo(() => {
    let indicadores = indicators.filter(ind => ind.display);

    // Filtrar por categorias
    if (selectedCategory !== 1) {
      indicadores = indicadores.filter(ind => ind.idCategoria === selectedCategory);
    }

    // Filtrar por favoritos si se seleccionó
    if (showFavorites) {
      indicadores = indicadores.filter(ind => ind.favorito);
    }

    // Filtrar por término de búsqueda
    if (searchTerm.trim() !== '') {
      indicadores = indicadores.filter(ind =>
        ind.indicador.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return indicadores;
  }, [selectedCategory, showFavorites, searchTerm, indicators]);

  // Indidadores no visibles
  const noVisibleIndicators = indicators.filter((ind) => !ind.display);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    if (data && data.getIndicadores) {
      setIndicators(data.getIndicadores)
    }
  }, [data])

  return (
    <Box className='flex'>
      {(indicators && indicators.length !== 0) &&
        <Paper elevation={4} className='flex flex-1 flex-col'>
          <Box className='flex items-center p-2'>
            <ListNoVisibles
              indicadoresNoVisibles={noVisibleIndicators}
              onVisibleChange={(visibleStatus, idIndicadorUsuario) => {
                const newIndicators = indicators.map((ind) => {
                  if (ind.idIndicadorUsuario === idIndicadorUsuario) {
                    return { ...ind, display: visibleStatus };
                  }
                  return ind;
                });
                setIndicators(newIndicators);
              }}
              onAlert={(message, alertSeverity) => {
                setMessage(message);
                setAlertSeverity(alertSeverity);
                setOpen(true);
              }}
            />
            <Tooltip title={showFavorites ? "Mostrar todos" : "Mostrar favoritos"} arrow>
              <IconButton onClick={() => setShowFavorites(!showFavorites)} aria-label="Mostrar favoritos">
                {showFavorites ? (
                  <Star sx={{ color: 'orange' }} />
                ) : (
                  <StarBorder sx={{ color: 'grey' }} />
                )}
              </IconButton>
            </Tooltip>
          </Box>
          <Box
            className='relative flex flex-1 px-12'
            sx={{
              maxWidth: '70vw',
              maxHeight: '450px',
            }}
          >
            <Swiper
              spaceBetween={10}
              slidesPerView={3.05}
              grid={{ rows: 2 }}
              navigation={{
                nextEl: '.custom-swiper-button-next',
                prevEl: '.custom-swiper-button-prev',
              }}
              breakpoints={{
                320: {
                  slidesPerView: 1, spaceBetween: 10,
                  grid: { rows: 2 }
                },
                768: {
                  slidesPerView: 2, spaceBetween: 10,
                  grid: { rows: 2 }
                },
                1024: {
                  slidesPerView: 3, spaceBetween: 10,
                  grid: { rows: 2 }
                },
                1440: {
                  slidesPerView: 4, spaceBetween: 10,
                  grid: { rows: 2 }
                },
              }}
              modules={[Navigation, Grid]}
              className='mySwiper'
            >
              {filteredIndicators.map((indicator) => (
                <SwiperSlide key={indicator.idIndicadorUsuario}>
                  <IndicatorCard
                    userIdicator={indicator.idIndicadorUsuario}
                    title={indicator.indicador}
                    currentMonth={indicator.mesActual!.total}
                    prevMonth={indicator.mesAnterior!.total}
                    prevYear={indicator.anioAnterior!.total}
                    isFavorite={indicator.favorito}
                    onToggleFavorite={(newFavoriteStatus) => {
                      const newIndicators = indicators.map((ind) => {
                        if (ind.idIndicadorUsuario === indicator.idIndicadorUsuario) {
                          return { ...ind, favorito: newFavoriteStatus };
                        }
                        return ind;
                      });
                      setIndicators(newIndicators);
                    }}
                    onToggleVisible={() => {
                      const newIndicators = indicators.map((ind) => {
                        if (ind.idIndicadorUsuario === indicator.idIndicadorUsuario) {
                          return { ...ind, display: !ind.display };
                        }
                        return ind;
                      });
                      setIndicators(newIndicators);
                    }}
                    onAlert={(message, alertSeverity) => {
                      setMessage(message);
                      setAlertSeverity(alertSeverity);
                      setOpen(true);
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <Box className="custom-swiper-button-prev swiper-button-prev absolute top-1/2 left-2 transform -translate-y-1/2 z-10"></Box>
            <Box className="custom-swiper-button-next swiper-button-next absolute top-1/2 right-2 transform -translate-y-1/2 z-10"></Box>
          </Box>
        </Paper>
      }
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert severity={alertSeverity}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default CustomCarousel;