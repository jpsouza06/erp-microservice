import { NestFactory } from "@nestjs/core"
import { ProductModule } from "./product.module"
import { MicroserviceOptions, Transport } from "@nestjs/microservices"
import { CustomConfigService } from "./services/config-service"

async function bootstrap() {
  const configService = new CustomConfigService()

  const port = configService.get('PORT')

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ProductModule,
    {
      transport: Transport.TCP,
      options: {
        port,
      }
    },
  )

  await app.listen()
}
bootstrap()
