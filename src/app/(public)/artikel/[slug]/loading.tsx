export default function ArtikelDetailLoading() {
  return (
    <main className="min-h-screen bg-[#FAFAF7] font-sans pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6 animate-pulse">
        {/* Back Link Skeleton */}
        <div className="h-4 w-44 bg-[#EBF4E7] rounded-full" />

        {/* Article Reader Box Skeleton */}
        <article className="bg-white p-6 md:p-12 rounded-3xl border border-[#D5E8D0] shadow-sm space-y-8">
          <header className="space-y-4 text-center">
            <div className="h-6 w-24 bg-[#EBF4E7] rounded-full mx-auto" />
            <div className="h-10 w-3/4 bg-slate-200 rounded-2xl mx-auto" />
            <div className="flex justify-center gap-4 pt-2">
              <div className="h-6 w-32 bg-slate-100 rounded-full" />
              <div className="h-6 w-28 bg-[#EBF4E7] rounded-full" />
            </div>
          </header>

          {/* Featured Hero Cover Image */}
          <div className="aspect-[16/9] w-full bg-slate-100 rounded-2xl border border-slate-200" />

          {/* Article Text Paragraph Skeletons */}
          <div className="space-y-4 pt-4">
            <div className="h-4 w-full bg-slate-200 rounded" />
            <div className="h-4 w-11/12 bg-slate-200 rounded" />
            <div className="h-4 w-4/5 bg-slate-200 rounded" />
            <div className="h-4 w-full bg-slate-100 rounded pt-4" />
            <div className="h-4 w-5/6 bg-slate-100 rounded" />
            <div className="h-4 w-3/4 bg-slate-100 rounded" />
          </div>
        </article>
      </div>
    </main>
  );
}
