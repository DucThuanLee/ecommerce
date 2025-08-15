import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type CategoryDocument = Category & Document;

@Schema({ timestamps: true })
export class Category {
  @ApiProperty()
  @Prop({ required: true, unique: true })
  name: string;

  @ApiProperty({ required: false })
  @Prop({ required: false })
  description?: string;

  @ApiProperty({ required: false })
  @Prop({ required: false })
  slug?: string;

  @ApiProperty({ required: false })
  @Prop({ type: String, ref: 'Category', default: null })
  parent?: string;

  @ApiProperty()
  @Prop({ default: true })
  isActive: boolean;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
