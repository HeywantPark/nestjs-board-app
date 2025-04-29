import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { CustomUserRepository } from './user-custom-repository.interface';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';

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

  async signIn(authCredentialDto: AuthCredentialDto): Promise<string> {
    const { username, password } = authCredentialDto;
    const user = await this.userRepository.findOne({ where: { username } });

    if (user && (await bcrypt.compare(password, user.password))) {
      return 'login success';
    } else {
      throw new UnauthorizedException('login failed');
    }
  }
}
