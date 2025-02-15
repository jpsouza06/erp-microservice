// domain/product/enterprise/entities/product.ts

import { ApiProperty } from '@nestjs/swagger';
import { Entity } from 'apps/core/entities/entity';
import { UniqueEntityId } from 'apps/core/entities/unique-entity-id';
import Decimal from 'decimal.js';

export interface ProductProps {
  ean: string;
  name: string;
  description: string;
  price: Decimal;
  stock: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Product extends Entity<ProductProps> {
  @ApiProperty({ example: '1234567890123', description: 'Código EAN do produto' })
  get ean(): string {
    return this.props.ean;
  }

  set ean(value: string) {
    this.props.ean = value;
    this.touch();
  }

  @ApiProperty({ example: 'Produto A', description: 'Nome do produto' })
  get name(): string {
    return this.props.name;
  }

  set name(value: string) {
    this.props.name = value;
    this.touch();
  }

  @ApiProperty({ example: 'Descrição do produto A', description: 'Descrição do produto' })
  get description(): string {
    return this.props.description;
  }

  set description(value: string) {
    this.props.description = value;
    this.touch();
  }

  @ApiProperty({ example: '100.50', description: 'Preço do produto', type: String })
  get price(): Decimal {
    return this.props.price;
  }

  set price(value: Decimal) {
    this.props.price = value;
    this.touch();
  }

  @ApiProperty({ example: 10, description: 'Estoque do produto' })
  get stock(): number {
    return this.props.stock;
  }

  set stock(value: number) {
    this.props.stock = value;
    this.touch();
  }

  private touch(): void {
    this.props.updatedAt = new Date();
  }

  static create(props: ProductProps, id?: UniqueEntityId): Product {
    return new Product(props, id);
  }
}
