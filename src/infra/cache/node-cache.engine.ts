import NodeCache from "node-cache";
import { CacheEngine } from "./cache.provider.interface";

export class NodeCacheEngine implements CacheEngine {
	private cache: NodeCache;

	constructor() {
		this.cache = new NodeCache({
			stdTTL: 60 * 5,
			checkperiod: 60,
			useClones: false,
		});
	}

	get<T>(key: string) {
		return this.cache.get<T>(key);
	}

	set<T>(key: string, value: T, ttl?: number) {
		if (ttl) {
			this.cache.set(key, value, ttl);
			return;
		}
		this.cache.set(key, value);
	}

	del(keys: string | string[]) {
		this.cache.del(keys);
	}

	flush() {
		this.cache.flushAll();
	}
}
