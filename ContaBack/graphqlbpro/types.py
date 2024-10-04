# types.py

import strawberry
from typing import List, Optional

#Types SP JsonIndicadoresCarrusel
@strawberry.type
class DatosIndicadorType:
    total: str
    nombre: str
    enc_tabla: str
    alineacion: str
    id_indicador: int
    id_det_contenido: int

@strawberry.type
class IndicadorType:
    display: bool
    favorito: bool
    indicador: str
    id_categoria: int
    id_indicador: int
    anio_anterior: Optional[DatosIndicadorType]  
    mes_anterior: Optional[DatosIndicadorType]  
    mes_actual: Optional[DatosIndicadorType]  
    id_indicador_usuario: int
    
@strawberry.type
class ModificaIndicadorResponse:
    success: bool
    message: str

