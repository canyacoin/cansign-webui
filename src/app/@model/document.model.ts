import { Signer } from '@model/signer.model';

export class Document {
  static readonly STATUS_SIGNED: string = 'signed'
  static readonly  STATUS_PENDING: string = 'pending'
  static readonly  STATUS_PUBLISHED: string = 'published'

  name?: string

  hash?: string

  creator?: {
    email?: string,
    ETHAddress?: string
  }

  status?: string = Document.STATUS_PENDING

  lastModified?: number

  uploadedAt?: number

  signers?: Array<Signer> = []
}
