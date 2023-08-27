import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ProductCategoryService } from './product_category.service';
import { CreateProductCategoryDto } from './dto/create-product_category.dto';
import { UpdateProductCategoryDto } from './dto/update-product_category.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guards';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags("product-category")
@Controller('product-category')
export class ProductCategoryController {
  constructor(private readonly productCategoryService: ProductCategoryService) {}

  @Get()
  async findAll() {
    return await this.productCategoryService.findAll();
  }
  
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.productCategoryService.findOne(id);
  }
  
  @ApiBearerAuth("defaultBearerAuth")
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() body: CreateProductCategoryDto) {
    return await this.productCategoryService.create(body);
  }

  @ApiBearerAuth("defaultBearerAuth")
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateProductCategoryDto) {
    return await this.productCategoryService.update(id, body);
  }

  @ApiBearerAuth("defaultBearerAuth")
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.productCategoryService.remove(id);
  }
}
