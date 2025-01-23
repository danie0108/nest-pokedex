import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { CommonModule } from './common/common.module';
import { PokemonModule } from './pokemon/pokemon.module';
import { SeedModule } from './seed/seed.module';
import { EnvConfiguration } from './common/config/app.config';
import { JoiValidationSchema } from './common/config/joi.validation';


@Module({
  imports: [
    /**
     * la posision de importaciones si importa debido a que las conexione
     * se inicializan y si no encuentra los recurso iniciados, marcara errores
     */
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema,
    }), //Al ser las variables de entorno debe estar al inicio
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MongooseModule.forRoot(process.env.MONGODB, {
      dbName: 'pokemosdb'
    }),
    PokemonModule,
    CommonModule,
    SeedModule,
  ],
})
export class AppModule {
  // constructor() {
  //   console.log(process.env);
  // }
}
