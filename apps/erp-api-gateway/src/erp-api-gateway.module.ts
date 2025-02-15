import { Module } from '@nestjs/common'
import { ErpApiGatewayController } from './erp-api-gateway.controller'
import { ErpApiGatewayService } from './erp-api-gateway.service'
import { UsersModule } from './users/users.module'

@Module({
  imports: [UsersModule],
  controllers: [ErpApiGatewayController],
  providers: [ErpApiGatewayService],
})
export class ErpApiGatewayModule {}
