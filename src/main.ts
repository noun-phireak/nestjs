import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /* 
  SWAGGER
  */
  const config = new DocumentBuilder()
  .setTitle('API Testing')
  .setDescription('API Testing')
  .setVersion('V3')
  .addTag('Nest API V3')
  .build();

  const doc = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api',app, doc)
  await app.listen(3000);

}

bootstrap();
