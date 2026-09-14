export default function GlobalLoading() {
  return (
    <div className="min-h-screen bg-[#FAFAF7] font-sans pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-pulse">
      {/* Header Banner Skeleton */}
      <div className="bg-white rounded-3xl p-8 border border-[#D5E8D0] shadow-sm space-y-4">
        <div className="h-4 w-32 bg-[#EBF4E7] rounded-full" />
        <div className="h-10 w-2/3 bg-slate-200 rounded-2xl" />
        <div className="h-5 w-1/2 bg-slate-100 rounded-xl" />
      </div>

      {/* Grid Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-2xl p-6 border border-[#D5E8D0] shadow-sm space-y-4">
            <div className="aspect-[4/3] w-full bg-slate-100 rounded-xl" />
            <div className="h-6 w-3/4 bg-slate-200 rounded-lg" />
            <div className="h-4 w-1/2 bg-slate-100 rounded-md" />
            <div className="h-10 w-full bg-[#EBF4E7] rounded-xl mt-4" />
          </div>
        ))}
      </div>
    </div>
  );
}
