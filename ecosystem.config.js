module.exports = {
	apps: [
		{
			name: "quality-api",
			script: "dist/apps/api/server.js",
			instances: "max",
			exec_mode: "cluster",
			watch: false,
			env: {
				NODE_ENV: "development",
				SERVICE_NAME: "quality-api",
			},
			env_production: {
				NODE_ENV: "production",
				SERVICE_NAME: "quality-api",
			},
		},
		{
			name: "quality-worker",
			script: "dist/apps/worker/worker.bootstrap.js",
			instances: 1,
			exec_mode: "fork",
			watch: false,
			env: {
				NODE_ENV: "development",
				SERVICE_NAME: "quality-worker",
			},
			env_production: {
				NODE_ENV: "production",
				SERVICE_NAME: "quality-worker",
			},
		},
		{
			name: "quality-watchdog",
			script: "dist/apps/watchdog/watchdog.bootstrap.js",
			instances: 1,
			exec_mode: "fork",
			watch: false,
			env: {
				NODE_ENV: "development",
				SERVICE_NAME: "quality-watchdog",
			},
			env_production: {
				NODE_ENV: "production",
				SERVICE_NAME: "quality-watchdog",
			},
		},
	],
};
