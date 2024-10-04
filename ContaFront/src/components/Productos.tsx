"use client";
// src/components/Productos.tsx
import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Box from '@mui/material/Box';

// Define una interfaz para el tipo de producto
interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
}

const Productos: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [selectedProducto, setSelectedProducto] = useState<Producto | null>(null);

  // Obtener los productos desde una API
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/productos/');
        const data: Producto[] = await response.json();
        setProductos(data);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };

    fetchProductos();
  }, []);

  const handleChange = (event: { target: { value: any; }; }) => {
    const productoId = Number(event.target.value);
    const productoSeleccionado = productos.find((producto) => producto.id === productoId) || null;
    setSelectedProducto(productoSeleccionado);
  };

  return (
    <Box sx={{ margin: '20px' }}>
      <h1 sx={{ margin: '20px' }}>Lista de Productos</h1>
      <FormControl sx={{ width: '250px' }}>
        <InputLabel id="select-producto-label">Selecciona un Producto</InputLabel>
        <Select
          labelId="select-producto-label"
          id="select-producto"
          value={selectedProducto?.id || ''}
          label="Selecciona un Producto"
          onChange={handleChange}
        >
          {productos.map((producto) => (
            <MenuItem key={producto.id} value={producto.id}>
              {producto.nombre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedProducto && (
        <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Precio</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{selectedProducto.nombre}</TableCell>
                <TableCell>{selectedProducto.descripcion}</TableCell>
                <TableCell>${selectedProducto.precio}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default Productos;
