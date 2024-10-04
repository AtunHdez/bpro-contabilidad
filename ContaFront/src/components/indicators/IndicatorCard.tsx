"use client"
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import { Visibility, Star, StarBorder } from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';
import { Box } from '@mui/material';
import { modificaFavoritos, modificaVisibles } from '@/mutations/Indicadores';
import environment from '@/lib/relay-environment';


interface CardProps {
  userIdicator: number;
  title: string;
  currentMonth: string;
  prevMonth: string;
  prevYear: string;
  isFavorite: boolean;
  onToggleFavorite: (newFavoriteStatus: boolean) => void;
  onToggleVisible: (newVisibleStatus: boolean) => void;
  onAlert: (message: string, alertSeverity: 'success' | 'error') => void;
}

export default function IndicatorCard({
  userIdicator,
  title,
  currentMonth,
  prevMonth,
  prevYear,
  isFavorite,
  onToggleFavorite,
  onToggleVisible,
  onAlert,
}: CardProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [favorite, setIsFavorite] = useState(isFavorite);
  const [loading, setLoading] = useState(false);

  const handleToggleFavorito = () => {
    setLoading(true);
    modificaFavoritos(
      environment,
      1, // id_usuario
      !favorite,
      userIdicator,
      (response) => {
        if (response.modificaFavoritos.success) {
          const newFavoriteStatus = !favorite;
          setIsFavorite(newFavoriteStatus);
          onToggleFavorite(newFavoriteStatus);
          onAlert(response.modificaFavoritos.message, 'success');
        } else {
          onAlert(response.modificaFavoritos.message, 'error');
        }
        setLoading(false);
      },
      (error) => {
        console.error(error);
        onAlert('Ha ocurrido un error al intentar modificar el indicador', 'error');
        setLoading(false);
      }
    );
  };

  const handleToggleVisible = () => {
    setLoading(true);
    modificaVisibles(
      environment,
      1, // id_usuario
      !isVisible,
      userIdicator,
      (response) => {
        if (response.modificaVisibles.success) {
          const newVisibleStatus = !isVisible;
          setIsVisible(newVisibleStatus);
          onToggleVisible(newVisibleStatus);
          onAlert(response.modificaVisibles.message, 'success');
        } else {
          onAlert(response.modificaVisibles.message, 'error');
        }
        setLoading(false);
      },
      (error) => {
        console.error(error);
        onAlert('Ha ocurrido un error al intentar modificar la visibilidad del indicador', 'error');
        setLoading(false);
        },
    );
  }

  return (
    <Card className='relative flex flex-col justify-between h-full px-2'>
      <Box>
        <Typography variant="h6" gutterBottom align='left'>
          {title}
        </Typography>
        <Box display={'flex'} flexDirection={'column'} alignItems={'end'} mb={1}>
          <Typography variant="body1">
            Mes actual: {currentMonth}
          </Typography>
          <Typography variant="body1">
            Mes anterior: {prevMonth}
          </Typography>
          <Typography variant="body1">
            Año anterior: {prevYear}
          </Typography>
        </Box>
      </Box>

      <Box className='absolute bottom-1 left-1 flex'>
        <Tooltip title={favorite ? "Quitar de favoritos" : "Agregar a favoritos"} arrow>
          <IconButton onClick={handleToggleFavorito} aria-label="Agregar a favoritos" disabled={loading}>
            {favorite ? (
              <Star sx={{ color: 'orange' }} />
            ) : (
              <StarBorder sx={{ color: 'grey' }} />
            )}
          </IconButton>
          
        </Tooltip>
        <Tooltip title="Ocultar indicador" arrow>
          <IconButton onClick={handleToggleVisible} aria-label="Ocultar indicador">
            <Visibility />
          </IconButton>
        </Tooltip>
      </Box>
    </Card>
  );
}