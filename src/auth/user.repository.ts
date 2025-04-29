import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { CustomUserRepository } from './user-custom-repository.interface';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

export const UserRepository = (
  dataSource: DataSource,
): CustomUserRepository => {
  const repository = dataSource.getRepository(User);
  return repository.extend({
    async createUser(
      this: Repository<User>,
      authCredentialDto: AuthCredentialDto,
    ): Promise<void> {
      const { username, password } = authCredentialDto;

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = this.create({ username, password: hashedPassword });

      try {
        await this.save(user);
      } catch (error) {
        const err = error as { code?: string };
        if (err.code === '23505') {
          throw new ConflictException('Existing username');
        } else {
          throw new InternalServerErrorException();
        }
      }
    },
  });
};
