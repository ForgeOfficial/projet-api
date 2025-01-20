export const CACHE_PROVIDER_TOKEN = Symbol('CACHE_PROVIDER_TOKEN');

export interface CacheInterface {
  push(key: string, value: unknown, ttl?: number): Promise<void>;

  find<T = string>(key: string): Promise<T>;

  delete(key: string): Promise<boolean>;
}
