export default function AdminDashboardLoading() {
  return (
    <div className="p-6 md:p-10 space-y-8 font-sans animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-[#D5E8D0]">
        <div className="space-y-2">
          <div className="h-8 w-64 bg-slate-200 rounded-xl" />
          <div className="h-4 w-96 bg-slate-100 rounded-lg" />
        </div>
        <div className="h-10 w-36 bg-[#0B4F42]/20 rounded-xl shrink-0" />
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-2xl border border-[#D5E8D0] p-6 space-y-3">
            <div className="flex justify-between items-center">
              <div className="h-4 w-24 bg-slate-200 rounded" />
              <div className="w-10 h-10 bg-[#EBF4E7] rounded-xl" />
            </div>
            <div className="h-8 w-16 bg-slate-300 rounded-lg" />
            <div className="h-3 w-32 bg-slate-100 rounded" />
          </div>
        ))}
      </div>

      {/* Table / Content Skeleton */}
      <div className="bg-white rounded-3xl border border-[#D5E8D0] p-6 space-y-4 shadow-sm">
        <div className="flex justify-between items-center pb-4 border-b border-slate-100">
          <div className="h-6 w-40 bg-slate-200 rounded-lg" />
          <div className="h-9 w-64 bg-slate-100 rounded-xl" />
        </div>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-14 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between px-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-200 rounded-full" />
                <div className="space-y-1">
                  <div className="h-4 w-36 bg-slate-200 rounded" />
                  <div className="h-3 w-24 bg-slate-100 rounded" />
                </div>
              </div>
              <div className="h-8 w-20 bg-[#EBF4E7] rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
