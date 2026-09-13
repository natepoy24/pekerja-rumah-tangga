import { createClient } from '@supabase/supabase-js';
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

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, serviceKey);

async function createTables() {
  const sql = fs.readFileSync('supabase/create_tables.sql', 'utf-8');
  console.log("SQL Migration script loaded.");

  // Attempt using postgres pooler connection string or RPC if configured
  // Note: We can also execute query through Supabase REST SQL interface if available:
  const projectRef = supabaseUrl.replace('https://', '').split('.')[0];
  console.log("Project Ref:", projectRef);

  // Let's test if we can run via pg or rpc
  // Try sending query via db sql rest endpoint
  try {
    const res = await fetch(`${supabaseUrl}/rest/v1/`, {
      headers: {
        'apikey': serviceKey,
        'Authorization': `Bearer ${serviceKey}`
      }
    });
    console.log("Supabase REST status:", res.status);
  } catch (err) {
    console.error("REST connection error:", err);
  }
}

createTables();
