import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AnnouncementsModule } from './announcements/announcements.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      autoLoadEntities: true,
      synchronize: true,
      logging: 'all',
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30m' },
    }),
    CacheModule.register({
      isGlobal: true,
      ttl: 1000 * 60 * 60 * 24, // 24 hours
    }),

    UsersModule,
    AnnouncementsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
