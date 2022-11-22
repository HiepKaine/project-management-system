import { environment } from '../../../../common/src/environments/environment';

export default () => ({
  type: environment.dbConnection || 'mysql',
  host: environment.dbHost,
  username: environment.dbUser,
  password: environment.dbPass,
  database: environment.dbName,
  port: environment.dbPort,
  // We are using migrations, synchronize should be set to false.
  synchronize: false,

  // Run migrations automatically,
  // you can disable this if you prefer running migration manually.
  migrationsRun: environment?.migrationsRun || false,
  logging: environment?.dbLog || false,
  logger: 'file',
});
