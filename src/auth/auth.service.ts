import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { UserRepository } from './user.repository';
import { User } from './user.eneity';

@Injectable()
export class AuthService {
  private userRepository: Repository<User>;

  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
  ) {
    this.userRepository = UserRepository(this.dataSource);
  }
}
