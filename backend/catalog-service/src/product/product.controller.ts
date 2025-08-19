import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  UseGuards,
  Query
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './create-product.dto';
import { UpdateProductDto } from './update-product.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

@Controller('products')
@ApiBearerAuth()
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.productService.create(dto);
  }

  //@UseGuards(JwtAuthGuard)
  /**
   * Get all products without pagination
   * Example: GET /products/all
   */
  @Get('all')
  getAllNoPaging() {
    return this.productService.findAllBasic(); // ProductService should implement getAll()
  }

  // # Get page 1, 5 products per page, sort by price ascending, search name "bút"
  // curl "http://localhost:3002/products?page=1&limit=5&sortBy=price&sortOrder=asc&search=bút"
  @Get()
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'sortBy', required: false, enum: ['price', 'name', 'createdAt'] })
  @ApiQuery({ name: 'sortOrder', required: false, enum: ['asc', 'desc'] })
  findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('search') search?: string,
    @Query('sortBy') sortBy = 'createdAt',
    @Query('sortOrder') sortOrder: 'asc' | 'desc' = 'desc',
  ) {
    return this.productService.findAll(
      Number(page),
      Number(limit),
      search,
      sortBy,
      sortOrder,
    );
  }

  // ✅ Search by category & tags
  // curl "http://localhost:3002/products/search?category=stationery&tags=pencil,school"
  @Get('search')
  @ApiQuery({ name: 'category', required: false })
  @ApiQuery({ name: 'tags', required: false, description: 'Comma-separated tags' })
  search(
    @Query('category') category?: string,
    @Query('tags') tags?: string,
  ) {
    const parsedTags = tags ? tags.split(',') : [];
    return this.productService.search({ category, tags: parsedTags });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.productService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string) {
    return this.productService.delete(id);
  }

}
