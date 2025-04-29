import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { CustomUserRepository } from './user-custom-repository.interface';

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

      await this.save(user);
    },
  });
};
