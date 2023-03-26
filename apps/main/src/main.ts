import { AppModule } from '@main/app.module';
import { customOptions } from '@main/swagger/options';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  /** Add swagger doc with nesjs/swagger */
  const config = new DocumentBuilder()
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

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, customOptions);

  await app.listen(3000);
}

bootstrap();
