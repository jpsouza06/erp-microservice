import { NestFactory } from "@nestjs/core"
import { ProductModule } from "./product.module"
import { Env } from "./env"
import { ConfigService } from "@nestjs/config"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"

async function bootstrap() {
  const app = await NestFactory.create(ProductModule)

  const configService = app.get<ConfigService<Env, true>>(ConfigService)
  const port = configService.get("PORT", { infer: true })

  const config = new DocumentBuilder()
    .setTitle("Products")
    .addBearerAuth()
    .setVersion("1.0")
    .build()
  const documentFactory = () => SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("swagger", app, documentFactory)

  await app.listen(port)
}
bootstrap()
