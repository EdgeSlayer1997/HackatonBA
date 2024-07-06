import Text "mo:base/Text";
import HashMap "mo:base/HashMap";
import Nat32 "mo:base/Nat32";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";

actor CommentRegistry {

  type Id = Nat32;

  type CommentInfo = {
    id: Id;
    pregunta1: Nat32; // Debe estar entre 1 y 5
    pregunta2: Nat32; // Debe estar entre 1 y 5
    pregunta3: Nat32; // Debe estar entre 1 y 5
    pregunta4: Nat32; // Debe estar entre 1 y 3
    pregunta5: Nat32; // Debe estar entre 1 y 5
    pregunta6: Nat32; // Debe estar entre 1 y 5
    pregunta7: Text; // Debe tener entre 3 y 200 caracteres
  };

  stable var ID: Id = 0;
  let IDGenerate = HashMap.HashMap<Text, CommentInfo>(0, Text.equal, Text.hash);

  private func generaID() : Nat32 {
    ID += 1;
    return ID;
  };

  public query func getID() : async Nat32 {
    return ID;
  };

  public shared func crearComentario(
    pregunta1 : Nat32,
    pregunta2 : Nat32,
    pregunta3 : Nat32,
    pregunta4 : Nat32,
    pregunta5 : Nat32,
    pregunta6 : Nat32,
    pregunta7 : Text,
  ) : async Bool {
    if (
      pregunta1 < 1 or pregunta1 > 5 or
      pregunta2 < 1 or pregunta2 > 5 or
      pregunta3 < 1 or pregunta3 > 5 or
      pregunta4 < 1 or pregunta4 > 3 or
      pregunta5 < 1 or pregunta5 > 5 or
      pregunta6 < 1 or pregunta6 > 5 or
      pregunta7.size() < 3 or pregunta7.size() > 200
    ) {
      Debug.print("Error: Verifica que todos los campos estén correctamente llenados.");
      return false;
    };

    let comment = {
      id = generaID();
      pregunta1 = pregunta1;
      pregunta2 = pregunta2;
      pregunta3 = pregunta3;
      pregunta4 = pregunta4;
      pregunta5 = pregunta5;
      pregunta6 = pregunta6;
      pregunta7 = pregunta7;
    };

    IDGenerate.put(Nat32.toText(comment.id), comment);

    Debug.print("¡Comentario registrado correctamente! ID: " # Nat32.toText(comment.id));
    return true;
  };

  public query func getComment(id: Text) : async ?CommentInfo {
    let comment: ?CommentInfo = IDGenerate.get(id);
    return comment;
  };

  public query func getComments() : async [(Text, CommentInfo)] {
    let commentIter: Iter.Iter<(Text, CommentInfo)> = IDGenerate.entries();
    let commentArray: [(Text, CommentInfo)] = Iter.toArray(commentIter);
    return commentArray;
  };

  public shared func updateComment(
    id: Text,
    pregunta1 : Nat32,
    pregunta2 : Nat32,
    pregunta3 : Nat32,
    pregunta4 : Nat32,
    pregunta5 : Nat32,
    pregunta6 : Nat32,
    pregunta7 : Text,
  ) : async Bool {
    if (
      pregunta1 < 1 or pregunta1 > 5 or
      pregunta2 < 1 or pregunta2 > 5 or
      pregunta3 < 1 or pregunta3 > 5 or
      pregunta4 < 1 or pregunta4 > 3 or
      pregunta5 < 1 or pregunta5 > 5 or
      pregunta6 < 1 or pregunta6 > 5 or
      pregunta7.size() < 3 or pregunta7.size() > 200
    ) {
      Debug.print("Error: Verifica que todos los campos estén correctamente llenados.");
      return false;
    };

    let comment: ?CommentInfo = IDGenerate.get(id);

    switch (comment) {
      case (null) {
        Debug.print("El comentario con el ID: " # id # " no se ha encontrado");
        return false;
      };
      case (?currentComment) {
        let newData: CommentInfo = {
          id = currentComment.id;
          pregunta1 = pregunta1;
          pregunta2 = pregunta2;
          pregunta3 = pregunta3;
          pregunta4 = pregunta4;
          pregunta5 = pregunta5;
          pregunta6 = pregunta6;
          pregunta7 = pregunta7;
        };
        IDGenerate.put(id, newData);
        Debug.print("Se actualizó el comentario con el ID: " # id);
        return true;
      };
    };
  };

  public func deleteComment(id: Text) : async Bool {
    let comment: ?CommentInfo = IDGenerate.get(id);
    switch (comment) {
      case (null) {
        Debug.print("El comentario con el ID: " # id # " no se ha encontrado");
        return false;
      };
      case (_) {
        ignore IDGenerate.remove(id);
        Debug.print("Comentario con ID: " # id # " eliminado correctamente.");
        return true;
      };
    };
  };

};
