export const idlFactory = ({ IDL }) => {
  const ClientInfo = IDL.Record({
    'direccion' : IDL.Text,
    'nombre' : IDL.Text,
    'usuario' : IDL.Text,
    'apellido' : IDL.Text,
    'correo' : IDL.Text,
    'telefono' : IDL.Nat64,
    'contrasena' : IDL.Text,
  });
  return IDL.Service({
    'crearRegistro' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Nat64, IDL.Text, IDL.Text, IDL.Text, IDL.Text],
        [],
        [],
      ),
    'deleteUser' : IDL.Func([IDL.Text], [IDL.Bool], []),
    'getID' : IDL.Func([], [IDL.Nat32], ['query']),
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
