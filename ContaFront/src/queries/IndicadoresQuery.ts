import { graphql } from 'react-relay';

export const IndicadoresQuery = graphql`
query IndicadoresQuery($usuarioId: Int!) {
  getIndicadores (usuarioId: $usuarioId) {
    display
    favorito
    indicador
    idCategoria
    idIndicador
    anioAnterior {
      total
      nombre
      encTabla
      alineacion
      idIndicador
      idDetContenido
    },
    mesAnterior {
      total
      nombre
      encTabla
      alineacion
      idIndicador
      idDetContenido
    },
    mesActual {
      total
      nombre
      encTabla
      alineacion
      idIndicador
      idDetContenido
    }
    idIndicadorUsuario
  }
}`;
