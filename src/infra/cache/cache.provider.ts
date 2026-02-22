import { CacheKeyResolver } from "./cache.resolver";
import { CacheEngine } from "./cache.provider.interface";
import { CacheKey, CacheSchema } from "./cache.types";

export class CacheProvider {
	constructor(
		private engine: CacheEngine,
		private schema: CacheSchema,
		private resolver: CacheKeyResolver,
	) {}

	set<T>(
		group: keyof CacheSchema,
		key: CacheKey,
		value: T,
		ttl?: number,
		...params: any[]
	) {
		const resolvedKey = this.resolver.resolve(key, params);
		this.engine.set(resolvedKey, value, ttl);
	}

	get<T>(
		group: keyof CacheSchema,
		key: CacheKey,
		...params: any[]
	): T | undefined {
		const resolvedKey = this.resolver.resolve(key, params);
		return this.engine.get<T>(resolvedKey);
	}

	del(group: keyof CacheSchema, key: CacheKey, ...params: any[]) {
		const resolvedKey = this.resolver.resolve(key, params);
		this.engine.del(resolvedKey);
	}

	delGroup(group: keyof CacheSchema) {
		const groupDef = this.schema[group];
		if (!groupDef) return;

		const keysToDelete = Object.values(groupDef).filter(
			(v) => typeof v === "string",
		) as string[];

		this.engine.del(keysToDelete);
	}

	flush() {
		this.engine.flush();
	}
}
