const AdBanner = ({ className = "", orientation = "horizontal" }: { className?: string; orientation?: "horizontal" | "vertical" }) => {
  return (
    <div
      className={`flex items-center justify-center border border-dashed border-border rounded-lg bg-muted/30 text-muted-foreground text-sm font-mono ${
        orientation === "vertical" ? "min-h-[400px] w-full p-4" : "h-20 w-full p-2"
      } ${className}`}
    >
      <span className="opacity-50">📢 Espacio Publicitario — AdSense</span>
    </div>
  );
};

export default AdBanner;
