import { Repository } from 'typeorm';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { User } from './user.entity';

export interface CustomUserRepository extends Repository<User> {
  createUser(authCredentialDto: AuthCredentialDto): Promise<void>;
}
