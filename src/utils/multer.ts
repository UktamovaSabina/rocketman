import { BadRequestException } from "@nestjs/common";
import { Multer, MulterError, diskStorage } from "multer";
import {resolve} from 'path'


export const multerOptions = {
  fileFilter: (req, file, cb)=>{
    if(file.originalname.match(/^.*\.(jpeg|webp|png|jpg)$/)) cb(null, true);
    else{
      cb(new BadRequestException('invalid image file'), false);
    }
  },
  storage: diskStorage({
    destination: (req, file, cb)=>{
      cb(null, resolve('uploads'));
    },
    filename: (req, file, callback)=>{
      callback(null, Date.now() + "." + file.originalname.replace(/\s/g, ''))
    }
  })
}