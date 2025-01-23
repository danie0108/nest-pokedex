import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //Esta sentencia sirve para que los endpoint tengan una ruta /api/v2, todos lo implementarian en los controladores
  app.setGlobalPrefix('api/v2');
  /**
   * Dentro de los GlobalPipes se pueden transformar los dto's en el tipo de dato que esperamos
   */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true, //se coloco para validad el tipo de dato que recibe el dto a number
      transformOptions: {
        enableImplicitConversion: true,
      }
    })
  );
  await app.listen(process.env.PORT);
}
bootstrap();
