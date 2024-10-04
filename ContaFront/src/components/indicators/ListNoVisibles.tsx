"use client";
import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Switch,
  Box,
  IconButton
} from '@mui/material';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import CloseIcon from '@mui/icons-material/Close';
import { modificaVisibles } from '@/mutations/Indicadores';
import environment from '@/lib/relay-environment';
import { IndicadoresQuery$data } from '@/__generated__/IndicadoresQuery.graphql';
import React from "react";

interface ListNoVisiblesProps {
  indicadoresNoVisibles: IndicadoresQuery$data["getIndicadores"];
  onVisibleChange: (visibleStatus: boolean, idIndicadorUsuario: number) => void;
  onAlert: (message: string, alertSeverity: 'success' | 'error') => void;
}

export default function ListNoVisibles({
  indicadoresNoVisibles,
  onVisibleChange,
  onAlert
}: ListNoVisiblesProps) {
  const [open, setOpen] = useState(false);
  const [currentIndicator, setcurrentIndicator] = useState<number | null>(null);

  const handleClose = () => {
    setOpen(false);
  }

  const handleToggleVisible = (idIndicadorUsuario: number) => {
    setcurrentIndicator(idIndicadorUsuario);
    modificaVisibles(
      environment,
      1, // id_usuario
      true,
      idIndicadorUsuario,
      (response) => {
        if (response.modificaVisibles.success) {
          onVisibleChange(true, idIndicadorUsuario);
          onAlert(response.modificaVisibles.message, 'success');
        } else {
          onAlert(response.modificaVisibles.message, 'error');
        }
        setcurrentIndicator(null);
      },
      (error) => {
        console.error(error);
        onAlert('Ha ocurrido un error al intentar modificar el indicador', 'error');
      }
    );
  }

  return (
    <React.Fragment>
      <IconButton onClick={() => setOpen(true)}>
        <SettingsRoundedIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <Box className='flex flex-row justify-between items-center pr-4'>
          <DialogTitle>Indicadores no visibles</DialogTitle>
          <IconButton onClick={handleClose} className="">
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          {indicadoresNoVisibles.map((indicator) => (
            <ListItem key={indicator.idIndicadorUsuario}>
              <ListItemText primary={indicator.indicador} />
              <Switch
                disabled={currentIndicator === indicator.idIndicadorUsuario}
                checked={currentIndicator ? currentIndicator === indicator.idIndicadorUsuario : indicator.display}
                onChange={() => handleToggleVisible(indicator.idIndicadorUsuario)}
              />
            </ListItem>
          ))}
        </List>
      </Dialog>
    </React.Fragment>
  );
}

