import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;
  async executeSeed() {
    // console.log(fetch); //fetch  solo es aceptada apartir de la v 18 de node
    const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=5');

    //extraer el id de la url
    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      console.log(segments);
      const no: number = +segments[segments.length - 2];
      console.log({ name, no });
    })
    return data.results;
  }
}
