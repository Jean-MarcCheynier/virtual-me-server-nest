import { AppController } from '@main/app.controller';
import { AppService } from '@main/app.service';
import { AuthModule } from '@main/auth/auth.module';
import { JwtAuthGuard } from '@main/auth/guard/jwt-auth.guard';
import { RolesGuard } from '@main/auth/guard/roles.guard';
import { LoggerMiddleware } from '@main/common/middleware/logger.middleware';
import configuration from '@main/config/configuration';
import { UserModule } from '@main/user/user.module';
import { WishModule } from '@main/wish/wish.module';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.development',
      isGlobal: true,
      load: [configuration],
      cache: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        console.log('HELLO');
        console.log(JSON.stringify(config, null, 4));
        return {
          uri: config.get('database.uri'),
          dbName: config.get('database.name'),
        };
      },
    }),
    UserModule,
    AuthModule,
    WishModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'user', method: RequestMethod.GET });
  }
}
