import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PokemonModule } from './pokemon/pokemon.module';
import { Log } from './logs/log.entity';
import { LogModule } from './logs/log.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [__dirname + '/**/*/.entity.{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Log]),
    AuthModule,
    UserModule,
    PokemonModule,
    LogModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
})
export class AppModule {}