import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { CustomUserRepository } from './user-custom-repository.interface';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

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
      const user = this.create({ username, password });

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
