export class Signer {
  static readonly STATUS_SIGNED: string = 'signed'
  static readonly  STATUS_PENDING: string = 'pending'

  name?: string
  ETHAddress?: string
  email?: string
  status?: string
  timestamp?: number
  tx?: any
  blockNumber?: number
}
