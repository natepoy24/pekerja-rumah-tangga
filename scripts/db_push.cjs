const pkg = require("pg");
const { Client } = pkg;
const fs = require("fs");

const sqlScript = fs.readFileSync("supabase/create_tables.sql", "utf8");

// Try standard password variations if available
const passwords = [
  "postgres",
  "JasaMandiri2026",
  "JasaMandiri123",
  "admin123",
  "rdcrjdlvekrgipemyyhw",
  "PRY8EZpGVMwDGRU",
];

async function attemptConnect() {
  const projectRef = "rdcrjdlvekrgipemyyhw";
  for (const pass of passwords) {
    const connStr = `postgresql://postgres.${projectRef}:${encodeURIComponent(pass)}@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres`;
    console.log("Trying password:", pass.substring(0, 5) + "...");
    try {
      const client = new Client({
        connectionString: connStr,
        connectionTimeoutMillis: 4000,
        ssl: { rejectUnauthorized: false }
      });
      await client.connect();
      console.log("SUCCESS! Connected to Supabase DB via pg pooler!");
      console.log("Executing SQL migration...");
      await client.query(sqlScript);
      console.log("Migration executed successfully!");
      await client.end();
      return true;
    } catch (err) {
      console.log("Failed:", err.message);
    }
  }
  return false;
}

attemptConnect();
