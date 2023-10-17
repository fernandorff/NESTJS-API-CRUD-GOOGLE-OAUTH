import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthController } from '../auth/controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { CurrentUserMiddleware } from '../common/middlewares/current-user.middleware';
import { UsersModule } from '../domains/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { GoogleStrategy } from './strategy/google-strategy.guards';
import { JwtStrategy } from './strategy/jwt-strategy.guards';

@Module({
  imports: [
    UsersModule, 
    PassportModule, 
    JwtModule.register({
        // global: true,
        privateKey: '404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970',
        signOptions: { expiresIn: '3600s' },
    })],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, JwtStrategy],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
