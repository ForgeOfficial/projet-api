import { Inject, Injectable } from '@nestjs/common';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { CacheInterface } from './cache.interface';

@Injectable()
export class CacheService implements CacheInterface {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  push(key: string, value: any, ttl?: number) {
    return this.cacheManager.set(key, value, ttl);
  }

  find<T = string>(key: string): Promise<T> {
    return this.cacheManager.get<T>(key);
  }

  delete(key: string): Promise<boolean> {
    return this.cacheManager.del(key);
  }
}
