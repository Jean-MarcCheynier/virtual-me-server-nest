import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { customOptions } from './swagger/options';

import {
  WinstonModule,
  utilities as nestWinstonModuleUtilities,
} from 'nest-winston';
import { createLogger, transports, format } from 'winston';
import { ConfigService } from '@nestjs/config';
import { winstonDefaultConfig } from './config/winston';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';

async function bootstrap() {
  const instance = createLogger(winstonDefaultConfig);
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      instance,
    }),
  });
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadRequestException(
          validationErrors.map((error) => ({
            field: error.property,
            error: error.constraints,
          })),
        );
      },
    }),
  );
  const configservice = app.get<ConfigService>(ConfigService);

  instance.level = configservice.get('log.level');
  app.enableCors();

  /** Add swagger doc with nesjs/swagger */
  const swaggerConfig = new DocumentBuilder()
    .setTitle('VirtualMe OAS')
    .setDescription('The virtual-me API description')
    .setVersion('2.0')
    .addSecurity('bearerAuth', {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: '{{ JWT }}',
    })
    .addSecurityRequirements('bearerAuth', [])
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document, customOptions);

  await app.listen(3000);
}

bootstrap();
