import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class PokemonService {
  constructor(private httpService: HttpService) {}

  async getFirst151Pokemons(): Promise<any> {
    const response = await this.httpService.get('https://pokeapi.co/api/v2/pokemon?limit=151').toPromise();
    return response.data.results;
  }
}