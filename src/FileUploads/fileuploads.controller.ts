import { Body, Controller, Delete, Get, Param, Post, UseGuards, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileService } from "./fileuploads.service";
import { AdminJwtAuthGuard } from "src/Guards/jwt-auth.guard";
import { FileUploadDto } from "src/database/models/file.schema";
import { UserJwtAuthGuard } from "src/Guards/jwt-user-auth.guard";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @UseGuards(AdminJwtAuthGuard)
  @Delete(':id')
  async deleteFile(@Param('id') id: string) {
    return await this.fileService.deleteFile(id);
  }

  @UseGuards(AdminJwtAuthGuard)
  @Get(':id')
  async getFileById(@Param('id') id: string) {
    return await this.fileService.getFileById(id);
  }

  @UseGuards(UserJwtAuthGuard)
  @Get(':id/student')
  async getFileByIdStudent(@Param('id') id: string) {
    return await this.fileService.getFileById(id);
  }

  @UseGuards(AdminJwtAuthGuard)
  @Post('')
  @UseInterceptors(FileInterceptor('file', {
    limits: {fileSize: 10 *1024 * 1024 * 1024}, // 10 MB limit
  }))
  async addFile(@UploadedFile() file: Express.Multer.File, @Body() body: FileUploadDto) {
    return this.fileService.uploadFile({ ...body, file });
  }
}