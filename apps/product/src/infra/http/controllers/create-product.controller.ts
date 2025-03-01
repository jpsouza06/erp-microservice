import { Body, Controller, HttpCode, Post, BadRequestException } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiBody, ApiCreatedResponse, ApiResponse } from '@nestjs/swagger'
import { z } from 'zod'
import { schemaCreateResponseBadRequest } from '../docs/swagger-product'
import { CreateProductUseCase } from 'src/application/use-cases/create-product'
import { Product } from 'src/enterprise/entities/product'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'


const createProductBodySchema = z.object({
  ean: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.string(),
  stock: z.number(),
})

type CreateProductBodySchema = z.infer<typeof createProductBodySchema>

@Controller('/products')
@ApiTags('Products')
export class CreateProductController {
  constructor(private readonly createProductUseCase: CreateProductUseCase) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Create Product' })
  @ApiBody({ type: Product })
  @ApiCreatedResponse({ description: 'Product created', type: Product })
  @ApiResponse(schemaCreateResponseBadRequest)
  async handle(@Body(new ZodValidationPipe(createProductBodySchema)) body: CreateProductBodySchema) {
    const { ean, name, description, price, stock } = body
    const result = await this.createProductUseCase.execute({ ean, name, description, price, stock })
    if (result.isLeft()) {
      throw new BadRequestException(result.value.message)
    }
    return result.value
  }
}
