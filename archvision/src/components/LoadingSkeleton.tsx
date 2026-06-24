export default function LoadingSkeleton() {
  return (
    <div className="mt-8 card p-6">
      <div className="animate-pulse">
        <div className="bg-border h-72 w-full mb-4" />
        <div className="bg-border h-3 w-3/4 mb-2" />
        <div className="bg-border h-3 w-1/2" />
      </div>
      <p className="text-center text-muted text-sm mt-4 font-light tracking-wide">
        Rendering your architectural concept — this takes 15–30 seconds
      </p>
    </div>
  );
}
