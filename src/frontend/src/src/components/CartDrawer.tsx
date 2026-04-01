import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { CartItem, Product } from "../backend.d";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  products: Product[];
  onCheckout: () => void;
  onContinueShopping: () => void;
  onUpdateItem: (productId: number, quantity: number) => void;
  onRemoveItem: (productId: number) => void;
}

function formatPrice(cents: number) {
  return `₹${(cents / 100).toFixed(0)}`;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  products,
  onCheckout,
  onContinueShopping,
  onUpdateItem,
  onRemoveItem,
}: CartDrawerProps) {
  const getProduct = (id: number) => products.find((p) => p.id === id);

  const subtotal = cartItems.reduce((sum, item) => {
    const p = getProduct(item.productId);
    return sum + (p ? p.priceCents * item.quantity : 0);
  }, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/50"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.aside
            key="drawer"
            data-ocid="cart.panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full sm:w-[420px] bg-background z-50 flex flex-col shadow-2xl"
            aria-label="Shopping cart"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-accent" />
                <h2 className="font-display font-bold text-lg uppercase tracking-wider">
                  Your Cart
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                data-ocid="cart.close_button"
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
                aria-label="Close cart"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {cartItems.length === 0 ? (
              <div
                className="flex-1 flex flex-col items-center justify-center text-center px-6"
                data-ocid="cart.empty_state"
              >
                <ShoppingBag className="h-16 w-16 text-border mb-4" />
                <p className="font-display font-semibold text-lg mb-1">
                  Your cart is empty
                </p>
                <p className="text-muted-foreground text-sm mb-6">
                  Add some products to get started.
                </p>
                <Button
                  onClick={onContinueShopping}
                  data-ocid="cart.secondary_button"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground uppercase tracking-widest text-xs rounded-none px-6"
                >
                  Start Shopping
                </Button>
              </div>
            ) : (
              <>
                <ScrollArea className="flex-1 px-6 py-4">
                  <div className="space-y-4">
                    {cartItems.map((item, idx) => {
                      const product = getProduct(item.productId);
                      if (!product) return null;
                      return (
                        <div
                          key={item.productId}
                          data-ocid={`cart.item.${idx + 1}`}
                          className="flex gap-3"
                        >
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-20 h-20 object-cover rounded-sm flex-shrink-0 bg-muted"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-display font-semibold text-sm uppercase tracking-wide line-clamp-1">
                              {product.name}
                            </p>
                            <p className="text-accent font-bold text-sm mt-0.5">
                              {formatPrice(product.priceCents)}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <button
                                type="button"
                                onClick={() =>
                                  item.quantity > 1
                                    ? onUpdateItem(
                                        item.productId,
                                        item.quantity - 1,
                                      )
                                    : onRemoveItem(item.productId)
                                }
                                data-ocid={`cart.toggle.${idx + 1}`}
                                className="w-6 h-6 flex items-center justify-center border border-border hover:border-primary transition-colors rounded-sm"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="text-sm font-semibold w-6 text-center">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  onUpdateItem(
                                    item.productId,
                                    item.quantity + 1,
                                  )
                                }
                                data-ocid={`cart.toggle.${idx + 1}`}
                                className="w-6 h-6 flex items-center justify-center border border-border hover:border-primary transition-colors rounded-sm"
                                aria-label="Increase quantity"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                              <button
                                type="button"
                                onClick={() => onRemoveItem(item.productId)}
                                data-ocid={`cart.delete_button.${idx + 1}`}
                                className="ml-auto text-muted-foreground hover:text-destructive transition-colors"
                                aria-label="Remove item"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </ScrollArea>

                <div className="px-6 py-5 border-t border-border space-y-4">
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground uppercase tracking-wider">
                      Subtotal
                    </span>
                    <span className="font-display font-bold text-xl">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Shipping & taxes calculated at checkout
                  </p>
                  <Button
                    onClick={onCheckout}
                    data-ocid="cart.primary_button"
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold uppercase tracking-widest text-sm rounded-none py-6"
                  >
                    Checkout — {formatPrice(subtotal)}
                  </Button>
                  <button
                    type="button"
                    onClick={onContinueShopping}
                    data-ocid="cart.secondary_button"
                    className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
                  >
                    Continue Shopping
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
