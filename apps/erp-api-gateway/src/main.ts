import { NestFactory } from '@nestjs/core'
import { ErpApiGatewayModule } from './erp-api-gateway.module'

async function bootstrap() {
  const app = await NestFactory.create(ErpApiGatewayModule)
  await app.listen(process.env.port ?? 3000)
}
bootstrap()
