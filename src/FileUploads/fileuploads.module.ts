import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { File, FileSchema } from 'src/database/models/file.schema';
import { FileController } from './fileuploads.controller';
import { FileService } from './fileuploads.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: File.name, schema: FileSchema }]),
  ],
  providers: [FileService],
  controllers: [FileController],
})
export class FileUploadModule {}
