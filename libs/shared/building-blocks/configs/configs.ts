const configs = () => ({
  port: parseInt(process.env.PORT || '3366', 10),
  serviceName: 'user-service',
  
})  ;
// export default registerAs('database', () => ({
//   host: process.env.DATABASE_HOST,
//   port: process.env.DATABASE_PORT || 5432
// }));
export default configs;
