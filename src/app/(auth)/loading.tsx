export default function AuthLoading() {
  return (
    <main className="min-h-screen bg-[#FAFAF7] font-sans flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md bg-white rounded-3xl border border-[#D5E8D0] p-8 shadow-xl space-y-6 animate-pulse">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 bg-slate-100 rounded-2xl mx-auto" />
          <div className="h-8 w-48 bg-slate-200 rounded-xl mx-auto" />
          <div className="h-4 w-64 bg-slate-100 rounded-md mx-auto" />
        </div>

        <div className="space-y-4 pt-4">
          <div className="space-y-2">
            <div className="h-4 w-20 bg-slate-200 rounded" />
            <div className="h-12 w-full bg-slate-100 rounded-xl" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-24 bg-slate-200 rounded" />
            <div className="h-12 w-full bg-slate-100 rounded-xl" />
          </div>
          <div className="h-12 w-full bg-[#0B4F42]/30 rounded-xl mt-6" />
        </div>
      </div>
    </main>
  );
}
