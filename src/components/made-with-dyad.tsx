import { cn } from "@/lib/utils";

export const MadeWithDyad = () => {
  return (
    <div className="p-4 text-center">
      <a
        href="https://www.dyad.sh/"
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "text-sm transition-colors",
          "text-sidebar-foreground opacity-60 hover:opacity-100" // Usando cor da sidebar para contraste
        )}
      >
        Made with Dyad
      </a>
    </div>
  );
};