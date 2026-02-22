export interface CacheEngine {
	get<T>(key: string): T | undefined;
	set<T>(key: string, value: T, ttl?: number): void;
	del(keys: string | string[]): void;
	flush(): void;
}
