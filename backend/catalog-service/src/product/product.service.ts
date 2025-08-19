import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Product } from './product.schema';
import { CreateProductDto } from './create-product.dto';
import { toSlug } from '../utils/slug.util';
import { UpdateProductDto } from './update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>
  ) { }

  async create(dto: CreateProductDto): Promise<Product> {
    if (typeof dto.name === 'string' && !dto.slug) {
      dto.slug = toSlug(dto.name);
    }

    const created = new this.productModel(dto);
    console.log('Creating product with data:', dto);
    return created.save();
  }

  async findAllBasic(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findAll(
    page = 1,
    limit = 10,
    search?: string,
    sortBy = 'createdAt',
    sortOrder: 'asc' | 'desc' = 'desc',
  ): Promise<{ data: Product[]; total: number }> {
    const skip = (page - 1) * limit;

    const query: any = {};
    if (search) {
      query.name = { $regex: search, $options: 'i' }; // Case-insensitive name search
    }

    const data = await this.productModel
      .find(query)
      .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
      .skip(skip)
      .limit(limit)
      .exec();

    const total = await this.productModel.countDocuments(query);

    return { data, total };
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

  // ✅ Search products by category and tags
  async search(filters: { category?: string; tags?: string[] }) {
    const query: any = {};

    if (filters.category) {
      query.category = filters.category;
    }

    if (filters.tags && filters.tags.length > 0) {
      query.tags = { $in: filters.tags };
    }

    return this.productModel.find(query).exec();
  }
}
