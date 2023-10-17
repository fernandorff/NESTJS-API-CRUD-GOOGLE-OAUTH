import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './domains/users/users.module';
import { APP_PIPE } from '@nestjs/core';
import * as process from 'process';
import { ConfigModule } from '@nestjs/config';
import { EmployeeModule } from './domains/employees/employee.module';
import { EmployeeRoleModule } from './domains/employee-role/employee-role.module';
import { EmployeeSectorModule } from './domains/employee-sector/employee-sector.module';
import { SectorModule } from './domains/sector/sector.module';
import { RoleModule } from './domains/role/role.module';
import 'dotenv/config';


const cookieSession = require('cookie-session');

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: ['dist/src/domains/**/entities/*.entity{.ts,.js}'],
        synchronize: false,
        retryDelay: 3000,
        retryAttempts: 10,
      }),
    }),
    AuthModule,
    UsersModule,
    EmployeeModule,
    EmployeeRoleModule,
    EmployeeSectorModule,
    SectorModule,
    RoleModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: ['keys'],
        }),
      )
      .forRoutes('*');
  }
}
