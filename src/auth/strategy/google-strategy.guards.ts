import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-google-oauth20";
import { VerifiedCallback } from "passport-jwt";
import { AuthService } from "../services/auth.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(private authService: AuthService) {
        super({
            clientID: '597070017575-pu1075l44ginucbudfv03m0ig0srqrt9.apps.googleusercontent.com',
            clientSecret: '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',
            callbackURL: 'http://localhost:3000/auth/google/redirect',
            scope: ['email', 'profile']
        });
    }

    async validate(
        accessToken: string, 
        refreshToken: string, 
        profile: Profile,
        done: VerifiedCallback
        ) {
            done(null, profile);
            const user = await this.authService.signIn(profile);
            return user || null;
    }
}