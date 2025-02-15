import { Injectable } from '@nestjs/common'
import { envSchema, Env } from '../env'

@Injectable()
export class CustomConfigService {
  private readonly env: Env

  constructor() {
    const parsed = envSchema.safeParse(process.env)
    if (!parsed.success) {
      console.error('Erro na validação das variáveis de ambiente:', parsed.error.flatten())
      throw new Error('Configuração inválida das variáveis de ambiente')
    }
    this.env = parsed.data
  }

  get<K extends keyof Env>(key: K): Env[K] {
    return this.env[key]
  }
}
