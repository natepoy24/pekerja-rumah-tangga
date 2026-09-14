export default function LayananLoading() {
  return (
    <main className="min-h-screen bg-[#FAFAF7] font-sans pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-pulse">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="h-4 w-32 bg-[#EBF4E7] rounded-full mx-auto" />
          <div className="h-10 w-80 bg-slate-200 rounded-2xl mx-auto" />
          <div className="h-4 w-full bg-slate-100 rounded-xl" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-3xl border border-[#D5E8D0] p-6 shadow-sm space-y-4">
              <div className="aspect-[4/3] w-full bg-slate-100 rounded-2xl" />
              <div className="h-7 w-3/4 bg-slate-200 rounded-xl" />
              <div className="h-4 w-full bg-slate-100 rounded" />
              <div className="h-4 w-5/6 bg-slate-100 rounded" />
              <div className="h-10 w-full bg-[#EBF4E7] rounded-xl pt-2" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
