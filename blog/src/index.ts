import 'module-alias/register';
import {BlogApplication} from '@app/application';
import {ApplicationConfig} from '@loopback/core';

export {BlogApplication};

export async function main(options: ApplicationConfig = {}) {
  const app = new BlogApplication(options);
  await app.boot();
  await app.migrateSchema();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  return app;
}
