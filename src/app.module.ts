import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { StudentModule } from './student/student.module';
import { TeacherModule } from './teacher/teacher.module';
import { CourseModule } from './course/course.module';
import { StudentCourseModule } from './student-course/student-course.module';

@Module({
  imports: [DatabaseModule, StudentModule, TeacherModule, CourseModule, StudentCourseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
