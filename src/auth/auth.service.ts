import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { CustomUserRepository } from './user-custom-repository.interface';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  private userRepository: CustomUserRepository;

  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
  ) {
    this.userRepository = UserRepository(this.dataSource);
  }

  async signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
    return this.userRepository.createUser(authCredentialDto);
  }
}
