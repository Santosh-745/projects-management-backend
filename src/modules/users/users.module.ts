import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities';
import { UserRepository } from './repositories';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
  imports: [TypeOrmModule.forFeature([User])],
  exports: [UsersService, TypeOrmModule, UserRepository],
})
export class UsersModule {}
