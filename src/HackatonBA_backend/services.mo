import Text "mo:base/Text";
import HashMap "mo:base/HashMap";
import Nat32 "mo:base/Nat32";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";

actor ServiceRegistry {

  type Id = Nat32;

  type ServiceInfo = {
    noPedido : Id;
    nombreReceptor : Text;
    calle : Text;
    numero : Nat32;
    colonia : Text;
    codigoPostal : Nat32;
    municipio : Text;
    capacidadPipa : Nat32;
  };

  stable var ID: Id = 0;
  let IDGenerate = HashMap.HashMap<Text, ServiceInfo>(0, Text.equal, Text.hash);

  private func generaID() : Nat32 {
    ID += 1;
    return ID;
  };

  public query func getID() : async Nat32 {
    return ID;
  };

  public shared func crearRegistro(
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

    let register = {
      noPedido = generaID();
      nombreReceptor = nombreReceptor;
      calle = calle;
      numero = numero;
      colonia = colonia;
      codigoPostal = codigoPostal;
      municipio = municipio;
      capacidadPipa = capacidadPipa;
    };

    IDGenerate.put(Nat32.toText(register.noPedido), register);

    Debug.print("¡Servicio registrado correctamente! No. de pedido: " # Nat32.toText(register.noPedido));
    return true;
  };

  public query func getService(id: Text) : async ?ServiceInfo {
    let service: ?ServiceInfo = IDGenerate.get(id);
    return service;
  };

  public query func getServices() : async [(Text, ServiceInfo)] {
    let serviceIter: Iter.Iter<(Text, ServiceInfo)> = IDGenerate.entries();
    let serviceArray: [(Text, ServiceInfo)] = Iter.toArray(serviceIter);
    return serviceArray;
  };

  public shared func updateService(
    id: Text,
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

    let service: ?ServiceInfo = IDGenerate.get(id);

    switch (service) {
      case (null) {
        Debug.print("El servicio con el ID: " # id # " no se ha encontrado");
        return false;
      };
      case (?currentService) {
        let newData: ServiceInfo = {
          noPedido = currentService.noPedido;
          nombreReceptor = nombreReceptor;
          calle = calle;
          numero = numero;
          colonia = colonia;
          codigoPostal = codigoPostal;
          municipio = municipio;
          capacidadPipa = capacidadPipa;
        };
        IDGenerate.put(id, newData);
        Debug.print("Se actualizó la información del servicio con el ID: " # id);
        return true;
      };
    };
  };

  public func deleteService(id: Text) : async Bool {
    let service: ?ServiceInfo = IDGenerate.get(id);
    switch (service) {
      case (null) {
        Debug.print("El servicio con el ID: " # id # " no se ha encontrado");
        return false;
      };
      case (_) {
        ignore IDGenerate.remove(id);
        Debug.print("Servicio con ID: " # id # " eliminado correctamente.");
        return true;
      };
    };
  };

};
