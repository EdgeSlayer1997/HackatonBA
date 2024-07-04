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

  public shared func crearRegistro(nombre : Text, apellido : Text, telefono : Nat64, correo : Text, direccion : Text, usuario : Text, contrasena : Text) : async () {
		let register = { nombre=nombre; apellido=apellido; telefono=telefono; correo=correo; direccion=direccion; usuario=usuario; contrasena=contrasena};

		emailMap.put(correo, register);
    	userMap.put(usuario, register);
		IDGenerate.put(Nat32.toText(generaID()), register);
		
		Debug.print("¡Usuario registrado correctamente! ID: " # Nat32.toText(ID));
		return ();
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

  public shared func updateUser (id: Text, nombre : Text, apellido : Text, telefono : Nat64, correo : Text, direccion : Text, usuario : Text, contrasena : Text) : async Bool {
		let user: ?ClientInfo = IDGenerate.get(id);

		switch (user) {
			case (null) {
				return false;
			};
			case (?currentUser) {
				let newData: ClientInfo = {nombre : Text; apellido : Text; telefono : Nat64; correo : Text; direccion : Text; usuario : Text; contrasena : Text};
				IDGenerate.put(id, newData);
				Debug.print("Se actualizó el registro del usuario: " # id);
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