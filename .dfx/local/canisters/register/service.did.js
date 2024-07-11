export const idlFactory = ({ IDL }) => {
  const IdComment = IDL.Nat32;
  const CommentInfo = IDL.Record({
    'idComment' : IdComment,
    'pregunta1' : IDL.Nat32,
    'pregunta2' : IDL.Nat32,
    'pregunta3' : IDL.Nat32,
    'pregunta4' : IDL.Nat32,
    'pregunta5' : IDL.Nat32,
    'pregunta6' : IDL.Nat32,
    'pregunta7' : IDL.Text,
  });
  const IdService = IDL.Nat32;
  const ServiceInfo = IDL.Record({
    'noPedido' : IdService,
    'municipio' : IDL.Text,
    'codigoPostal' : IDL.Nat32,
    'calle' : IDL.Text,
    'numero' : IDL.Nat32,
    'nombreReceptor' : IDL.Text,
    'colonia' : IDL.Text,
    'capacidadPipa' : IDL.Nat32,
  });
  const ClientInfo = IDL.Record({
    'rol' : IDL.Text,
    'direccion' : IDL.Text,
    'nombre' : IDL.Text,
    'usuario' : IDL.Text,
    'apellido' : IDL.Text,
    'correo' : IDL.Text,
    'telefono' : IDL.Nat64,
    'contrasena' : IDL.Text,
  });
  return IDL.Service({
    'crearComentario' : IDL.Func(
        [
          IDL.Nat32,
          IDL.Nat32,
          IDL.Nat32,
          IDL.Nat32,
          IDL.Nat32,
          IDL.Nat32,
          IDL.Text,
        ],
        [IDL.Bool],
        [],
      ),
    'crearRegistro' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Nat64, IDL.Text, IDL.Text, IDL.Text, IDL.Text],
        [IDL.Bool],
        [],
      ),
    'crearServicio' : IDL.Func(
        [
          IDL.Text,
          IDL.Text,
          IDL.Nat32,
          IDL.Text,
          IDL.Nat32,
          IDL.Text,
          IDL.Nat32,
        ],
        [IDL.Bool],
        [],
      ),
    'deleteComment' : IDL.Func([IDL.Text], [IDL.Bool], []),
    'deleteService' : IDL.Func([IDL.Text], [IDL.Bool], []),
    'deleteUser' : IDL.Func([IDL.Text], [IDL.Bool], []),
    'getComment' : IDL.Func([IDL.Text], [IDL.Opt(CommentInfo)], ['query']),
    'getComments' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Text, CommentInfo))],
        ['query'],
      ),
    'getID' : IDL.Func([], [IDL.Nat32], ['query']),
    'getIDComment' : IDL.Func([], [IDL.Nat32], ['query']),
    'getIDService' : IDL.Func([], [IDL.Nat32], ['query']),
    'getService' : IDL.Func([IDL.Text], [IDL.Opt(ServiceInfo)], ['query']),
    'getServices' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Text, ServiceInfo))],
        ['query'],
      ),
    'getUser' : IDL.Func([IDL.Text], [IDL.Opt(ClientInfo)], ['query']),
    'getUserInfoByEmail' : IDL.Func(
        [IDL.Text],
        [IDL.Opt(ClientInfo)],
        ['query'],
      ),
    'getUserInfoByUsername' : IDL.Func(
        [IDL.Text],
        [IDL.Opt(ClientInfo)],
        ['query'],
      ),
    'getUsers' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Text, ClientInfo))],
        ['query'],
      ),
    'loginUser' : IDL.Func([IDL.Text, IDL.Text], [IDL.Bool], ['query']),
    'updateComment' : IDL.Func(
        [
          IDL.Text,
          IDL.Nat32,
          IDL.Nat32,
          IDL.Nat32,
          IDL.Nat32,
          IDL.Nat32,
          IDL.Nat32,
          IDL.Text,
        ],
        [IDL.Bool],
        [],
      ),
    'updateService' : IDL.Func(
        [
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Nat32,
          IDL.Text,
          IDL.Nat32,
          IDL.Text,
          IDL.Nat32,
        ],
        [IDL.Bool],
        [],
      ),
    'updateUser' : IDL.Func(
        [
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Nat64,
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Text,
        ],
        [IDL.Bool],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
