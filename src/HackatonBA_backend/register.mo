import Text "mo:base/Text";
import HashMap "mo:base/HashMap";
import Nat32 "mo:base/Nat32";
import Nat64 "mo:base/Nat64";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";

actor ClientRegistry {

  type Id = Nat32;

  type ClientInfo = {
    nombre : Text;
    apellido : Text;
    telefono : Nat64;
    correo : Text;
    direccion : Text;
    usuario : Text;
    contrasena : Text;
    rol : Text;
  };

  stable var ID: Id = 0;
  let emailMap = HashMap.HashMap<Text, ClientInfo>(0, Text.equal, Text.hash);
  let userMap = HashMap.HashMap<Text, ClientInfo>(0, Text.equal, Text.hash);
  let IDGenerate = HashMap.HashMap<Text, ClientInfo>(0, Text.equal, Text.hash);

  private func generaID() : Nat32 {
    ID += 1;
    return ID;
  };

  public query func getID() : async Nat32 {
    return ID;
  };

  public shared func crearRegistro(   //Función para registrar nuevos usuarios.
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
      rol = "Usuario";
    };

    let id = generaID();
    IDGenerate.put(Nat32.toText(id), register);
    
    emailMap.put(correo, register);
    userMap.put(usuario, register);

    Debug.print("¡Usuario registrado correctamente! ID: " # Nat32.toText(id));
    return true;
  };//Aquí se acaba la función para registrar


  public query func getUser (id: Text) : async ? ClientInfo { //Función para mostrar 1 usuario registrado por ID
		let user: ?ClientInfo = IDGenerate.get(id);
		return user;
	};

  public query func getUsers () : async [(Text, ClientInfo)] { //Función para mostrar todos los usuarios registrados
		let userIter : Iter.Iter<(Text, ClientInfo)> = IDGenerate.entries();
		let userArray : [(Text, ClientInfo)] = Iter.toArray(userIter);
		return userArray;
	};

  public shared func updateUser( //función para actualizar el usuario
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
        contrasena = contrasena;
        rol = "Usuario"; 
      };
      IDGenerate.put(id, newData);
      Debug.print("Se actualizó la información del usuario con el ID: " # id);
      return true;
    };
  };
};

  public func deleteUser (id: Text) : async Bool { //Función para eliminar un usuario registrado por ID
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

public query func loginUser(identifier: Text, contrasena: Text) : async Bool { //Función para inicio de sesión
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

  public query func getUserInfoByEmail(correo: Text) : async ?ClientInfo { //Función para busqueda de usuario por correo.
    let user: ?ClientInfo = emailMap.get(correo);
    return user;
  };

  public query func getUserInfoByUsername(usuario: Text) : async ?ClientInfo { //Función para busqueda de usuario por nombre de usuario.
    let user: ?ClientInfo = userMap.get(usuario);
    return user;
  };








/////////////////////////////////////Servicios////////////////////////////////////


  type IdService = Nat32;

  type ServiceInfo = {
    noPedido : IdService;
    nombreReceptor : Text;
    calle : Text;
    numero : Nat32;
    colonia : Text;
    codigoPostal : Nat32;
    municipio : Text;
    capacidadPipa : Nat32;
  };

  stable var IDService: IdService = 0;
  let IDServiceGenerate = HashMap.HashMap<Text, ServiceInfo>(0, Text.equal, Text.hash);

  private func generaIDService() : Nat32 {
    IDService += 1;
    return IDService;
  };

  public query func getIDService() : async Nat32 {
    return IDService;
  };

  public shared func crearServicio( ////Función para crear un servicio.
    nombreReceptor : Text,
    calle : Text,
    numero : Nat32,
    colonia : Text,
    codigoPostal : Nat32,
    municipio : Text,
    capacidadPipa : Nat32,
  ) : async Bool {
    if (nombreReceptor.size() < 3 or nombreReceptor.size() > 100) {
      Debug.print("Error: El nombre del receptor debe contener entre 3 y 100 caracteres.");
      return false;
    };

    if (calle.size() < 3 or calle.size() > 50) {
      Debug.print("Error: La calle debe contener entre 3 y 50 caracteres.");
      return false;
    };

    if (numero < 1 or numero > 9999) {
      Debug.print("Error: El número debe contener entre 1 y 4 números.");
      return false;
    };

    if (colonia.size() < 3 or colonia.size() > 50) {
      Debug.print("Error: La colonia debe contener entre 3 y 50 caracteres.");
      return false;
    };

    if (codigoPostal < 1000 or codigoPostal > 99999) {
      Debug.print("Error: El código postal debe contener entre 4 y 5 números.");
      return false;
    };

    if (municipio.size() < 3 or municipio.size() > 40) {
      Debug.print("Error: El municipio debe contener entre 3 y 40 caracteres.");
      return false;
    };

    if (capacidadPipa < 1000 or capacidadPipa > 99999) {
      Debug.print("Error: La capacidad de la pipa debe contener entre 4 y 5 números.");
      return false;
    };

    let registerService = {
      noPedido = generaIDService();
      nombreReceptor = nombreReceptor;
      calle = calle;
      numero = numero;
      colonia = colonia;
      codigoPostal = codigoPostal;
      municipio = municipio;
      capacidadPipa = capacidadPipa;
    };

    IDServiceGenerate.put(Nat32.toText(registerService.noPedido), registerService);

    Debug.print("¡Servicio registrado correctamente! No. de pedido: " # Nat32.toText(registerService.noPedido));
    return true;
  };

  public query func getService(idService: Text) : async ?ServiceInfo { //Función para buscar un registro por ID.
    let service: ?ServiceInfo = IDServiceGenerate.get(idService);
    return service;
  };

  public query func getServices() : async [(Text, ServiceInfo)] { //Función para buscar todos los servicios registrados.
    let serviceIter: Iter.Iter<(Text, ServiceInfo)> = IDServiceGenerate.entries();
    let serviceArray: [(Text, ServiceInfo)] = Iter.toArray(serviceIter);
    return serviceArray;
  };

  public shared func updateService( //Función para actualizar un servicio.
    idService: Text,
    nombreReceptor : Text,
    calle : Text,
    numero : Nat32,
    colonia : Text,
    codigoPostal : Nat32,
    municipio : Text,
    capacidadPipa : Nat32,
  ) : async Bool {
    if (nombreReceptor.size() < 3 or nombreReceptor.size() > 100) {
      Debug.print("Error: El nombre del receptor debe contener entre 3 y 100 caracteres.");
      return false;
    };

    if (calle.size() < 3 or calle.size() > 50) {
      Debug.print("Error: La calle debe contener entre 3 y 50 caracteres.");
      return false;
    };

    if (numero < 1 or numero > 9999) {
      Debug.print("Error: El número debe contener entre 1 y 4 números.");
      return false;
    };

    if (colonia.size() < 3 or colonia.size() > 50) {
      Debug.print("Error: La colonia debe contener entre 3 y 50 caracteres.");
      return false;
    };

    if (codigoPostal < 1000 or codigoPostal > 99999) {
      Debug.print("Error: El código postal debe contener entre 4 y 5 números.");
      return false;
    };

    if (municipio.size() < 3 or municipio.size() > 40) {
      Debug.print("Error: El municipio debe contener entre 3 y 40 caracteres.");
      return false;
    };

    if (capacidadPipa < 1000 or capacidadPipa > 99999) {
      Debug.print("Error: La capacidad de la pipa debe contener entre 4 y 5 números.");
      return false;
    };

    let service: ?ServiceInfo = IDServiceGenerate.get(idService);

    switch (service) {
      case (null) {
        Debug.print("El servicio con el ID: " # idService # " no se ha encontrado");
        return false;
      };
      case (?currentService) {
        let newDataService: ServiceInfo = {
          noPedido = currentService.noPedido;
          nombreReceptor = nombreReceptor;
          calle = calle;
          numero = numero;
          colonia = colonia;
          codigoPostal = codigoPostal;
          municipio = municipio;
          capacidadPipa = capacidadPipa;
        };
        IDServiceGenerate.put(idService, newDataService);
        Debug.print("Se actualizó la información del servicio con el ID: " # idService);
        return true;
      };
    };
  };

  public func deleteService(idService: Text) : async Bool { //Función para borrar un servicio por ID.
    let service: ?ServiceInfo = IDServiceGenerate.get(idService);
    switch (service) {
      case (null) {
        Debug.print("El servicio con el ID: " # idService # " no se ha encontrado");
        return false;
      };
      case (_) {
        ignore IDServiceGenerate.remove(idService);
        Debug.print("Servicio con ID: " # idService # " eliminado correctamente.");
        return true;
      };
    };
  };








  ////////////////////////////////////////////Comentarios////////////////////////





  type IdComment = Nat32;

  type CommentInfo = {
    idComment: IdComment;
    pregunta1: Nat32;
    pregunta2: Nat32;
    pregunta3: Nat32;
    pregunta4: Nat32;
    pregunta5: Nat32;
    pregunta6: Nat32;
    pregunta7: Text;
  };

  stable var IDComment: IdComment = 0;
  let IDCommentGenerate = HashMap.HashMap<Text, CommentInfo>(0, Text.equal, Text.hash);

  private func generaIDComment() : Nat32 { //Función para auto incrementar el ID = 1    ID + 1 = 2    ID + 1 = 3.
    IDComment += 1;
    return IDComment;
  };

  public query func getIDComment() : async Nat32 {
    return IDComment;
  };

  public shared func crearComentario( //Función para crear un comentario.
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
      idComment = generaIDComment();
      pregunta1 = pregunta1;
      pregunta2 = pregunta2;
      pregunta3 = pregunta3;
      pregunta4 = pregunta4;
      pregunta5 = pregunta5;
      pregunta6 = pregunta6;
      pregunta7 = pregunta7;
    };

    IDCommentGenerate.put(Nat32.toText(comment.idComment), comment);

    Debug.print("¡Comentario registrado correctamente! ID: " # Nat32.toText(comment.idComment));
    return true;
  };

  public query func getComment(idComment: Text) : async ?CommentInfo { //Función para obtener un comentario por ID.
    let comment: ?CommentInfo = IDCommentGenerate.get(idComment);
    return comment;
  };

  public query func getComments() : async [(Text, CommentInfo)] { //Función para obtener todos los comentarios registrados.
    let commentIter: Iter.Iter<(Text, CommentInfo)> = IDCommentGenerate.entries();
    let commentArray: [(Text, CommentInfo)] = Iter.toArray(commentIter);
    return commentArray;
  };

  public shared func updateComment( //Función para actualizar un comentario.
    idComment: Text,
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

    let comment: ?CommentInfo = IDCommentGenerate.get(idComment);

    switch (comment) {
      case (null) {
        Debug.print("El comentario con el ID: " # idComment # " no se ha encontrado");
        return false;
      };
      case (?currentComment) {
        let newDataComment: CommentInfo = {
          idComment = currentComment.idComment;
          pregunta1 = pregunta1;
          pregunta2 = pregunta2;
          pregunta3 = pregunta3;
          pregunta4 = pregunta4;
          pregunta5 = pregunta5;
          pregunta6 = pregunta6;
          pregunta7 = pregunta7;
        };
        IDCommentGenerate.put(idComment, newDataComment);
        Debug.print("Se actualizó el comentario con el ID: " # idComment);
        return true;
      };
    };
  };

  public func deleteComment(idComment: Text) : async Bool { //Función para borrar un comentario por ID.
    let comment: ?CommentInfo = IDCommentGenerate.get(idComment);
    switch (comment) {
      case (null) {
        Debug.print("El comentario con el ID: " # idComment # " no se ha encontrado");
        return false;
      };
      case (_) {
        ignore IDCommentGenerate.remove(idComment);
        Debug.print("Comentario con ID: " # idComment # " eliminado correctamente.");
        return true;
      };
    };
  };



};