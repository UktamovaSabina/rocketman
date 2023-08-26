import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, Request, UploadedFile, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/utils/multer';
import { JwtAuthGuard } from '../auth/guards/jwt.guards';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file', multerOptions))
  create(@Body() body: any, @UploadedFile() file: Express.Multer.File) {
    console.log(body)
    let reqToPass = { ...body, product_image: file.filename, status: body.status == 'true' ? true : false }
    return this.productService.create(reqToPass);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  update(@Param('id') id: string, @Body() body: any, @UploadedFile() file: Express.Multer.File) {
    let reqToPass = { ...body, product_image: file.filename, status: body.status == 'true' ? true : false }
    return this.productService.update(+id, reqToPass);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
