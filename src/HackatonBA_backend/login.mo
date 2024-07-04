import Text "mo:base/Text";
import HashMap "mo:base/HashMap";
import Nat32 "mo:base/Nat32";
import Nat64 "mo:base/Nat64";
import Debug "mo:base/Debug";

actor UserAuth {

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

  let emailMap = HashMap.HashMap<Text, ClientInfo>(0, Text.equal, Text.hash);
  let userMap = HashMap.HashMap<Text, ClientInfo>(0, Text.equal, Text.hash);

  public shared func registerUser(nombre : Text, apellido : Text, telefono : Nat64, correo : Text, direccion : Text, usuario : Text, contrasena : Text) : async () {
    let register = { nombre=nombre; apellido=apellido; telefono=telefono; correo=correo; direccion=direccion; usuario=usuario; contrasena=contrasena};

    emailMap.put(correo, register);
    userMap.put(usuario, register);
    
    Debug.print("¡Usuario registrado correctamente! Correo: " # correo # ", Usuario: " # usuario);
    return ();
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
