import { ProductCategory } from 'src/modules/product_category/entities/product_category.entity';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, Request, UploadedFile, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/utils/multer';
import { JwtAuthGuard } from '../auth/guards/jwt.guards';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Get()
  async findAll() {
    return await this.productService.findAll();
  }
  
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.productService.findOne(id);
  }
  
  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async create(@Body() body: any, @UploadedFile() file: Express.Multer.File) {
    try {
      let reqToPass = { ...body, productCategory: +body.ProductCategory, product_image: file.filename, status: body.status == 'true' ? true : false }
      return await this.productService.create(reqToPass);
    } catch (error) {
      return {
        status: 400,
        message: error.message
      }
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: any, @UploadedFile() file: Express.Multer.File) {
   try {
    let reqToPass = { ...body, product_image: file.filename, status: body.status == 'true' ? true : false }
    return await this.productService.update(id, reqToPass);
   } catch (error) {
    return {
      status: 400,
      message: error.message
    }
   }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.productService.remove(id);
  }
}
