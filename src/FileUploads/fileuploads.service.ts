import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { File, FileDocument, FileUploadDto } from "src/database/models/file.schema";
import * as AWS from 'aws-sdk';



@Injectable()
export class FileService {
  constructor(@InjectModel(File.name) private fileModel: Model<FileDocument>) {}

  private s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });

  async uploadFile(body: FileUploadDto){

    const { file } = body;

    try {
      const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME, // Your S3 bucket name
        Key: `${Date.now()}-${file.originalname}`, // Unique file name
        Body: file.buffer,
        ContentType: file.mimetype,
        // ACL: 'public-read', // Make the file publicly accessible
      };

      const uploadResult = await this.s3.upload(params).promise();
      const location = uploadResult.Location; // Return the S3 URL
      const newFile = await this.fileModel.create({...body, link: location});
      return newFile.toObject();
    } catch (error) {
      console.error('Error uploading file to S3:', error);
      throw new Error('Failed to upload file');
    }
  }

  async getFileById(id: string): Promise<FileDocument | null> {
    return await this.fileModel.findById(id)
  }

  async deleteFile(id: string): Promise<{ message: string }> {
    const file = await this.fileModel.findByIdAndDelete(id);
    if (!file) {
      throw new Error('File not found');
    }
    // Optionally, you can also delete the file from S3 here if needed
    return { message: 'File deleted successfully' };
  }


}