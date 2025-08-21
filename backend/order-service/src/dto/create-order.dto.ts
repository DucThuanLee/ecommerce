import { ApiProperty } from '@nestjs/swagger';

export class OrderItemDto {
  @ApiProperty({ example: 'productId123', description: 'ID of the product' })
  productId: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;

  @ApiProperty({ example: 'productId123', description: 'ID of the product' })
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty()
  userId: string;

  @ApiProperty({ type: [OrderItemDto] })
  items: OrderItemDto[];

  @ApiProperty()
  total: number;
}
