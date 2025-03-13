import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { DatabaseService } from './database/database.service';
import { StudentModule } from './student/student.module';

@Module({
  imports: [DatabaseModule, StudentModule],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
