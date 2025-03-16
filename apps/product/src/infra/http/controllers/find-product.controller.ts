import { FindProductUseCase } from '@/application/use-cases/find-product'
import { Controller, Get, Query } from '@nestjs/common'

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Product } from 'src/enterprise/entities/product'


@Controller('/products')
@ApiTags('Products')
export class FindProductController {
  constructor(private readonly findProductUseCase: FindProductUseCase) {}

  @Get()
  @ApiOperation({ summary: 'Find Products' })
  @ApiResponse({ status: 200, description: 'Find products', type: [Product] })
  async handle(@Query() query: any) {
    const products = await this.findProductUseCase.execute(query)
    return products
  }
}
