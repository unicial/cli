import { EventEmitter } from 'events'

import { IEthereumDataProvider } from './IEthereumDataProvider'
import { ErrorType, fail } from '../utils/errors'
import { Coords, getObject } from '../utils/coordinateHelpers'
import { filterAndFillEmpty } from '../utils/land'
import { isDebug } from '../utils/env'
import { getConfig } from '../config'

import { HttpProvider } from 'web3x/providers'
import { Eth } from 'web3x/eth'
import { Address } from 'web3x/address'
import { LANDContract } from 'src/contracts/LANDContract'
import { MANAToken } from 'src/contracts/MANAToken'
import { EstateRegistry } from 'src/contracts/EstateRegistry'

const { provider } = getConfig()
const httpProvider = new HttpProvider(provider)
const eth = new Eth(httpProvider)

const addresses = {
  mainnet: {
    LANDRegistry: new LANDContract(eth, Address.fromString('0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d')),
    EstateRegistry: new EstateRegistry(eth, Address.fromString('0x959e104e1a4db6317fa58f8295f586e1a978c297')),
    MANAToken: new MANAToken(eth, Address.fromString('0x0f5d2fb29fb7d3cfee444a200298f468908cc942'))
  },
  ropsten: {
    LANDRegistry: new LANDContract(eth, Address.fromString('0x7a73483784ab79257bb11b96fd62a2c3ae4fb75b')),
    EstateRegistry: new EstateRegistry(eth, Address.fromString('0x124bf28a423b2ca80b3846c3aa0eb944fe7ebb95')),
    MANAToken: new MANAToken(eth, Address.fromString('0x2a8fd99c19271f4f04b1b7b9c4f7cf264b626edb'))
  }
}

const contracts = addresses[isDebug ? 'ropsten' : 'mainnet']

export type LANDData = {
  version?: number
  name: string
  description: string
}

export type Network = {
  id: number
  name: string
  label?: string
}

export enum NETWORKS {
  mainnet = 'mainnet',
  ropsten = 'ropsten'
}

/**
 * Events emitted by this class:
 *
 */
export class Ethereum extends EventEmitter implements IEthereumDataProvider {

  async getLandOf(address: string): Promise<Coords[]> {
    const contract = contracts.LANDRegistry
    try {
      const coordinates = await contract.methods.landOf(Address.fromString(address.toUpperCase())).call()
      const [x, y] = [coordinates[0], coordinates[1]]
      return x.map(($, i) => ({ x: parseInt($, 16), y: parseInt(y[i], 16) }))
    } catch (e) {
      fail(ErrorType.ETHEREUM_ERROR, `Unable to fetch LANDs: ${e.message}`)
    }
  }

  async getEstatesOf(address: string): Promise<number[]> {
    const contract = contracts.EstateRegistry
    try {
      const balance = await contract['balanceOf'](address)
      const requests = []
      for (let i = 0; i < balance; i++) {
        const request = contract['tokenOfOwnerByIndex'](address, i)
        requests.push(request)
      }
      return Promise.all(requests)
    } catch (e) {
      fail(ErrorType.ETHEREUM_ERROR, `Unable to fetch Estate IDs of owner: ${e.message}`)
    }
  }

  async getLandData({ x, y }: Coords): Promise<LANDData> {
    const contract = contracts.LANDRegistry
    try {
      const landData = await contract['landData'](x, y)
      return filterAndFillEmpty(this.decodeLandData(landData))
    } catch (e) {
      fail(ErrorType.ETHEREUM_ERROR, `Unable to fetch LAND data: ${e.message}`)
    }
  }

  async getEstateData(estateId: number): Promise<LANDData> {
    const contract = contracts.EstateRegistry
    try {
      const landData = await contract['getMetadata'](estateId)
      return filterAndFillEmpty(this.decodeLandData(landData))
    } catch (e) {
      fail(ErrorType.ETHEREUM_ERROR, `Unable to fetch LAND data: ${e.message}`)
    }
  }

  async getLandOwner({ x, y }: Coords): Promise<string> {
    const contract = contracts.LANDRegistry
    try {
      return await contract['ownerOfLand'](x, y)
    } catch (e) {
      fail(ErrorType.ETHEREUM_ERROR, `Unable to fetch LAND owner: ${e.message}`)
    }
  }

  async getLandOperator({ x, y }: Coords): Promise<string> {
    const contract = contracts.EstateRegistry
    try {
      const assetId = await contract['encodeTokenId'](x, y)
      return await contract['getApproved'](assetId)
    } catch (e) {
      fail(ErrorType.ETHEREUM_ERROR, `Unable to fetch LAND operator: ${e.message}`)
    }
  }

  async getLandUpdateOperator({ x, y }: Coords): Promise<string> {
    const contract = contracts.LANDRegistry
    try {
      const assetId = await contract['encodeTokenId'](x, y)
      return await contract['updateOperator'](assetId)
    } catch (e) {
      fail(ErrorType.ETHEREUM_ERROR, `Unable to fetch LAND update operator: ${e.message}`)
    }
  }

  async getEstateOwner(estateId: number): Promise<string> {
    const contract = contracts.EstateRegistry
    try {
      return await contract['ownerOf'](estateId)
    } catch (e) {
      fail(ErrorType.ETHEREUM_ERROR, `Unable to fetch LAND owner: ${e.message}`)
    }
  }

  async getEstateOperator(estateId: number): Promise<string> {
    const contract = contracts.EstateRegistry
    try {
      return await contract['getApproved'](estateId)
    } catch (e) {
      fail(ErrorType.ETHEREUM_ERROR, `Unable to fetch Estate operator: ${e.message}`)
    }
  }

  async getEstateUpdateOperator(estateId: number): Promise<string> {
    const contract = contracts.EstateRegistry
    try {
      return await contract['updateOperator'](estateId)
    } catch (e) {
      fail(ErrorType.ETHEREUM_ERROR, `Unable to fetch Estate update operator: ${e.message}`)
    }
  }

  async validateAuthorization(owner: string, parcels: Coords[]) {
    const validations = parcels.map(parcel => this.validateAuthorizationOfParcel(owner, parcel))
    return Promise.all(validations)
  }

  /**
   * It fails if the owner address isn't able to update given parcel (as an owner or operator)
   */
  async validateAuthorizationOfParcel(owner: string, parcel: Coords): Promise<void> {
    const isLandOperator = await this.isLandOperator(parcel, owner)
    if (!isLandOperator) {
      fail(
        ErrorType.ETHEREUM_ERROR,
        `Provided address ${owner} is not authorized to update LAND ${parcel.x},${parcel.y}`
      )
    }
  }

  async getLandOfEstate(estateId: number): Promise<Coords[]> {
    const contract = contracts.EstateRegistry
    const landContract = contracts.LANDRegistry

    try {
      const estateSize = await contract['getEstateSize'](estateId)
      let promiseParcels = []

      for (let i = 0; i < estateSize; i++) {
        const request = contract['estateLandIds'](estateId, i).then(p => {
          return landContract['decodeTokenId']([p])
        })
        promiseParcels.push(request)
      }

      const parcels = (await Promise.all(promiseParcels)).map(data => getObject(data))

      return parcels
    } catch (e) {
      fail(ErrorType.ETHEREUM_ERROR, `Unable to fetch LANDs of Estate: ${e.message}`)
    }
  }

  async getEstateIdOfLand({ x, y }: Coords): Promise<number> {
    const contract = contracts.EstateRegistry
    const landContract = contracts.LANDRegistry

    try {
      const assetId = await landContract['encodeTokenId'](x, y)
      return await contract['getLandEstateId'](assetId)
    } catch (e) {
      fail(ErrorType.ETHEREUM_ERROR, `Unable to fetch Estate ID of LAND: ${e.message}`)
    }
  }

  private async isLandOperator(coords: Coords, owner: string): Promise<boolean> {
    const contract = contracts.LANDRegistry

    const estate = await this.getEstateIdOfLand(coords)

    if (estate && estate > 0) {
      return this.isEstateOperator(estate, owner)
    }

    try {
      const { x, y } = coords
      const assetId = await contract['encodeTokenId'](x, y)
      return await contract['isUpdateAuthorized'](owner.toLowerCase(), assetId.toString())
    } catch (e) {
      fail(ErrorType.ETHEREUM_ERROR, `Unable to fetch LAND authorization: ${JSON.stringify(e)}`)
    }
  }

  private async isEstateOperator(estateId: number, owner: string): Promise<boolean> {
    const contract = contracts.EstateRegistry
    try {
      return await contract['isUpdateAuthorized'](owner, estateId)
    } catch (e) {
      fail(ErrorType.ETHEREUM_ERROR, `Unable to fetch Estate authorization: ${e.message}`)
    }
  }

  private decodeLandData(data: string = ''): LANDData {
    // this logic can also be found in decentraland-eth, but we can't rely on node-hid

    if (data === '') {
      return null
    }

    const [, name, description] = data.split(',').map(field => {
      return field.slice(1, -1)
    })

    return { version: 0, name: name || null, description: description || null }
  }
}
