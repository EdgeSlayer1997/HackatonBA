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
    'loginUser' : IDL.Func([IDL.Text, IDL.Text], [IDL.Bool], ['query']),
    'registerUser' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Nat64, IDL.Text, IDL.Text, IDL.Text, IDL.Text],
        [],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
