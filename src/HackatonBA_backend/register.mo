import Text "mo:base/Text";
import HashMap "mo:base/HashMap";
import Nat32 "mo:base/Nat32";
import Nat64 "mo:base/Nat64";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";

actor ClientRegistry {

  let emailMap = HashMap.HashMap<Text, ClientInfo>(0, Text.equal, Text.hash);
  let userMap = HashMap.HashMap<Text, ClientInfo>(0, Text.equal, Text.hash);

  type Id = Nat32;

  type ClientInfo = {
    nombre : Text;
    apellido : Text;
    telefono : Nat64;
    correo : Text;
    direccion : Text;
    usuario : Text;
    contrasena : Text;
  };

  stable var ID: Id = 0;
  let IDGenerate = HashMap.HashMap<Text, ClientInfo>(0, Text.equal, Text.hash);

  private func generaID() : Nat32 {
		ID += 1;
		return ID;
	};

  public query func getID() : async Nat32 {
		return ID;
	};

  public shared func crearRegistro(
    nombre : Text,
    apellido : Text,
    telefono : Nat64,
    correo : Text,
    direccion : Text,
    usuario : Text,
    contrasena : Text,
  ) : async Bool {
    if (nombre.size() == 0 or apellido.size() == 0 or correo.size() == 0 or direccion.size() == 0 or usuario.size() == 0 or contrasena.size() == 0) {
      Debug.print("Error: Todos los campos son obligatorios.");
      return false;
    };

    if (nombre.size() < 3 or nombre.size() > 50) {
      Debug.print("Error: El nombre debe contener entre 3 y 50 caracteres.");
      return false;
    };

    if (apellido.size() < 3 or apellido.size() > 50) {
      Debug.print("Error: Los apellidos deben contener entre 3 y 50 caracteres.");
      return false;
    };

    if (telefono < 1000000000 or telefono > 9999999999) {
      Debug.print("Error: El teléfono debe ser un número de 10 dígitos.");
      return false;
    };

    if (
      correo.size() < 13 or correo.size() > 100 or
      not Text.contains(correo, #text "@") or
      not Text.contains(correo, #text ".")
    ) {
      Debug.print("Error: El formato para el correo debe contener los simbolos '@' y '.' y tener entre 13 y 100 caracteres ");
      return false;
    };

    if (direccion.size() < 10 or direccion.size() > 100) {
      Debug.print("Error: La dirección debe contener entre 10 y 100 caracteres.");
      return false;
    };

    if (usuario.size() < 3 or usuario.size() > 50) {
      Debug.print("Error: El usuario debe contener entre 3 y 50 caracteres.");
      return false;
    };

    if (contrasena.size() < 3 or contrasena.size() > 30) {
      Debug.print("Error: La contraseña debe contener entre 3 y 30 caracteres.");
      return false;
    };

    let register = { 
      nombre = nombre;
      apellido = apellido;
      telefono = telefono;
      correo = correo;
      direccion = direccion;
      usuario = usuario;
      contrasena = contrasena;
    };

    IDGenerate.put(Nat32.toText(generaID()), register);

    Debug.print("¡Paciente registrado correctamente! ID: " # Nat32.toText(ID));
    return true;
  };


  public query func getUser (id: Text) : async ? ClientInfo {
		let user: ?ClientInfo = IDGenerate.get(id);
		return user;
	};

  public query func getUsers () : async [(Text, ClientInfo)] {
		let userIter : Iter.Iter<(Text, ClientInfo)> = IDGenerate.entries();
		let userArray : [(Text, ClientInfo)] = Iter.toArray(userIter);
		return userArray;
	};

  public shared func updateUser(
  id: Text,
  nombre : Text,
  apellido : Text,
  telefono : Nat64,
  correo : Text,
  direccion : Text,
  usuario : Text,
  contrasena : Text
  ) : async Bool {
  if (nombre.size() == 0 or apellido.size() == 0 or correo.size() == 0 or direccion.size() == 0 or usuario.size() == 0 or contrasena.size() == 0) {
      Debug.print("Error: Todos los campos son obligatorios.");
      return false;
    };

    if (nombre.size() < 3 or nombre.size() > 50) {
      Debug.print("Error: El nombre debe contener entre 3 y 50 caracteres.");
      return false;
    };

    if (apellido.size() < 3 or apellido.size() > 50) {
      Debug.print("Error: Los apellidos deben contener entre 3 y 50 caracteres.");
      return false;
    };

    if (telefono < 1000000000 or telefono > 9999999999) {
      Debug.print("Error: El teléfono debe ser un número de 10 dígitos.");
      return false;
    };

    if (
      correo.size() < 13 or correo.size() > 100 or
      not Text.contains(correo, #text "@") or
      not Text.contains(correo, #text ".")
    ) {
      Debug.print("Error: El formato para el correo debe contener los simbolos '@' y '.' y tener entre 13 y 100 caracteres ");
      return false;
    };

    if (direccion.size() < 10 or direccion.size() > 100) {
      Debug.print("Error: La dirección debe contener entre 10 y 100 caracteres.");
      return false;
    };

    if (usuario.size() < 3 or usuario.size() > 50) {
      Debug.print("Error: El usuario debe contener entre 3 y 50 caracteres.");
      return false;
    };

    if (contrasena.size() < 3 or contrasena.size() > 30) {
      Debug.print("Error: La contraseña debe contener entre 3 y 30 caracteres.");
      return false;
    };

    let user: ?ClientInfo = IDGenerate.get(id);

    switch (user) {
    case (null) {
	  Debug.print("El usuario con el ID: " # id # " no se ha encontrado");
      return false;
    };
    case (?currentUser) {
      let newData: ClientInfo = {
        nombre = nombre; 
        apellido = apellido;
        telefono = telefono;
        correo = correo;
        direccion = direccion; 
        usuario = usuario;
        contrasena = contrasena 
      };
      IDGenerate.put(id, newData);
      Debug.print("Se actualizó la información del usuario con el ID: " # id);
      return true;
    };
  };
};

  public func deleteUser (id: Text) : async Bool {
		let user : ?ClientInfo = IDGenerate.get(id);
		switch (user) {
			case (null) {
				return false;
			};
			case (_) {
				ignore IDGenerate.remove(id);
				Debug.print("Usuario: " # id # " eliminado correctamente.");
				return true;
			};
		};
	};

	public query func loginUser(identifier: Text, contrasena: Text) : async Bool {
    let emailUser: ?ClientInfo = emailMap.get(identifier);
    let usernameUser: ?ClientInfo = userMap.get(identifier);
    
    switch (emailUser, usernameUser) {
      case (null, null) {
        Debug.print("Inicio de sesión fallido: Usuario no encontrado.");
        return false;
      };
      case (?userInfo, _) {
        if (userInfo.contrasena == contrasena) {
          Debug.print("Inicio de sesión exitoso para el usuario: " # identifier);
          return true;
        } else {
          Debug.print("Inicio de sesión fallido: Contraseña incorrecta.");
          return false;
        }
      };
      case (_, ?userInfo) {
        if (userInfo.contrasena == contrasena) {
          Debug.print("Inicio de sesión exitoso para el usuario: " # identifier);
          return true;
        } else {
          Debug.print("Inicio de sesión fallido: Contraseña incorrecta.");
          return false;
        }
      };
    };
  };
  
  public query func getUserInfoByEmail(correo: Text) : async ?ClientInfo {
    let user: ?ClientInfo = emailMap.get(correo);
    return user;
  };

  public query func getUserInfoByUsername(usuario: Text) : async ?ClientInfo {
    let user: ?ClientInfo = userMap.get(usuario);
    return user;
  };

};