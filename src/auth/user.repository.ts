import { DataSource, Repository } from 'typeorm';
import { User } from './user.eneity';

export const UserRepository = (dataSource: DataSource): Repository<User> => {
  const repository = dataSource.getRepository(User);
  return repository.extend();
};
