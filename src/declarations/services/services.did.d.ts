import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type Id = number;
export interface ServiceInfo {
  'noPedido' : Id,
  'municipio' : string,
  'codigoPostal' : number,
  'calle' : string,
  'numero' : number,
  'nombreReceptor' : string,
  'colonia' : string,
  'capacidadPipa' : number,
}
export interface _SERVICE {
  'crearRegistro' : ActorMethod<
    [string, string, number, string, number, string, number],
    boolean
  >,
  'deleteService' : ActorMethod<[string], boolean>,
  'getID' : ActorMethod<[], number>,
  'getService' : ActorMethod<[string], [] | [ServiceInfo]>,
  'getServices' : ActorMethod<[], Array<[string, ServiceInfo]>>,
  'updateService' : ActorMethod<
    [string, string, string, number, string, number, string, number],
    boolean
  >,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
