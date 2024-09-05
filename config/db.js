const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "nopass123",
  host: "localhost",
  port: 5432,
  database: "movies",
});

module.exports = pool;