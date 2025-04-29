import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectDataSource } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CustomUserRepository } from './user-custom-repository.interface';
import { DataSource } from 'typeorm';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class jwtStrategy extends PassportStrategy(Strategy) {
  private userRepository: CustomUserRepository;

  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
  ) {
    super({
      secretOrKey: 'superSecret1234',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
    this.userRepository = UserRepository(this.dataSource);
  }

  async validate(payload: JwtPayload) {
    const { username } = payload;
    const user: User | null = await this.userRepository.findOne({
      where: { username },
    });

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
