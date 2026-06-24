'use client';

export default function LoadingSkeleton() {
  return (
    <div className="mt-10 card p-6 sm:p-8 animate-scale-in">
      <div className="space-y-4">
        {/* Shimmer Image Area */}
        <div className="shimmer-bg h-72 w-full rounded-xl" />
        
        {/* Shimmer Text Lines */}
        <div className="space-y-2">
          <div className="shimmer-bg h-3.5 w-3/4 rounded" />
          <div className="shimmer-bg h-3.5 w-1/2 rounded" />
        </div>
      </div>
      
      {/* Loading message */}
      <div className="text-center mt-8 space-y-2">
        <div className="flex items-center justify-center gap-1.5 text-muted text-sm font-medium tracking-wide">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-terracotta opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-terracotta"></span>
          </span>
          Rendering architectural visualization
        </div>
        <p className="text-xs text-muted/70 font-light">
          This takes about 15–30 seconds. Generating photorealistic lighting details...
        </p>
      </div>
    </div>
  );
}
