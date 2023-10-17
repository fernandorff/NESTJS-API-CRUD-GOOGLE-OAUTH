import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    
    constructor() {
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          ignoreExpiration: false,
          secretOrKey: '404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970',
        });
    }

    async validate(payload: any) {
      console.log('validate ', payload);
        return { name: payload.name, email: payload.email };
      }
}