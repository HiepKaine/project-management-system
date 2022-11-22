export const environment = {
  production: false,
  appPrefix: 'api',
  appName: 'Management-System',
  appUrl: 'http://localhost:3000',
  appKey: 'secret',
  jwtTtl: 86400,
  appVersion: '1.0',
  dbLog: true,
  migrationsRun: false,
  dbConnection: 'mysql',
  dbHost: 'localhost',
  dbPort: 30000,
  dbName: 'ms',
  dbUser: 'root',
  dbPass: '',
  enableLoginFailedCheck: true,
  maxLoginFailed: 10,
  maxFileUploadAllowed: 10,
  smtpUser: 'no-reply@vicoders.com',
  smtpPass: '',
  smtpHost: 'smtp.mandrillapp.com',
  smtpPort: '587',
};
