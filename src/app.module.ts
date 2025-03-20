import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { StudentModule } from './student/student.module';
import { TeacherModule } from './teacher/teacher.module';
import { CourseModule } from './course/course.module';

@Module({
  imports: [DatabaseModule, StudentModule, TeacherModule, CourseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
