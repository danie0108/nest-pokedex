import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {


  /*Se incluye el constructor para poder utilizar la variable.
  tiene el decorador de Injection debido a que se realizara una insercion en la BD
  - Se deben realizar la importaciones de librerias correspondientes.
  */
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ) { }

  async executeSeed() {

    /*
    Lo que realiza la siguiente linea de codigo es un borrado en la base, es igual a :
      delete * from  Pokemon;
    Lo cual indica que borrara todos los registros que se tengan.
    */
    await this.pokemonModel.deleteMany({});

    // console.log(fetch); //fetch  solo es aceptada apartir de la v 18 de node
    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');
    /**
     * Al realizar el siguiente codigo, lo que esat haciendo es realizar varias transacciones
     * de inserciona la BD
     */
    //extraer el id de la url
    // data.results.forEach(async ({ name, url }) => {
    //   const segments = url.split('/');
    //   // console.log(segments);
    //   const no: number = +segments[segments.length - 2];
    //   // console.log({ name, no });
    //   await this.pokemonModel.create({ name, no });
    // })

    /**
     * De la siguiente forma se realiza la insercion de (n) registro en la base en una sola
     * transacción lo cual beneficia en cantida de tiempo y recursos.
     */
    const pokemonsToInsert: { name: string, no: number }[] = [];
    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const no: number = +segments[segments.length - 2];
      pokemonsToInsert.push({ name, no });
    });
    //La sentencia insertMany es propia de Mongo lo cual permite realizar varias inserciones
    //en una sola transacción.
    await this.pokemonModel.insertMany(pokemonsToInsert);
    // return data.results;
    return 'SEED executed';
  }
}
