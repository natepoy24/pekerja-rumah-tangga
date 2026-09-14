export default function PekerjaCatalogLoading() {
  return (
    <main className="min-h-screen bg-[#FAFAF7] font-sans pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-pulse">
        {/* Header Title Skeleton */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="h-4 w-32 bg-[#EBF4E7] rounded-full mx-auto" />
          <div className="h-10 w-80 bg-slate-200 rounded-2xl mx-auto" />
          <div className="h-4 w-full bg-slate-100 rounded-xl" />
        </div>

        {/* Category Tabs Skeleton */}
        <div className="flex flex-wrap justify-center gap-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-10 w-32 bg-white rounded-full border border-[#D5E8D0]" />
          ))}
        </div>

        {/* Filter Bar Skeleton */}
        <div className="bg-white p-4 rounded-2xl border border-[#D5E8D0] shadow-sm flex flex-col md:flex-row gap-4 justify-between">
          <div className="h-10 w-full md:w-96 bg-slate-100 rounded-xl" />
          <div className="h-10 w-full md:w-48 bg-slate-100 rounded-xl" />
        </div>

        {/* Workers Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-[#D5E8D0] shadow-sm overflow-hidden flex flex-col p-5 space-y-4">
              <div className="w-full aspect-[4/3] bg-slate-100 rounded-xl relative overflow-hidden">
                <div className="absolute top-3 left-3 h-6 w-24 bg-slate-200 rounded-full" />
                <div className="absolute top-3 right-3 h-6 w-20 bg-[#EBF4E7] rounded-full" />
              </div>
              <div className="space-y-2">
                <div className="h-6 w-3/4 bg-slate-200 rounded-lg" />
                <div className="h-4 w-1/2 bg-slate-100 rounded-md" />
              </div>
              <div className="flex gap-2 pt-2">
                <div className="h-6 w-24 bg-slate-100 rounded-md" />
                <div className="h-6 w-28 bg-[#EBF4E7] rounded-md" />
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="h-5 w-28 bg-slate-200 rounded-md" />
                <div className="h-8 w-24 bg-[#EBF4E7] rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
