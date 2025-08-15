import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Product } from './product.schema';
import { CreateProductDto } from '@shared/dto/catalog/create-product.dto';
import { UpdateProductDto } from '@shared/dto/catalog/update-product.dto';
import { toSlug } from '@shared/utils/slug.util';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>
  ) {}

  async create(dto: CreateProductDto): Promise<Product> {
    if (typeof dto.name === 'string' && !dto.slug) {
      dto.slug = toSlug(dto.name);
    }
  
    const created = new this.productModel(dto);
    return created.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async update(id: string, dto: UpdateProductDto): Promise<Product> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid product ID');
    }
  
    if (typeof dto.name === 'string' && !dto.slug) {
      dto.slug = toSlug(dto.name);
    }
  
    const updated = await this.productModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
  
    if (!updated) throw new NotFoundException('Product not found');
    return updated;
  }

  async delete(id: string): Promise<{ deleted: boolean }> {
    const result = await this.productModel.deleteOne({ _id: id }).exec();
    return { deleted: result.deletedCount > 0 };
  }
}
