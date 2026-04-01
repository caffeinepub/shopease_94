import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { Product } from "../backend.d";

const SKELETON_KEYS = [
  "sk-a",
  "sk-b",
  "sk-c",
  "sk-d",
  "sk-e",
  "sk-f",
  "sk-g",
  "sk-h",
];

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  onCartOpen: () => void;
  onAddToCart: (productId: number, quantity: number) => void;
}

function formatPrice(cents: number): string {
  return `₹${(cents / 100).toFixed(0)}`;
}

function ProductCard({
  product,
  onCartOpen,
  onAddToCart,
}: {
  product: Product;
  onCartOpen: () => void;
  onAddToCart: (productId: number, quantity: number) => void;
}) {
  const [liked, setLiked] = useState(false);
  const [adding, setAdding] = useState(false);

  const handleAddToCart = () => {
    setAdding(true);
    onAddToCart(product.id, 1);
    toast.success(`${product.name} added to cart`, {
      action: { label: "View Cart", onClick: onCartOpen },
    });
    setTimeout(() => setAdding(false), 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="bg-card rounded-lg overflow-hidden group shadow-card hover:shadow-lg transition-shadow duration-300"
    >
      <div className="relative overflow-hidden aspect-[4/3] bg-muted">
        <img
          src={product.imageUrl}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3">
          <button
            type="button"
            onClick={() => setLiked((l) => !l)}
            aria-label="Add to wishlist"
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
              liked
                ? "bg-accent text-accent-foreground"
                : "bg-white/90 text-muted-foreground hover:text-accent"
            }`}
          >
            <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
          </button>
        </div>
        <div className="absolute top-3 left-3">
          <span className="bg-primary text-primary-foreground text-xs uppercase tracking-wider px-2 py-1 rounded-sm font-medium">
            {product.category}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-display font-semibold text-foreground text-sm uppercase tracking-wide mb-1 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-muted-foreground text-xs mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between gap-2">
          <span className="font-display font-bold text-lg text-foreground">
            {formatPrice(product.priceCents)}
          </span>
          <div className="flex items-center gap-2 flex-1">
            <Button
              onClick={handleAddToCart}
              disabled={adding}
              data-ocid="product.button"
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground uppercase text-xs tracking-wider rounded-none py-2 h-9 font-semibold"
            >
              <ShoppingCart className="h-3 w-3 mr-1.5" />
              {adding ? "Adding..." : "Add to Cart"}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProductGrid({
  products,
  isLoading,
  selectedCategory,
  onCategoryChange,
  onCartOpen,
  onAddToCart,
}: ProductGridProps) {
  const categories = [
    "All",
    ...Array.from(new Set(products.map((p) => p.category))),
  ];
  const filtered =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <section id="products" className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display font-bold text-4xl uppercase tracking-tight text-foreground mb-3">
            Our Collection
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Thoughtfully designed pieces for modern living spaces.
          </p>
        </motion.div>

        <div
          className="flex flex-wrap gap-2 justify-center mb-10"
          role="tablist"
          aria-label="Product categories"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={selectedCategory === cat}
              onClick={() => onCategoryChange(cat)}
              data-ocid="products.tab"
              className={`px-5 py-2 text-xs uppercase tracking-widest font-semibold border transition-colors rounded-none ${
                selectedCategory === cat
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-muted-foreground border-border hover:border-primary hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {SKELETON_KEYS.map((key) => (
              <div
                key={key}
                className="rounded-lg overflow-hidden bg-card animate-pulse"
              >
                <div className="aspect-[4/3] w-full bg-muted" />
                <div className="p-4 space-y-2">
                  <div className="h-4 w-3/4 bg-muted rounded" />
                  <div className="h-3 w-full bg-muted rounded" />
                  <div className="h-9 w-full bg-muted rounded mt-2" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">
              No products found in this category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filtered.map((product, idx) => (
              <div key={product.id} data-ocid={`products.item.${idx + 1}`}>
                <ProductCard
                  product={product}
                  onCartOpen={onCartOpen}
                  onAddToCart={onAddToCart}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
