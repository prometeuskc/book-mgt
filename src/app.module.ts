import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from '@app/database';

@Module({
  imports: [DatabaseModule, UsersModule],
})
export class AppModule {}
