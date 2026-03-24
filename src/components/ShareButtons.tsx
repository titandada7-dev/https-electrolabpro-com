import { MessageCircle } from "lucide-react";

const ShareButtons = () => {
  const siteUrl = "https://electrolabpro.com";
  const message = encodeURIComponent(
    `¡Mirá esta herramienta técnica que encontré en ElectroLab Pro! Me ahorró mucho tiempo: ${siteUrl}`
  );

  return (
    <div className="flex items-center gap-2 mt-4">
      <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Compartir:</span>
      <a
        href={`https://wa.me/?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 px-2 py-1 rounded text-[10px] font-semibold border border-[hsl(142_70%_40%)] text-[hsl(142_70%_40%)] bg-transparent transition-all duration-200 hover:bg-[hsl(142_70%_45%)] hover:text-white"
        aria-label="Compartir en WhatsApp"
      >
        <MessageCircle className="w-3 h-3" />
        WhatsApp
      </a>
      <a
        href={`https://twitter.com/intent/tweet?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 px-2 py-1 rounded text-[10px] font-semibold border border-muted-foreground/40 text-muted-foreground bg-transparent transition-all duration-200 hover:bg-foreground hover:text-background"
        aria-label="Compartir en X"
      >
        𝕏
      </a>
    </div>
  );
};

export default ShareButtons;
