export default function PublicLoading() {
  return (
    <main className="min-h-screen bg-[#FAFAF7] font-sans pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-pulse">
        {/* Breadcrumb / Title Bar Skeleton */}
        <div className="space-y-3">
          <div className="h-4 w-28 bg-[#EBF4E7] rounded-full" />
          <div className="h-9 w-72 bg-slate-200 rounded-2xl" />
          <div className="h-4 w-96 bg-slate-100 rounded-xl" />
        </div>

        {/* Main Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-[#D5E8D0] p-5 shadow-sm space-y-4">
              <div className="w-full aspect-[4/3] bg-slate-100 rounded-xl" />
              <div className="space-y-2">
                <div className="h-6 w-3/4 bg-slate-200 rounded-lg" />
                <div className="h-4 w-1/2 bg-slate-100 rounded-md" />
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="h-5 w-24 bg-slate-200 rounded-md" />
                <div className="h-8 w-28 bg-[#EBF4E7] rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
