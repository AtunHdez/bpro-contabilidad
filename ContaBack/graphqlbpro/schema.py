# schema.py

import strawberry
import strawberry_django
from strawberry_django.optimizer import DjangoOptimizerExtension
from typing import List
from django.db import connection
from django.contrib.auth.models import User
from graphqlbpro.services import fetch_indicadores_carrusel, modifica_favoritos_procedure, modifica_visibles_procedure
from .types import DatosIndicadorType, IndicadorType, ModificaIndicadorResponse

@strawberry.type
class Categoria:
    categoria: int
    nombre: str
    orden: int


@strawberry.type
class Query:
    @strawberry.field
    def categorias_por_usuario(self, id_usuario: int) -> List[Categoria]:
        with connection.cursor() as cursor:
            cursor.callproc('MuestraCategorias', [id_usuario])
            results = cursor.fetchall()
            categorias = [Categoria(categoria=row[0], nombre=row[1], orden=row[2]) for row in results]
        
        return categorias
    
    @strawberry.field
    def get_indicadores(self, usuario_id: int) -> List[IndicadorType]:
        resultados = fetch_indicadores_carrusel(usuario_id)

        indicadores = []
        for resultado in resultados:
            datos_indicador = resultado.get('datosIndicador', [])

            anio_anterior = datos_indicador[0]
            mes_anterior  = datos_indicador[1]
            mes_actual = datos_indicador[2] if datos_indicador[2] else "0"
            print("Resultados del SP:", resultado['indicador'])
            indicadores.append(
                IndicadorType(
                    display=resultado['display'],
                    favorito=resultado['favorito'],
                    indicador=resultado['indicador'],
                    id_categoria=resultado['id_categoria'],
                    id_indicador=resultado['id_indicador'],
                    anio_anterior=DatosIndicadorType(**anio_anterior) if anio_anterior else None,
                    mes_anterior=DatosIndicadorType(**mes_anterior)  if mes_anterior else None,
                    mes_actual=DatosIndicadorType(**mes_actual)    if mes_actual else None,
                    id_indicador_usuario=resultado.get('id_indicador_usuario')
                )
            )
        return indicadores
    
@strawberry.type
class Mutation:
    @strawberry.mutation
    def modifica_favoritos(
        self,
        id_usuario: int,
        favorito: bool,
        id_indicador_usuario: int
    ) -> ModificaIndicadorResponse:
        response = modifica_favoritos_procedure(id_usuario, favorito, id_indicador_usuario)
        return response
            
    # Modificar visibles
    @strawberry.mutation
    def modifica_visibles(
        self,
        id_usuario: int,
        visible: bool,
        id_indicador_usuario: int
    ) -> ModificaIndicadorResponse:
        response = modifica_visibles_procedure(id_usuario, visible, id_indicador_usuario)
        return response
            

schema = strawberry.Schema(
    query=Query,
    mutation=Mutation,
    extensions=[
        DjangoOptimizerExtension,  # not required, but highly recommended
    ],
)