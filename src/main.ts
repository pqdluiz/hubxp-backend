import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Hubxp')
    .setDescription('The Hubxp API description')
    .setVersion('1.0')
    .addTag('hubxp')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  if(process.env.ENVIRONMENT === "develop") {
    SwaggerModule.setup('api', app, document);
  }

  await app.listen(3000);
}
bootstrap();
