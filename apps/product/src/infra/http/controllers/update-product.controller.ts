// infra/http/controllers/update-product.controller.ts
import { Body, Controller, NotFoundException, Param, Put } from '@nestjs/common';
import { z } from 'zod';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateProductUseCase } from 'src/application/use-cases/update-product';
import { Product } from 'src/enterprise/entities/product';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import { schemaUpdateResponseBadRequest, schemaUpdateResponseNotFound } from '../docs/swagger-product';

const updateProductBodySchema = z.object({
  ean: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  price: z.string().optional(),
  stock: z.number().optional(),
});

type UpdateProductBodySchema = z.infer<typeof updateProductBodySchema>;

@Controller('/products')
@ApiTags('Products')
export class UpdateProductController {
  constructor(private readonly updateProductUseCase: UpdateProductUseCase) {}

  @Put(':id')
  @ApiOperation({ summary: 'Update Product' })
  @ApiResponse({ status: 200, description: 'Product updated', type: Product })
  @ApiResponse(schemaUpdateResponseNotFound)
  @ApiResponse(schemaUpdateResponseBadRequest)
  async handle(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateProductBodySchema)) body: UpdateProductBodySchema,
  ) {
    const result = await this.updateProductUseCase.execute({ id, ...body });
    if (result.isLeft()) {
      throw new NotFoundException(result.value.message);
    }
    return result.value;
  }
}
