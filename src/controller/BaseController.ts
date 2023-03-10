import {createClient as createRedisClient} from "redis"
import {JsonController} from "@coralblack/cyan/dist/http";
export class BaseController extends JsonController {
    protected readonly redis;

    constructor() {
        super();

        const redisClient = createRedisClient({
            socket: {
                host: process.env.REDIS_HOST,
                port: parseInt(process.env.REDIS_PORT, 10) || 6379
            },
            legacyMode: true
        });

        redisClient.on('error', err => {
            throw new Error(`REDIS CLIENT ERROR - ${err}`);
        });
        redisClient.connect().then();

        this.redis = redisClient.v4;
    }
}
