import { Injectable } from '@nestjs/common'

@Injectable()
export class ErpApiGatewayService {
  getHello(): string {
    return 'Hello World!'
  }
}
