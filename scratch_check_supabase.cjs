const { createClient } = require("./node_modules/@supabase/supabase-js");
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

const supabaseUrl = envVars.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = envVars.SUPABASE_SERVICE_ROLE_KEY || envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log("Testing connection to URL:", supabaseUrl);

const supabase = createClient(supabaseUrl, supabaseKey);

async function testTables() {
  console.log("Checking 'pekerja' table...");
  const { data: pekerja, error: pekerjaErr } = await supabase.from("pekerja").select("id").limit(1);
  console.log("Pekerja:", { data: pekerja, error: pekerjaErr });

  console.log("Checking 'artikel' table...");
  const { data: artikel, error: artikelErr } = await supabase.from("artikel").select("id").limit(1);
  console.log("Artikel:", { data: artikel, error: artikelErr });

  console.log("Checking 'master_keahlian' table...");
  const { data: masterKeahlian, error: masterKeahlianErr } = await supabase.from("master_keahlian").select("id").limit(1);
  console.log("Master Keahlian:", { data: masterKeahlian, error: masterKeahlianErr });
}

testTables();
