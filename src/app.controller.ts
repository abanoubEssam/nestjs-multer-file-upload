import { Controller, Get, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { storage } from './storage.config';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post("upload") // API path
  @UseInterceptors(
    FileFieldsInterceptor(
      [{ name: "attachment", maxCount: 1 }, { name: "voiceMessage", maxCount: 1 }],
      { storage }
    ),
  )
  async upload(@UploadedFiles() files) {
    let filesArr = [];
    for (const key in files) {
      if (Object.prototype.hasOwnProperty.call(files, key)) {
        const element = files[key];
        element[0]["url"] = process.env.NODE_ENV == "development" ? `http://localhost:3000/uploads/${element[0].filename}` : `http://localhost:3000/uploads/${element[0].filename}`
        filesArr[key] = element[0].url;
      }
    }
    console.log("🚀 ~ file: app.controller.ts ~ line 27 ~ AppController ~ upload ~ filesArr", filesArr)
    return {...filesArr};
  }
}
