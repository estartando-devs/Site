const Shimmer = () => (
  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />
);

export const ApprovedCoursesSkeleton = () => {
  return (
    <div className="w-full rounded-[32px] border border-white/5 bg-surface-container/20 backdrop-blur-xl overflow-hidden mb-8 relative">
      <Shimmer />
      <div className="p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="flex items-start gap-6 w-full">
          {/* Trophy Placeholder */}
          <div className="w-16 h-16 rounded-2xl bg-white/5 shrink-0" />

          <div className="space-y-4 w-full max-w-[400px]">
            <div className="flex items-center gap-3">
              <div className="h-2 w-24 bg-white/10 rounded-full" />
              <div className="w-1.5 h-1.5 rounded-full bg-white/5" />
              <div className="h-2 w-20 bg-white/5 rounded-full" />
            </div>
            {/* Title Placeholder */}
            <div className="h-10 w-full bg-white/10 rounded-xl" />
          </div>
        </div>

        {/* Button Placeholder */}
        <div className="w-full md:w-48 h-14 bg-white/10 rounded-2xl shrink-0" />
      </div>
    </div>
  );
};

export const ListApprovedSkeleton = () => (
  <section className="w-full max-w-desktop_fullhd mx-auto px-8 md:px-30 py-16 flex flex-col gap-8">
    <div className="flex flex-col gap-6 mb-12 items-center text-center relative overflow-hidden">
      <div className="w-20 h-20 rounded-full bg-white/5 mb-2 relative overflow-hidden">
        <Shimmer />
      </div>
      <div className="h-14 w-full max-w-[600px] bg-white/10 rounded-2xl relative overflow-hidden">
        <Shimmer />
      </div>
      <div className="h-6 w-full max-w-[400px] bg-white/5 rounded-xl relative overflow-hidden">
        <Shimmer />
      </div>
    </div>

    <div className="flex flex-col gap-4">
      <ApprovedCoursesSkeleton />
      <ApprovedCoursesSkeleton />
      <ApprovedCoursesSkeleton />
    </div>
  </section>
);
