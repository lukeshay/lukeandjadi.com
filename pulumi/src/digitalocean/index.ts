import * as digitalocean from '@pulumi/digitalocean';
import * as pulumi from '@pulumi/pulumi';

const databaseCluster = new digitalocean.DatabaseCluster('postgres-cluster', {
  engine: 'pg',
  nodeCount: 1,
  region: 'nyc3',
  size: 'db-s-1vcpu-1gb',
  version: '13',
  maintenanceWindows: [{ day: 'tuesday', hour: '22:00' }],
});

const databaseDB = new digitalocean.DatabaseDb('postgres-db', {
  clusterId: databaseCluster.id,
});

const databaseUser = new digitalocean.DatabaseUser('postgres-user', {
  clusterId: databaseCluster.id,
});

const databaseConnectionPool = new digitalocean.DatabaseConnectionPool(
  'postgres-connection-pool',
  {
    clusterId: databaseCluster.id,
    dbName: databaseDB.name,
    mode: 'transaction',
    size: 20,
    user: databaseUser.name,
  },
);

const dsn = pulumi.concat(
  'postgresql://',
  databaseConnectionPool.user,
  ':',
  databaseConnectionPool.password,
  '@',
  databaseConnectionPool.host,
  ':',
  databaseConnectionPool.port,
  '/',
  databaseConnectionPool.name,
);

dsn.apply((t) => console.log(t));

export default {
  dbUser: databaseConnectionPool.user,
  dbPass: databaseConnectionPool.password,
  dbHost: databaseConnectionPool.host,
  dbPort: databaseConnectionPool.port,
  dsn,
};
