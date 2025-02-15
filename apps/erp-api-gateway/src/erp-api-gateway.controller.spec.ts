import { Test, TestingModule } from '@nestjs/testing'
import { ErpApiGatewayController } from './erp-api-gateway.controller'
import { ErpApiGatewayService } from './erp-api-gateway.service'

describe('ErpApiGatewayController', () => {
  let erpApiGatewayController: ErpApiGatewayController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ErpApiGatewayController],
      providers: [ErpApiGatewayService],
    }).compile()

    erpApiGatewayController = app.get<ErpApiGatewayController>(
      ErpApiGatewayController,
    )
  })

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(erpApiGatewayController.getHello()).toBe('Hello World!')
    })
  })
})
