import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface TaxPayer {
  'tid' : bigint,
  'address' : string,
  'lastName' : string,
  'firstName' : string,
}
export interface _SERVICE {
  'addTaxPayer' : ActorMethod<[bigint, string, string, string], undefined>,
  'getAllTaxPayers' : ActorMethod<[], Array<TaxPayer>>,
  'searchTaxPayerByTID' : ActorMethod<[bigint], [] | [TaxPayer]>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
