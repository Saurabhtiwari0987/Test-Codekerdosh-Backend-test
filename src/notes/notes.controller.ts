import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { AdminJwtAuthGuard } from 'src/Guards/jwt-auth.guard';
import { Notes } from 'src/database/models/notes.schema';
import { Types } from 'mongoose';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @UseGuards(AdminJwtAuthGuard)
  @Post()
  create(@Body() createNoteDto: Notes) {
    if (!createNoteDto.title || !createNoteDto.link) {
      throw new BadRequestException('Title and link are required fields');
    }
    return this.notesService.create(createNoteDto);
  }

  @UseGuards(AdminJwtAuthGuard)
  @Get()
  findAll() {
    return this.notesService.findAll();
  }

  @UseGuards(AdminJwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notesService.findOne(id);
  }

  @UseGuards(AdminJwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notesService.remove(id);
  }

  @UseGuards(AdminJwtAuthGuard)
  @Post('attach/:id')
  attach(
    @Param('id') id: string,
    @Body() attachDto: { courseId: Types.ObjectId[] },
  ) {
    if (!id) {
      throw new BadRequestException('Note ID is required');
    }
    if (!attachDto.courseId || !Array.isArray(attachDto.courseId)) {
      throw new BadRequestException('courseId must be an array');
    }
    return this.notesService.attach(id, attachDto);
  }
}
