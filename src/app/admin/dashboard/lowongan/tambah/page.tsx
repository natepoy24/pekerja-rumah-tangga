import JobFormClient from "@/components/admin/JobFormClient";

export const revalidate = 0;

export default function AdminTambahLowonganPage() {
  return <JobFormClient isEdit={false} />;
}
