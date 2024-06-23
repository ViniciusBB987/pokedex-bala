import { Controller, Get, UseGuards } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('pokemon')
@UseGuards(JwtAuthGuard)
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  async findAll() {
    return this.pokemonService.getFirst151Pokemons();
  }
}