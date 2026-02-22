import { CacheKey } from "./cache.types";

export class CacheKeyResolver {
	resolve(key: CacheKey, params: any[] = []): string {
		return typeof key === "function" ? key(...params) : key;
	}
}
