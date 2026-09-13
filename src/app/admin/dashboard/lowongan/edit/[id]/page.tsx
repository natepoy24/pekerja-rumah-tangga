import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import JobFormClient from "@/components/admin/JobFormClient";
import { DEFAULT_JOBS } from "@/lib/jobs";

export const revalidate = 0;

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminEditLowonganPage({ params }: PageProps) {
  const { id } = await params;
  let job: any = null;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .eq("id", id)
      .single();

    if (!error && data) {
      job = data;
    } else {
      job = DEFAULT_JOBS.find((j) => j.id === id || j.slug === id) || null;
    }
  } catch (err) {
    console.error("Fetch job by id edit error:", err);
    job = DEFAULT_JOBS.find((j) => j.id === id || j.slug === id) || null;
  }

  if (!job) {
    notFound();
  }

  return <JobFormClient initialJob={job} isEdit={true} />;
}
