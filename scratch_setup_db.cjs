const fs = require("fs");

const envText = fs.readFileSync(".env.local", "utf8");
const envVars = {};
envText.split("\n").forEach((line) => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    const key = match[1];
    let value = match[2] || "";
    if (value.length > 0 && value.startsWith('"') && value.endsWith('"')) {
      value = value.substring(1, value.length - 1);
    }
    envVars[key] = value.trim();
  }
});

const serviceKey = envVars.SUPABASE_SERVICE_ROLE_KEY;
const supabaseUrl = envVars.NEXT_PUBLIC_SUPABASE_URL;

const sqlScript = fs.readFileSync("supabase/create_tables.sql", "utf8");

console.log("Service key length:", serviceKey ? serviceKey.length : 0);
console.log("SQL script loaded, length:", sqlScript.length);

async function runSql() {
  // Method 1: Try REST query or RPC endpoints
  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": serviceKey,
        "Authorization": `Bearer ${serviceKey}`,
      },
      body: JSON.stringify({ query: sqlScript }),
    });
    console.log("Exec RPC response status:", response.status, await response.text());
  } catch (err) {
    console.error("RPC error:", err.message);
  }
}

runSql();
