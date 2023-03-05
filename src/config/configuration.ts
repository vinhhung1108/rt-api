export default () => ({
  port: parseInt(process.env.PORT, 10),
  host: process.env.HOST || 'localhost',
  database: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT, 10),
    uri: process.env.MONGODB_URI,
  },
  authConfig: {
    secret_key: process.env.SECRET_KEY,
  },
  authEnabled: process.env.AUTH_ENABLED,
  throttle: {
    ttl: process.env.THROTTLE_TTL || 60,
    limit: process.env.THOTTLE_LIMIT || 100,
  },
});
