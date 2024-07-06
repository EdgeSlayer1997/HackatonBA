export const idlFactory = ({ IDL }) => {
  const Id = IDL.Nat32;
  const ServiceInfo = IDL.Record({
    'noPedido' : Id,
    'municipio' : IDL.Text,
    'codigoPostal' : IDL.Nat32,
    'calle' : IDL.Text,
    'numero' : IDL.Nat32,
    'nombreReceptor' : IDL.Text,
    'colonia' : IDL.Text,
    'capacidadPipa' : IDL.Nat32,
  });
  return IDL.Service({
    'crearRegistro' : IDL.Func(
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
    'deleteService' : IDL.Func([IDL.Text], [IDL.Bool], []),
    'getID' : IDL.Func([], [IDL.Nat32], ['query']),
    'getService' : IDL.Func([IDL.Text], [IDL.Opt(ServiceInfo)], ['query']),
    'getServices' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Text, ServiceInfo))],
        ['query'],
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
  });
};
export const init = ({ IDL }) => { return []; };
