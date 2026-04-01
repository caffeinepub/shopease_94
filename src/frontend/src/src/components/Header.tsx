import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, ShoppingCart, User } from "lucide-react";

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  onLogoClick: () => void;
}

const NAV_ITEMS = ["Home", "Shop", "Furniture", "Lighting", "Accessories"];

export default function Header({
  cartCount,
  onCartClick,
  onLogoClick,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full bg-background border-b border-border shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            type="button"
            onClick={onLogoClick}
            data-ocid="header.link"
            className="flex flex-col leading-none group"
          >
            <span className="font-display font-extrabold text-xl uppercase tracking-widest text-primary group-hover:text-accent transition-colors">
              URBAN
            </span>
            <span className="font-display text-sm uppercase tracking-widest text-muted-foreground">
              ESTÚDIO
            </span>
          </button>

          <nav
            className="hidden md:flex items-center gap-6"
            aria-label="Main navigation"
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                type="button"
                onClick={onLogoClick}
                data-ocid="header.link"
                className={`text-sm font-medium uppercase tracking-wider transition-colors ${
                  item === "Shop"
                    ? "text-foreground border-b-2 border-accent pb-0.5"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:flex"
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:flex"
              aria-label="Account"
            >
              <User className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onCartClick}
              data-ocid="header.button"
              className="relative"
              aria-label="Open cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-accent text-accent-foreground border-0">
                  {cartCount}
                </Badge>
              )}
            </Button>
            <span className="hidden sm:inline text-xs text-muted-foreground">
              {cartCount} {cartCount === 1 ? "item" : "items"}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
