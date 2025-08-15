import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/catalog_db'), // từ .env
    ProductModule, CategoryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
