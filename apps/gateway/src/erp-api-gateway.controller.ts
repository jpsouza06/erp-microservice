import { Controller, Get } from '@nestjs/common'
import { ErpApiGatewayService } from './erp-api-gateway.service'

@Controller()
export class ErpApiGatewayController {
  constructor(private readonly erpApiGatewayService: ErpApiGatewayService) {}

  @Get()
  getHello(): string {
    return this.erpApiGatewayService.getHello()
  }
}
