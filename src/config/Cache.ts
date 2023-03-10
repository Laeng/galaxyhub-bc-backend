import IoRedis from "ioredis";
import { CacheContainer } from "node-ts-cache";
import { IoRedisStorage } from "node-ts-cache-storage-ioredis";

export class Cache {
  private static ioRedisInstance = new IoRedis({
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    host: process.env.REDIS_HOST || "",
    family: 4,
    password: process.env.REDIS_PASSWORD || null,
    db: 0,
  });

  public static redisContainer = new CacheContainer(new IoRedisStorage(this.ioRedisInstance));
}
