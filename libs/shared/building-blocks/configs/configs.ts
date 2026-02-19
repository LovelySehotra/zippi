const configs = () => ({
  port: parseInt(process.env.PORT || '3366', 10),
  serviceName: 'user-service',
  redis:{
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
  }
  
})  ;
// export default registerAs('database', () => ({
//   host: process.env.DATABASE_HOST,
//   port: process.env.DATABASE_PORT || 5432
// }));
export default configs;
