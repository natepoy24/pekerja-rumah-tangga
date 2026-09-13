import pkg from 'pg';
const { Client } = pkg;
import fs from 'fs';

const envContent = fs.readFileSync('.env.local', 'utf-8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    let value = match[2] || '';
    if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
    if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
    env[match[1]] = value.trim();
  }
});

const sql = fs.readFileSync('supabase/create_tables.sql', 'utf-8');

// Test possible connection string formats if user provided DATABASE_URL or default password
const connectionStrings = [
  process.env.DATABASE_URL,
  env.DATABASE_URL,
  `postgres://postgres:postgres@db.rdcrjdlvekrgipemyyhw.supabase.co:5432/postgres`,
  `postgresql://postgres.rdcrjdlvekrgipemyyhw:postgres@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres`
].filter(Boolean);

async function run() {
  for (const conn of connectionStrings) {
    try {
      console.log("Connecting to postgres...");
      const client = new Client({ connectionString: conn, connectionTimeoutMillis: 5000, ssl: { rejectUnauthorized: false } });
      await client.connect();
      console.log("Connected! Executing SQL...");
      await client.query(sql);
      console.log("SQL Migration executed successfully!");
      await client.end();
      return;
    } catch (err) {
      console.log("Connection failed:", err.message);
    }
  }
  console.log("Could not connect directly via pg without database password.");
}

run();
