from django.db import connection
import json
from .types import ModificaIndicadorResponse

#Obtiene Json de Indicadores para Contenedor Carrusel
def fetch_indicadores_carrusel(usuario_id: int):
    with connection.cursor() as cursor:
        cursor.callproc('JsonIndicadoresCarrusel', [usuario_id])
        rows = cursor.fetchall()

        json_results = []
        for row in rows:
            json_result = json.loads(row[0]) if row else {}
            json_results.append(json_result)
        
        #Imprimir respuesta SP
        #print("Resultados del SP:", json_results)

        return json_results
    
def modifica_favoritos_procedure(
    id_usuario: int, favorito: bool, id_indicador_usuario: int
):
    """
    Modifica el estado de favoritos de un indicador para un usuario.
    
    Args:
        id_usuario (int): ID del usuario.
        favorito (bool): Indica si el indicador se marcará como favorito.
        id_indicador_usuario (int): ID del indicador para el usuario.
        
    Returns:
        ModificaIndicadorResponse: Objeto con la respuesta de la operación.
    """
    
    try:
        with connection.cursor() as cursor:
            enciende_apaga = 1 if favorito else 0
            cursor.callproc('ModificaFavoritos', [id_usuario, enciende_apaga, id_indicador_usuario])
            result = cursor.fetchone()
            
            # Si hay un error comprobarlo
            if result and len(result) > 0: 
                error_data = json.loads(result[0])
                
                return ModificaIndicadorResponse(success=False, message=error_data['descripcion'])
            
        return ModificaIndicadorResponse(
            success=True,
            message=f"El indicador fue {'marcado como favorito' if favorito else 'desmarcado de favoritos'}"
        )
    except Exception as e:
        return ModificaIndicadorResponse(
            success=False,
            message=f"Error al ejecutar el procedimiento almacenado: {str(e)}",
        ) 

def modifica_visibles_procedure(
    id_usuario: int, visible: bool, id_indicador_usuario: int
):
    """
    Modifica el estado de visibilidad de un indicador para un usuario.
    
    Args:
        id_usuario (int): ID del usuario.
        visible (bool): Indica si el indicador se mostrará u ocultará.
        id_indicador_usuario (int): ID del indicador para el usuario.
        
    Returns:
        ModificaIndicadorResponse: Objeto con la respuesta de la operación.
    """
    
    try:
        with connection.cursor() as cursor:
            enciende_apaga = 1 if visible else 0
            cursor.callproc('ModificaVisibles', [id_usuario, enciende_apaga, id_indicador_usuario])
            result = cursor.fetchone()
            
            # Si hay un error comprobarlo
            if result and len(result) > 0: 
                error_data = json.loads(result[0])
                
                return ModificaIndicadorResponse(success=False, message=error_data['descripcion'])
            
        return ModificaIndicadorResponse(
            success=True,
            message=f"El indicador fue {'mostrado nuevamente' if visible else 'ocultado'}"
        )
    except Exception as e:
        return ModificaIndicadorResponse(
            success=False,
            message=f"Error al ejecutar el procedimiento almacenado: {str(e)}",
        )
                
                
                
                
            
    