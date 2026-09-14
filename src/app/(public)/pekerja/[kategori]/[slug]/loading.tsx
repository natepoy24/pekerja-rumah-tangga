export default function PekerjaDetailLoading() {
  return (
    <main className="min-h-screen bg-[#FAFAF7] font-sans pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-pulse">
        {/* Back Link Skeleton */}
        <div className="h-4 w-44 bg-[#EBF4E7] rounded-full" />

        {/* Profile Card Main Skeleton */}
        <div className="bg-white rounded-3xl border border-[#D5E8D0] shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 md:p-10">
          {/* Left Column: Photo */}
          <div className="lg:col-span-5 flex flex-col items-center space-y-6">
            <div className="w-full aspect-[4/5] bg-slate-100 rounded-2xl border border-slate-200" />
            <div className="w-full h-24 bg-[#EBF4E7] rounded-2xl border border-[#D5E8D0]" />
          </div>

          {/* Right Column: Info */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-6 space-y-3">
                <div className="flex justify-between items-center">
                  <div className="h-9 w-64 bg-slate-200 rounded-2xl" />
                  <div className="h-7 w-24 bg-[#EBF4E7] rounded-full" />
                </div>
                <div className="h-4 w-48 bg-slate-100 rounded-xl" />
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-16 bg-slate-100 rounded-xl p-3 space-y-1">
                    <div className="h-3 w-16 bg-slate-200 rounded" />
                    <div className="h-5 w-20 bg-slate-300 rounded" />
                  </div>
                ))}
              </div>

              {/* Skills Skeleton */}
              <div className="space-y-2">
                <div className="h-5 w-48 bg-slate-200 rounded-md" />
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-8 w-28 bg-[#EBF4E7] rounded-lg border border-[#D5E8D0]" />
                  ))}
                </div>
              </div>
            </div>

            {/* Action Bar Skeleton */}
            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between gap-4">
              <div className="h-12 w-48 bg-slate-200 rounded-xl" />
              <div className="h-12 w-full sm:w-64 bg-[#EBF4E7] rounded-xl border border-[#D5E8D0]" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
