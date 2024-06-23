import { Module, forwardRef } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { AuthModule } from '../auth/auth.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule, forwardRef(() => AuthModule)],
  providers: [PokemonService],
  controllers: [PokemonController],
})
export class PokemonModule {}
