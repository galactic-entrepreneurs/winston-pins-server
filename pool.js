var pg = require('pg');

var config = {
    user: 'postgres', //env var: PGUSER 
    database: 'gnaf', //env var: PGDATABASE 
    password: 'akashsunny', //env var: PGPASSWORD 
    host: 'localhost', // Server hosting the postgres database 
    port: 27016, //env var: PGPORT 
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 60000, // how long a client is allowed to remain idle before being closed
};

//this initializes a connection pool
//it will keep idle connections open for a 30 seconds
//and set a limit of maximum 10 idle clients
var pool = new pg.Pool(config);

exports.pool = pool;