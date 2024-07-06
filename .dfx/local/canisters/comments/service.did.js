export const idlFactory = ({ IDL }) => {
  const Id = IDL.Nat32;
  const CommentInfo = IDL.Record({
    'id' : Id,
    'pregunta1' : IDL.Nat32,
    'pregunta2' : IDL.Nat32,
    'pregunta3' : IDL.Nat32,
    'pregunta4' : IDL.Nat32,
    'pregunta5' : IDL.Nat32,
    'pregunta6' : IDL.Nat32,
    'pregunta7' : IDL.Text,
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
    'deleteComment' : IDL.Func([IDL.Text], [IDL.Bool], []),
    'getComment' : IDL.Func([IDL.Text], [IDL.Opt(CommentInfo)], ['query']),
    'getComments' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Text, CommentInfo))],
        ['query'],
      ),
    'getID' : IDL.Func([], [IDL.Nat32], ['query']),
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
  });
};
export const init = ({ IDL }) => { return []; };
