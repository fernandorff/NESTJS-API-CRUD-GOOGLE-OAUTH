import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Profile } from 'passport-google-oauth20';
import { User } from 'src/domains/users/entities/user.entity';
import { UsersService } from '../../domains/users/services/users.service';
import { AuthDto } from '../dtos/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(profile: Profile) {
    const newUser = new User();
    newUser.email = profile.emails[0].value;
    newUser.displayName = profile.displayName;
    newUser.dominio = profile._json.hd;
    newUser.photo = profile._json.picture;
    return await this.usersService.create(newUser);
  }

  async signIn(profile: Profile) {
    const user = await this.usersService.findOneByEmail(
      profile.emails[0].value,
    );
    if (!user) {
      const user = await this.signUp(profile);
      return user;
    }
    return user;
  }

  async login(profile: any) {
    const authDto = new AuthDto();
    const userOpt = await this.usersService.findOneByEmail(
      profile.emails[0].value,
    );
    const payload = {
      employee: userOpt,
    };
    const token = this.jwtService.sign(payload);
    authDto.token = token;
    return authDto;
  }
}