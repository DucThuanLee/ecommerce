import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @ApiProperty()
  @Prop({ required: true })
  name: string;

  @ApiProperty()
  @Prop({ required: true })
  slug: string;

  @ApiProperty()
  @Prop({ required: true })
  price: number;

  @ApiProperty({ type: String })
  @Prop({ type: String, required: false })
  description?: string;

  @ApiProperty()
  @Prop({ type: String, ref: 'Category' })
  category: string;

  @ApiProperty({ isArray: true })
  @Prop([String])
  tags?: string[];

  @ApiProperty({ isArray: true })
  @Prop([String])
  images?: string[];

  @ApiProperty()
  @Prop({ default: true })
  isActive: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
