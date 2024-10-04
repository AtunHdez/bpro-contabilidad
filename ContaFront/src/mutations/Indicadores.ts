import { graphql, commitMutation } from 'react-relay';
import { Environment } from 'relay-runtime';

const modificaFavoritosMutation = graphql`
  mutation IndicadoresModificaFavoritosMutation(
    $idUsuario: Int!
    $favorito: Boolean!
    $idIndicadorUsuario: Int!
  ) {
    modificaFavoritos(
      idUsuario: $idUsuario
      favorito: $favorito
      idIndicadorUsuario: $idIndicadorUsuario
    ) {
      success
      message
    }
  }
`;

export function modificaFavoritos(
  environment: Environment,
  idUsuario: number,
  favorito: boolean,
  idIndicadorUsuario: number,
  onCompleted: (response: any) => void,
  onError: (error: any) => void
) {
  const variables = {
    idUsuario,
    favorito,
    idIndicadorUsuario,
  };

  commitMutation(environment, {
    mutation: modificaFavoritosMutation,
    variables,
    onCompleted,
    onError,
  });
}

const modificaVisiblesMutation = graphql`
  mutation IndicadoresModificaVisiblesMutation(
    $idUsuario: Int!
    $visible: Boolean!
    $idIndicadorUsuario: Int!
  ) {
    modificaVisibles(
      idUsuario: $idUsuario
      visible: $visible
      idIndicadorUsuario: $idIndicadorUsuario
    ) {
      success
      message
    }
  }
`;

export function modificaVisibles(
  environment: Environment,
  idUsuario: number,
  visible: boolean,
  idIndicadorUsuario: number,
  onCompleted: (response: any) => void,
  onError: (error: any) => void
) {
  const variables = {
    idUsuario,
    visible,
    idIndicadorUsuario,
  };

  commitMutation(environment, {
    mutation: modificaVisiblesMutation,
    variables,
    onCompleted,
    onError,
  });
}
