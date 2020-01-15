import BN from 'bn.js'
import { Address } from 'web3x/address'
import { EventLog, TransactionReceipt } from 'web3x/formatters'
import { Contract, ContractOptions, TxCall, TxSend, EventSubscriptionFactory } from 'web3x/contract'
import { Eth } from 'web3x/eth'
import abi from './LANDContractAbi'
export type EstateRegistrySetEvent = {
  registry: Address
}
export type UpdateEvent = {
  assetId: string
  holder: Address
  operator: Address
  data: string
}
export type UpdateOperatorEvent = {
  assetId: string
  operator: Address
}
export type UpdateManagerEvent = {
  _owner: Address
  _operator: Address
  _caller: Address
  _approved: boolean
}
export type DeployAuthorizedEvent = {
  _caller: Address
  _deployer: Address
}
export type DeployForbiddenEvent = {
  _caller: Address
  _deployer: Address
}
export type TransferEvent = {
  from: Address
  to: Address
  assetId: string
  operator: Address
  userData: string
  operatorData: string
}
export type ApprovalForAllEvent = {
  holder: Address
  operator: Address
  authorized: boolean
}
export type ApprovalEvent = {
  owner: Address
  operator: Address
  assetId: string
}
export type OwnerUpdateEvent = {
  _prevOwner: Address
  _newOwner: Address
}
export interface EstateRegistrySetEventLog
  extends EventLog<EstateRegistrySetEvent, 'EstateRegistrySet'> {}
export interface UpdateEventLog extends EventLog<UpdateEvent, 'Update'> {}
export interface UpdateOperatorEventLog extends EventLog<UpdateOperatorEvent, 'UpdateOperator'> {}
export interface UpdateManagerEventLog extends EventLog<UpdateManagerEvent, 'UpdateManager'> {}
export interface DeployAuthorizedEventLog
  extends EventLog<DeployAuthorizedEvent, 'DeployAuthorized'> {}
export interface DeployForbiddenEventLog
  extends EventLog<DeployForbiddenEvent, 'DeployForbidden'> {}
export interface TransferEventLog extends EventLog<TransferEvent, 'Transfer'> {}
export interface TransferEventLog extends EventLog<TransferEvent, 'Transfer'> {}
export interface TransferEventLog extends EventLog<TransferEvent, 'Transfer'> {}
export interface ApprovalForAllEventLog extends EventLog<ApprovalForAllEvent, 'ApprovalForAll'> {}
export interface ApprovalEventLog extends EventLog<ApprovalEvent, 'Approval'> {}
export interface OwnerUpdateEventLog extends EventLog<OwnerUpdateEvent, 'OwnerUpdate'> {}
interface LANDContractEvents {
  EstateRegistrySet: EventSubscriptionFactory<EstateRegistrySetEventLog>
  Update: EventSubscriptionFactory<UpdateEventLog>
  UpdateOperator: EventSubscriptionFactory<UpdateOperatorEventLog>
  UpdateManager: EventSubscriptionFactory<UpdateManagerEventLog>
  DeployAuthorized: EventSubscriptionFactory<DeployAuthorizedEventLog>
  DeployForbidden: EventSubscriptionFactory<DeployForbiddenEventLog>
  Transfer: EventSubscriptionFactory<TransferEventLog>
  ApprovalForAll: EventSubscriptionFactory<ApprovalForAllEventLog>
  Approval: EventSubscriptionFactory<ApprovalEventLog>
  OwnerUpdate: EventSubscriptionFactory<OwnerUpdateEventLog>
}
interface LANDContractEventLogs {
  EstateRegistrySet: EstateRegistrySetEventLog
  Update: UpdateEventLog
  UpdateOperator: UpdateOperatorEventLog
  UpdateManager: UpdateManagerEventLog
  DeployAuthorized: DeployAuthorizedEventLog
  DeployForbidden: DeployForbiddenEventLog
  Transfer: TransferEventLog
  ApprovalForAll: ApprovalForAllEventLog
  Approval: ApprovalEventLog
  OwnerUpdate: OwnerUpdateEventLog
}
interface LANDContractTxEventLogs {
  EstateRegistrySet: EstateRegistrySetEventLog[]
  Update: UpdateEventLog[]
  UpdateOperator: UpdateOperatorEventLog[]
  UpdateManager: UpdateManagerEventLog[]
  DeployAuthorized: DeployAuthorizedEventLog[]
  DeployForbidden: DeployForbiddenEventLog[]
  Transfer: TransferEventLog[]
  ApprovalForAll: ApprovalForAllEventLog[]
  Approval: ApprovalEventLog[]
  OwnerUpdate: OwnerUpdateEventLog[]
}
export interface LANDContractTransactionReceipt
  extends TransactionReceipt<LANDContractTxEventLogs> {}
interface LANDContractMethods {
  supportsInterface(_interfaceID: string): TxCall<boolean>
  proxyOwner(): TxCall<Address>
  name(): TxCall<string>
  updateManager(a0: Address, a1: Address): TxCall<boolean>
  getApproved(assetId: number | string | BN): TxCall<Address>
  approve(operator: Address, assetId: number | string | BN): TxSend<LANDContractTransactionReceipt>
  totalSupply(): TxCall<string>
  latestPing(a0: Address): TxCall<string>
  isAuthorized(operator: Address, assetId: number | string | BN): TxCall<boolean>
  authorizedDeploy(a0: Address): TxCall<boolean>
  tokenOfOwnerByIndex(owner: Address, index: number | string | BN): TxCall<string>
  decimals(): TxCall<string>
  safeTransferFrom(
    from: Address,
    to: Address,
    assetId: number | string | BN
  ): TxSend<LANDContractTransactionReceipt>
  tokensOf(owner: Address): TxCall<string[]>
  ownerOf(assetId: number | string | BN): TxCall<Address>
  GET_METADATA(): TxCall<string>
  balanceOf(owner: Address): TxCall<string>
  currentContract(): TxCall<Address>
  description(): TxCall<string>
  owner(): TxCall<Address>
  symbol(): TxCall<string>
  updateOperator(a0: number | string | BN): TxCall<Address>
  setApprovalForAll(operator: Address, authorized: boolean): TxSend<LANDContractTransactionReceipt>
  safeTransferFrom(
    from: Address,
    to: Address,
    assetId: number | string | BN,
    userData: string
  ): TxSend<LANDContractTransactionReceipt>
  estateRegistry(): TxCall<Address>
  isApprovedForAll(assetHolder: Address, operator: Address): TxCall<boolean>
  getApprovedAddress(assetId: number | string | BN): TxCall<Address>
  transferOwnership(_newOwner: Address): TxSend<LANDContractTransactionReceipt>
  initialize(a0: string): TxSend<LANDContractTransactionReceipt>
  isUpdateAuthorized(operator: Address, assetId: number | string | BN): TxCall<boolean>
  authorizeDeploy(beneficiary: Address): TxSend<LANDContractTransactionReceipt>
  forbidDeploy(beneficiary: Address): TxSend<LANDContractTransactionReceipt>
  assignNewParcel(
    x: number | string | BN,
    y: number | string | BN,
    beneficiary: Address
  ): TxSend<LANDContractTransactionReceipt>
  assignMultipleParcels(
    x: (number | string | BN)[],
    y: (number | string | BN)[],
    beneficiary: Address
  ): TxSend<LANDContractTransactionReceipt>
  ping(): TxSend<LANDContractTransactionReceipt>
  setLatestToNow(user: Address): TxSend<LANDContractTransactionReceipt>
  encodeTokenId(x: number | string | BN, y: number | string | BN): TxCall<string>
  decodeTokenId(
    value: number | string | BN
  ): TxCall<{
    0: string
    1: string
  }>
  exists(x: number | string | BN, y: number | string | BN): TxCall<boolean>
  exists(assetId: number | string | BN): TxCall<boolean>
  ownerOfLand(x: number | string | BN, y: number | string | BN): TxCall<Address>
  ownerOfLandMany(x: (number | string | BN)[], y: (number | string | BN)[]): TxCall<Address[]>
  landOf(
    owner: Address
  ): TxCall<{
    0: string[]
    1: string[]
  }>
  tokenMetadata(assetId: number | string | BN): TxCall<string>
  landData(x: number | string | BN, y: number | string | BN): TxCall<string>
  transferFrom(
    from: Address,
    to: Address,
    assetId: number | string | BN
  ): TxSend<LANDContractTransactionReceipt>
  transferLand(
    x: number | string | BN,
    y: number | string | BN,
    to: Address
  ): TxSend<LANDContractTransactionReceipt>
  transferManyLand(
    x: (number | string | BN)[],
    y: (number | string | BN)[],
    to: Address
  ): TxSend<LANDContractTransactionReceipt>
  transferLandToEstate(
    x: number | string | BN,
    y: number | string | BN,
    estateId: number | string | BN
  ): TxSend<LANDContractTransactionReceipt>
  transferManyLandToEstate(
    x: (number | string | BN)[],
    y: (number | string | BN)[],
    estateId: number | string | BN
  ): TxSend<LANDContractTransactionReceipt>
  setUpdateOperator(
    assetId: number | string | BN,
    operator: Address
  ): TxSend<LANDContractTransactionReceipt>
  setUpdateManager(
    _owner: Address,
    _operator: Address,
    _approved: boolean
  ): TxSend<LANDContractTransactionReceipt>
  setEstateRegistry(registry: Address): TxSend<LANDContractTransactionReceipt>
  createEstate(
    x: (number | string | BN)[],
    y: (number | string | BN)[],
    beneficiary: Address
  ): TxSend<LANDContractTransactionReceipt>
  createEstateWithMetadata(
    x: (number | string | BN)[],
    y: (number | string | BN)[],
    beneficiary: Address,
    metadata: string
  ): TxSend<LANDContractTransactionReceipt>
  updateLandData(
    x: number | string | BN,
    y: number | string | BN,
    data: string
  ): TxSend<LANDContractTransactionReceipt>
  updateManyLandData(
    x: (number | string | BN)[],
    y: (number | string | BN)[],
    data: string
  ): TxSend<LANDContractTransactionReceipt>
}
export interface LANDContractDefinition {
  methods: LANDContractMethods
  events: LANDContractEvents
  eventLogs: LANDContractEventLogs
}
export class LANDContract extends Contract<LANDContractDefinition> {
  constructor(eth: Eth, address?: Address, options?: ContractOptions) {
    super(eth, abi, address, options)
  }
}
export var LANDContractAbi = abi
