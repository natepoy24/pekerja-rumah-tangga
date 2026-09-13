import { createClient } from "@/lib/supabase/server";
import JobAdminListClient from "@/components/admin/JobAdminListClient";
import { DEFAULT_JOBS } from "@/lib/jobs";

export const revalidate = 0;

export default async function AdminLowonganDashboardPage() {
  let jobs: any[] = [];
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      jobs = DEFAULT_JOBS;
    } else {
      jobs = data;
    }
  } catch (err) {
    console.error("Fetch jobs admin dashboard error:", err);
    jobs = DEFAULT_JOBS;
  }

  return <JobAdminListClient initialJobs={jobs} />;
}
