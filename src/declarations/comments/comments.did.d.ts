import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface CommentInfo {
  'id' : Id,
  'pregunta1' : number,
  'pregunta2' : number,
  'pregunta3' : number,
  'pregunta4' : number,
  'pregunta5' : number,
  'pregunta6' : number,
  'pregunta7' : string,
}
export type Id = number;
export interface _SERVICE {
  'crearComentario' : ActorMethod<
    [number, number, number, number, number, number, string],
    boolean
  >,
  'deleteComment' : ActorMethod<[string], boolean>,
  'getComment' : ActorMethod<[string], [] | [CommentInfo]>,
  'getComments' : ActorMethod<[], Array<[string, CommentInfo]>>,
  'getID' : ActorMethod<[], number>,
  'updateComment' : ActorMethod<
    [string, number, number, number, number, number, number, string],
    boolean
  >,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
