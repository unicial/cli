import BN from 'bn.js'
import { Address } from 'web3x/address'
import { EventLog, TransactionReceipt } from 'web3x/formatters'
import { Contract, ContractOptions, TxCall, TxSend, EventSubscriptionFactory } from 'web3x/contract'
import { Eth } from 'web3x/eth'
import abi from './EstateRegistryAbi'
export type OwnershipTransferredEvent = {
  previousOwner: Address
  newOwner: Address
}
export type TransferEvent = {
  _from: Address
  _to: Address
  _tokenId: string
}
export type ApprovalEvent = {
  _owner: Address
  _approved: Address
  _tokenId: string
}
export type ApprovalForAllEvent = {
  _owner: Address
  _operator: Address
  _approved: boolean
}
export type CreateEstateEvent = {
  _owner: Address
  _estateId: string
  _data: string
}
export type AddLandEvent = {
  _estateId: string
  _landId: string
}
export type RemoveLandEvent = {
  _estateId: string
  _landId: string
  _destinatary: Address
}
export type UpdateEvent = {
  _assetId: string
  _holder: Address
  _operator: Address
  _data: string
}
export type UpdateOperatorEvent = {
  _estateId: string
  _operator: Address
}
export type UpdateManagerEvent = {
  _owner: Address
  _operator: Address
  _caller: Address
  _approved: boolean
}
export type SetLANDRegistryEvent = {
  _registry: Address
}
export type MigratedEvent = {
  contractName: string
  migrationId: string
}
export interface OwnershipTransferredEventLog
  extends EventLog<OwnershipTransferredEvent, 'OwnershipTransferred'> {}
export interface TransferEventLog extends EventLog<TransferEvent, 'Transfer'> {}
export interface ApprovalEventLog extends EventLog<ApprovalEvent, 'Approval'> {}
export interface ApprovalForAllEventLog extends EventLog<ApprovalForAllEvent, 'ApprovalForAll'> {}
export interface CreateEstateEventLog extends EventLog<CreateEstateEvent, 'CreateEstate'> {}
export interface AddLandEventLog extends EventLog<AddLandEvent, 'AddLand'> {}
export interface RemoveLandEventLog extends EventLog<RemoveLandEvent, 'RemoveLand'> {}
export interface UpdateEventLog extends EventLog<UpdateEvent, 'Update'> {}
export interface UpdateOperatorEventLog extends EventLog<UpdateOperatorEvent, 'UpdateOperator'> {}
export interface UpdateManagerEventLog extends EventLog<UpdateManagerEvent, 'UpdateManager'> {}
export interface SetLANDRegistryEventLog
  extends EventLog<SetLANDRegistryEvent, 'SetLANDRegistry'> {}
export interface MigratedEventLog extends EventLog<MigratedEvent, 'Migrated'> {}
interface EstateRegistryEvents {
  OwnershipTransferred: EventSubscriptionFactory<OwnershipTransferredEventLog>
  Transfer: EventSubscriptionFactory<TransferEventLog>
  Approval: EventSubscriptionFactory<ApprovalEventLog>
  ApprovalForAll: EventSubscriptionFactory<ApprovalForAllEventLog>
  CreateEstate: EventSubscriptionFactory<CreateEstateEventLog>
  AddLand: EventSubscriptionFactory<AddLandEventLog>
  RemoveLand: EventSubscriptionFactory<RemoveLandEventLog>
  Update: EventSubscriptionFactory<UpdateEventLog>
  UpdateOperator: EventSubscriptionFactory<UpdateOperatorEventLog>
  UpdateManager: EventSubscriptionFactory<UpdateManagerEventLog>
  SetLANDRegistry: EventSubscriptionFactory<SetLANDRegistryEventLog>
  Migrated: EventSubscriptionFactory<MigratedEventLog>
}
interface EstateRegistryEventLogs {
  OwnershipTransferred: OwnershipTransferredEventLog
  Transfer: TransferEventLog
  Approval: ApprovalEventLog
  ApprovalForAll: ApprovalForAllEventLog
  CreateEstate: CreateEstateEventLog
  AddLand: AddLandEventLog
  RemoveLand: RemoveLandEventLog
  Update: UpdateEventLog
  UpdateOperator: UpdateOperatorEventLog
  UpdateManager: UpdateManagerEventLog
  SetLANDRegistry: SetLANDRegistryEventLog
  Migrated: MigratedEventLog
}
interface EstateRegistryTxEventLogs {
  OwnershipTransferred: OwnershipTransferredEventLog[]
  Transfer: TransferEventLog[]
  Approval: ApprovalEventLog[]
  ApprovalForAll: ApprovalForAllEventLog[]
  CreateEstate: CreateEstateEventLog[]
  AddLand: AddLandEventLog[]
  RemoveLand: RemoveLandEventLog[]
  Update: UpdateEventLog[]
  UpdateOperator: UpdateOperatorEventLog[]
  UpdateManager: UpdateManagerEventLog[]
  SetLANDRegistry: SetLANDRegistryEventLog[]
  Migrated: MigratedEventLog[]
}
export interface EstateRegistryTransactionReceipt
  extends TransactionReceipt<EstateRegistryTxEventLogs> {}
interface EstateRegistryMethods {
  supportsInterface(_interfaceId: string): TxCall<boolean>
  name(): TxCall<string>
  updateManager(a0: Address, a1: Address): TxCall<boolean>
  getApproved(_tokenId: number | string | BN): TxCall<Address>
  approve(_to: Address, _tokenId: number | string | BN): TxSend<EstateRegistryTransactionReceipt>
  landIdEstate(a0: number | string | BN): TxCall<string>
  totalSupply(): TxCall<string>
  tokenOfOwnerByIndex(_owner: Address, _index: number | string | BN): TxCall<string>
  estateLandIds(a0: number | string | BN, a1: number | string | BN): TxCall<string>
  safeTransferFrom(
    _from: Address,
    _to: Address,
    _tokenId: number | string | BN
  ): TxSend<EstateRegistryTransactionReceipt>
  exists(_tokenId: number | string | BN): TxCall<boolean>
  tokenByIndex(_index: number | string | BN): TxCall<string>
  ownerOf(_tokenId: number | string | BN): TxCall<Address>
  balanceOf(_owner: Address): TxCall<string>
  registry(): TxCall<Address>
  owner(): TxCall<Address>
  symbol(): TxCall<string>
  updateOperator(a0: number | string | BN): TxCall<Address>
  estateLandIndex(a0: number | string | BN, a1: number | string | BN): TxCall<string>
  setApprovalForAll(_to: Address, _approved: boolean): TxSend<EstateRegistryTransactionReceipt>
  safeTransferFrom(
    _from: Address,
    _to: Address,
    _tokenId: number | string | BN,
    _data: string
  ): TxSend<EstateRegistryTransactionReceipt>
  isMigrated(contractName: string, migrationId: string): TxCall<boolean>
  tokenURI(_tokenId: number | string | BN): TxCall<string>
  isApprovedForAll(_owner: Address, _operator: Address): TxCall<boolean>
  transferOwnership(newOwner: Address): TxSend<EstateRegistryTransactionReceipt>
  mint(to: Address, metadata: string): TxSend<EstateRegistryTransactionReceipt>
  transferLand(
    estateId: number | string | BN,
    landId: number | string | BN,
    destinatary: Address
  ): TxSend<EstateRegistryTransactionReceipt>
  transferManyLands(
    estateId: number | string | BN,
    landIds: (number | string | BN)[],
    destinatary: Address
  ): TxSend<EstateRegistryTransactionReceipt>
  getLandEstateId(landId: number | string | BN): TxCall<string>
  setLANDRegistry(_registry: Address): TxSend<EstateRegistryTransactionReceipt>
  ping(): TxSend<EstateRegistryTransactionReceipt>
  getEstateSize(estateId: number | string | BN): TxCall<string>
  updateMetadata(
    estateId: number | string | BN,
    metadata: string
  ): TxSend<EstateRegistryTransactionReceipt>
  getMetadata(estateId: number | string | BN): TxCall<string>
  isUpdateAuthorized(operator: Address, estateId: number | string | BN): TxCall<boolean>
  setUpdateManager(
    _owner: Address,
    _operator: Address,
    _approved: boolean
  ): TxSend<EstateRegistryTransactionReceipt>
  setUpdateOperator(
    estateId: number | string | BN,
    operator: Address
  ): TxSend<EstateRegistryTransactionReceipt>
  setLandUpdateOperator(
    estateId: number | string | BN,
    landId: number | string | BN,
    operator: Address
  ): TxSend<EstateRegistryTransactionReceipt>
  initialize(_name: string, _symbol: string): TxSend<EstateRegistryTransactionReceipt>
  initialize(): TxSend<EstateRegistryTransactionReceipt>
  initialize(
    _name: string,
    _symbol: string,
    _registry: Address
  ): TxSend<EstateRegistryTransactionReceipt>
  initialize(_sender: Address): TxSend<EstateRegistryTransactionReceipt>
  onERC721Received(
    _operator: Address,
    _from: Address,
    _tokenId: number | string | BN,
    _data: string
  ): TxSend<EstateRegistryTransactionReceipt>
  getFingerprint(estateId: number | string | BN): TxCall<string>
  verifyFingerprint(estateId: number | string | BN, fingerprint: string): TxCall<boolean>
  safeTransferManyFrom(
    from: Address,
    to: Address,
    estateIds: (number | string | BN)[]
  ): TxSend<EstateRegistryTransactionReceipt>
  safeTransferManyFrom(
    from: Address,
    to: Address,
    estateIds: (number | string | BN)[],
    data: string
  ): TxSend<EstateRegistryTransactionReceipt>
  updateLandData(
    estateId: number | string | BN,
    landId: number | string | BN,
    data: string
  ): TxSend<EstateRegistryTransactionReceipt>
  updateManyLandData(
    estateId: number | string | BN,
    landIds: (number | string | BN)[],
    data: string
  ): TxSend<EstateRegistryTransactionReceipt>
  transferFrom(
    _from: Address,
    _to: Address,
    _tokenId: number | string | BN
  ): TxSend<EstateRegistryTransactionReceipt>
}
export interface EstateRegistryDefinition {
  methods: EstateRegistryMethods
  events: EstateRegistryEvents
  eventLogs: EstateRegistryEventLogs
}
export class EstateRegistry extends Contract<EstateRegistryDefinition> {
  constructor(eth: Eth, address?: Address, options?: ContractOptions) {
    super(eth, abi, address, options)
  }
}
export var EstateRegistryAbi = abi
