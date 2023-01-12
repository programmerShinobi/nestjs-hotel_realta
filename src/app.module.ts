import 'dotenv/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GlobalModule } from './global/global/global.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE,
      entities: ["dist/entities/**/*{.ts,.js}"],
      // entities: ["join(__dirname, '..', entities, '**', '*'.{.ts,.js})"],
      // entities: ["**/*.entities/{.ts,.js}"],
      synchronize: false,
      autoLoadEntities: true
    }),
    GlobalModule
  ],
})
export class AppModule {}
