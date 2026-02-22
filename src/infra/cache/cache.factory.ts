import { NodeCacheEngine } from "./node-cache.engine";
import { CacheKeyResolver } from "./cache.resolver";
import { CacheProvider } from "./cache.provider";
import { CACHE_SCHEMA } from "./cache.schema";

function createCacheProvider() {
	const engine = new NodeCacheEngine();
	const resolver = new CacheKeyResolver();

	return new CacheProvider(engine, CACHE_SCHEMA, resolver);
}

export const cacheService = createCacheProvider();
