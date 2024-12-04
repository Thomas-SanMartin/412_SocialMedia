const { Pool } = require('pg');

const pool = new Pool({
  user: 'thomassanmartin',        // PostgreSQL username
  host: '/tmp',                   // Unix socket directory
  database: 'projectdb',          // Database name
  password: '',                   // Password
  port: 5432,                     // Default PostgreSQL port
});

module.exports = pool;
