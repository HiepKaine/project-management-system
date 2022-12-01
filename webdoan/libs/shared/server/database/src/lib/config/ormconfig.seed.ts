import database from './database';

export default {
  ...database(),
  ...{ migrations: [__dirname + '/../seed/**/*{.ts,.js}'] },
  migrationsTableName: 'seeds'
};
