// infra/http/controllers/get-product.controller.ts
import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetProductUseCase } from 'apps/product/src/application/use-cases/get-product';
import { Product } from 'apps/product/src/enterprise/entities/product';
import { schemaGetResponseNotFound } from '../docs/swagger-product';


@Controller('/products')
@ApiTags('Products')
export class GetProductController {
  constructor(private readonly getProductUseCase: GetProductUseCase) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get Product by ID' })
  @ApiResponse({ status: 200, description: 'Product found', type: Product })
  @ApiResponse(schemaGetResponseNotFound)
  async handle(@Param('id') id: string) {
    const result = await this.getProductUseCase.execute({ id });
    if (result.isLeft()) {
      throw new NotFoundException(result.value.message);
    }
    return result.value;
  }
}
