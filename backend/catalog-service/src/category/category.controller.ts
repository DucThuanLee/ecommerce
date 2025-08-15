import { Controller, Post, Get, Body } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from '@shared/dto/catalog/create-category.dto';
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() dto: CreateCategoryDto) {
    return this.categoryService.create(dto);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }
}