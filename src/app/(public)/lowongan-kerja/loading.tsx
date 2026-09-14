export default function LowonganKerjaLoading() {
  return (
    <main className="min-h-screen bg-[#FAFAF7] font-sans pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-pulse">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="h-4 w-32 bg-[#EBF4E7] rounded-full mx-auto" />
          <div className="h-10 w-80 bg-slate-200 rounded-2xl mx-auto" />
          <div className="h-4 w-full bg-slate-100 rounded-xl" />
        </div>

        <div className="space-y-4 max-w-4xl mx-auto">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-[#D5E8D0] p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="space-y-2 flex-1">
                <div className="h-6 w-2/3 bg-slate-200 rounded-lg" />
                <div className="h-4 w-1/3 bg-slate-100 rounded-md" />
                <div className="flex gap-2 pt-1">
                  <div className="h-5 w-20 bg-[#EBF4E7] rounded-md" />
                  <div className="h-5 w-24 bg-slate-100 rounded-md" />
                </div>
              </div>
              <div className="h-10 w-32 bg-[#EBF4E7] rounded-xl shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
