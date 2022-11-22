import database from './database';

export default {
  ...database(),
  ...{ migrations: [__dirname + '/../migration/**/*{.ts,.js}'] },
};
