import BN from "bn.js";
import { Address } from "web3x/address";
import { EventLog, TransactionReceipt } from "web3x/formatters";
import { Contract, ContractOptions, TxCall, TxSend, EventSubscriptionFactory } from "web3x/contract";
import { Eth } from "web3x/eth";
import abi from "./MANATokenAbi";
export type MintEvent = {
    to: Address;
    amount: string;
};
export type MintFinishedEvent = {};
export type PauseEvent = {};
export type UnpauseEvent = {};
export type BurnEvent = {
    burner: Address;
    value: string;
};
export type ApprovalEvent = {
    owner: Address;
    spender: Address;
    value: string;
};
export type TransferEvent = {
    from: Address;
    to: Address;
    value: string;
};
export interface MintEventLog extends EventLog<MintEvent, "Mint"> {
}
export interface MintFinishedEventLog extends EventLog<MintFinishedEvent, "MintFinished"> {
}
export interface PauseEventLog extends EventLog<PauseEvent, "Pause"> {
}
export interface UnpauseEventLog extends EventLog<UnpauseEvent, "Unpause"> {
}
export interface BurnEventLog extends EventLog<BurnEvent, "Burn"> {
}
export interface ApprovalEventLog extends EventLog<ApprovalEvent, "Approval"> {
}
export interface TransferEventLog extends EventLog<TransferEvent, "Transfer"> {
}
interface MANATokenEvents {
    Mint: EventSubscriptionFactory<MintEventLog>;
    MintFinished: EventSubscriptionFactory<MintFinishedEventLog>;
    Pause: EventSubscriptionFactory<PauseEventLog>;
    Unpause: EventSubscriptionFactory<UnpauseEventLog>;
    Burn: EventSubscriptionFactory<BurnEventLog>;
    Approval: EventSubscriptionFactory<ApprovalEventLog>;
    Transfer: EventSubscriptionFactory<TransferEventLog>;
}
interface MANATokenEventLogs {
    Mint: MintEventLog;
    MintFinished: MintFinishedEventLog;
    Pause: PauseEventLog;
    Unpause: UnpauseEventLog;
    Burn: BurnEventLog;
    Approval: ApprovalEventLog;
    Transfer: TransferEventLog;
}
interface MANATokenTxEventLogs {
    Mint: MintEventLog[];
    MintFinished: MintFinishedEventLog[];
    Pause: PauseEventLog[];
    Unpause: UnpauseEventLog[];
    Burn: BurnEventLog[];
    Approval: ApprovalEventLog[];
    Transfer: TransferEventLog[];
}
export interface MANATokenTransactionReceipt extends TransactionReceipt<MANATokenTxEventLogs> {
}
interface MANATokenMethods {
    mintingFinished(): TxCall<boolean>;
    name(): TxCall<string>;
    approve(_spender: Address, _value: number | string | BN): TxSend<MANATokenTransactionReceipt>;
    totalSupply(): TxCall<string>;
    transferFrom(_from: Address, _to: Address, _value: number | string | BN): TxSend<MANATokenTransactionReceipt>;
    decimals(): TxCall<string>;
    unpause(): TxSend<MANATokenTransactionReceipt>;
    mint(_to: Address, _amount: number | string | BN): TxSend<MANATokenTransactionReceipt>;
    burn(_value: number | string | BN): TxSend<MANATokenTransactionReceipt>;
    paused(): TxCall<boolean>;
    finishMinting(): TxSend<MANATokenTransactionReceipt>;
    pause(): TxSend<MANATokenTransactionReceipt>;
    owner(): TxCall<Address>;
    symbol(): TxCall<string>;
    allowance(_owner: Address, _spender: Address): TxCall<string>;
    transferOwnership(newOwner: Address): TxSend<MANATokenTransactionReceipt>;
    balanceOf(_owner: Address): TxCall<string>;
    transfer(_to: Address, _value: number | string | BN): TxSend<MANATokenTransactionReceipt>;
}
export interface MANATokenDefinition {
    methods: MANATokenMethods;
    events: MANATokenEvents;
    eventLogs: MANATokenEventLogs;
}
export class MANAToken extends Contract<MANATokenDefinition> {
    constructor(eth: Eth, address?: Address, options?: ContractOptions) {
        super(eth, abi, address, options);
    }
}
export var MANATokenAbi = abi;
