import {
  CourseAssignment,
  CourseDocument,
  CourseModule,
  CourseNote,
  CourseVideo,
} from 'src/database/models/course.schema';

export class CreateCourseDto {
  readonly title: string;
  readonly description: string;
  readonly technologies: string[];
  readonly courseVideos: CourseVideo[];
  readonly courseDocs: CourseDocument[];
  readonly modules: CourseModule[];
  readonly assignments?: CourseAssignment[];
  readonly courseNotes?: CourseNote[];
}

export class UpdateCourseDto {
  readonly title?: string;
  readonly description?: string;
  readonly technologies?: string[];
  readonly courseVideos?: CourseVideo[];
  readonly courseDocs?: CourseDocument[];
  readonly modules?: CourseModule[];
  readonly assignments?: CourseAssignment[];
  readonly courseNotes?: CourseNote[];
}
