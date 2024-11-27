const { Pool } = require('pg');

const pool = new Pool({
  user: 'thomassanmartin', // Replace with your actual PostgreSQL username
  host: '/tmp',                   // Use the Unix socket directory
  database: 'projectdb',          // Your database name
  password: '',      // Provide the password if your setup requires one
  port: 5432,                     // Default PostgreSQL port
});

module.exports = pool;
