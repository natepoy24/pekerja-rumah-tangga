export default function ArtikelCatalogLoading() {
  return (
    <main className="min-h-screen bg-[#FAFAF7] font-sans pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-pulse">
        {/* Header Title Skeleton */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="h-4 w-32 bg-[#EBF4E7] rounded-full mx-auto" />
          <div className="h-10 w-80 bg-slate-200 rounded-2xl mx-auto" />
          <div className="h-4 w-full bg-slate-100 rounded-xl" />
        </div>

        {/* Featured Article Skeleton */}
        <div className="bg-white rounded-3xl border border-[#D5E8D0] p-6 md:p-8 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 aspect-video bg-slate-100 rounded-2xl" />
          <div className="lg:col-span-5 space-y-4 flex flex-col justify-center">
            <div className="h-4 w-24 bg-[#EBF4E7] rounded-full" />
            <div className="h-8 w-full bg-slate-200 rounded-xl" />
            <div className="h-4 w-full bg-slate-100 rounded" />
            <div className="h-4 w-3/4 bg-slate-100 rounded" />
            <div className="h-6 w-36 bg-slate-200 rounded-lg pt-2" />
          </div>
        </div>

        {/* Articles Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-[#D5E8D0] p-5 shadow-sm space-y-4">
              <div className="aspect-video w-full bg-slate-100 rounded-xl" />
              <div className="h-4 w-20 bg-[#EBF4E7] rounded-full" />
              <div className="h-6 w-full bg-slate-200 rounded-lg" />
              <div className="h-4 w-3/4 bg-slate-100 rounded" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
