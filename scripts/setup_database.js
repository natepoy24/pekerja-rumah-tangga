import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

// Parse .env.local manually
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

if (!supabaseUrl || !serviceKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceKey);

async function setup() {
  console.log("Checking database tables on Supabase...");

  const { data: pekerjaData, error: errorPekerja } = await supabase.from('pekerja').select('id').limit(1);
  console.log("Pekerja table:", errorPekerja ? errorPekerja.message : "Exists");

  const { data: artikelData, error: errorArtikel } = await supabase.from('artikel').select('id').limit(1);
  console.log("Artikel table:", errorArtikel ? errorArtikel.message : "Exists");

  // Storage buckets check
  const { data: buckets, error: errorBuckets } = await supabase.storage.listBuckets();
  if (errorBuckets) {
    console.error("Error listing buckets:", errorBuckets.message);
  } else {
    console.log("Existing buckets:", buckets?.map(b => b.name));

    const requiredBuckets = ['foto-pekerja', 'gambar-artikel'];
    for (const bName of requiredBuckets) {
      if (!buckets?.some(b => b.name === bName)) {
        console.log(`Creating public storage bucket: ${bName}...`);
        const { error } = await supabase.storage.createBucket(bName, { public: true });
        if (error) console.error(`Error creating bucket ${bName}:`, error.message);
        else console.log(`Bucket ${bName} created successfully.`);
      }
    }
  }
}

setup().catch(console.error);
