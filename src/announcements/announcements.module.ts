import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnnouncementsEntity } from './announcements.entity';
import { AnnouncementsController } from './announcements.controller';
import { AnnouncementsService } from './announcements.service';
import { ThrottlerModule } from '@nestjs/throttler';
import { CacheService } from '../cache/cache.service';
import { CACHE_PROVIDER_TOKEN } from '../cache/cache.interface';

@Module({
  imports: [
    TypeOrmModule.forFeature([AnnouncementsEntity]),
    ThrottlerModule.forRoot([
      {
        ttl: 1_000,
        limit: 10,
      },
    ]),
  ],
  controllers: [AnnouncementsController],
  providers: [
    AnnouncementsService,
    {
      provide: CACHE_PROVIDER_TOKEN,
      useClass: CacheService,
    },
  ],
})
export class AnnouncementsModule {}
