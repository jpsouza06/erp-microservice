import { HashComparer } from '@/application/cryptography/hash-comparer'
import { HashGenerator } from '@/application/cryptography/hash-generator'
import { compare, hash } from 'bcryptjs'

export class BcryptHasher implements HashGenerator, HashComparer {
	hash(plain: string): Promise<string> {
		return hash(plain, 8)
	}
	compare(plain: string, hash: string): Promise<boolean> {
		return compare(plain, hash)
	}
  
}