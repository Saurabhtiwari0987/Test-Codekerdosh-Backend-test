import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Notes, NotesSchema } from 'src/database/models/notes.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Notes.name, schema: NotesSchema }]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_ADMIN_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [NotesController],
  providers: [NotesService],
})
export class NotesModule {}
