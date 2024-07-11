import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface ClientInfo {
  'rol' : string,
  'direccion' : string,
  'nombre' : string,
  'usuario' : string,
  'apellido' : string,
  'correo' : string,
  'telefono' : bigint,
  'contrasena' : string,
}
export interface CommentInfo {
  'idComment' : IdComment,
  'pregunta1' : number,
  'pregunta2' : number,
  'pregunta3' : number,
  'pregunta4' : number,
  'pregunta5' : number,
  'pregunta6' : number,
  'pregunta7' : string,
}
export type IdComment = number;
export type IdService = number;
export interface ServiceInfo {
  'noPedido' : IdService,
  'municipio' : string,
  'codigoPostal' : number,
  'calle' : string,
  'numero' : number,
  'nombreReceptor' : string,
  'colonia' : string,
  'capacidadPipa' : number,
}
export interface _SERVICE {
  'crearComentario' : ActorMethod<
    [number, number, number, number, number, number, string],
    boolean
  >,
  'crearRegistro' : ActorMethod<
    [string, string, bigint, string, string, string, string],
    boolean
  >,
  'crearServicio' : ActorMethod<
    [string, string, number, string, number, string, number],
    boolean
  >,
  'deleteComment' : ActorMethod<[string], boolean>,
  'deleteService' : ActorMethod<[string], boolean>,
  'deleteUser' : ActorMethod<[string], boolean>,
  'getComment' : ActorMethod<[string], [] | [CommentInfo]>,
  'getComments' : ActorMethod<[], Array<[string, CommentInfo]>>,
  'getID' : ActorMethod<[], number>,
  'getIDComment' : ActorMethod<[], number>,
  'getIDService' : ActorMethod<[], number>,
  'getService' : ActorMethod<[string], [] | [ServiceInfo]>,
  'getServices' : ActorMethod<[], Array<[string, ServiceInfo]>>,
  'getUser' : ActorMethod<[string], [] | [ClientInfo]>,
  'getUserInfoByEmail' : ActorMethod<[string], [] | [ClientInfo]>,
  'getUserInfoByUsername' : ActorMethod<[string], [] | [ClientInfo]>,
  'getUsers' : ActorMethod<[], Array<[string, ClientInfo]>>,
  'loginUser' : ActorMethod<[string, string], boolean>,
  'updateComment' : ActorMethod<
    [string, number, number, number, number, number, number, string],
    boolean
  >,
  'updateService' : ActorMethod<
    [string, string, string, number, string, number, string, number],
    boolean
  >,
  'updateUser' : ActorMethod<
    [string, string, string, bigint, string, string, string, string],
    boolean
  >,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
