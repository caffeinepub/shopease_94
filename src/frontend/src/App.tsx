import { Toaster } from "@/components/ui/sonner";
import { useCallback, useMemo, useState } from "react";
import CartDrawer from "./components/CartDrawer";
import CheckoutView from "./components/CheckoutView";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HeroBanner from "./components/HeroBanner";
import OrderConfirmation from "./components/OrderConfirmation";
import ProductGrid from "./components/ProductGrid";
import { STATIC_PRODUCTS } from "./data/products";
import { useCart } from "./hooks/useCart";

type View = "shop" | "checkout" | "confirmation";

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [view, setView] = useState<View>("shop");
  const [orderId, setOrderId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const products = STATIC_PRODUCTS;
  const { cartItems, addToCart, updateCartItem, removeFromCart, clearCart } =
    useCart();

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  );

  const handleOpenCart = useCallback(() => setIsCartOpen(true), []);
  const handleCloseCart = useCallback(() => setIsCartOpen(false), []);
  const handleGoToCheckout = useCallback(() => {
    setIsCartOpen(false);
    setView("checkout");
  }, []);
  const handleOrderPlaced = useCallback(
    (id: number) => {
      setOrderId(id);
      setView("confirmation");
      clearCart();
    },
    [clearCart],
  );
  const handleContinueShopping = useCallback(() => {
    setView("shop");
    setIsCartOpen(false);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Toaster />
      <Header
        cartCount={cartCount}
        onCartClick={handleOpenCart}
        onLogoClick={handleContinueShopping}
      />

      {view === "shop" && (
        <main>
          <HeroBanner
            onShopClick={() =>
              document
                .getElementById("products")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          />
          <ProductGrid
            products={products}
            isLoading={false}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            onCartOpen={handleOpenCart}
            onAddToCart={addToCart}
          />
        </main>
      )}

      {view === "checkout" && (
        <main className="flex-1">
          <CheckoutView
            cartItems={cartItems}
            products={products}
            onOrderPlaced={handleOrderPlaced}
            onBack={handleContinueShopping}
          />
        </main>
      )}

      {view === "confirmation" && orderId !== null && (
        <main className="flex-1">
          <OrderConfirmation
            orderId={orderId}
            onContinueShopping={handleContinueShopping}
          />
        </main>
      )}

      <Footer />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={handleCloseCart}
        cartItems={cartItems}
        products={products}
        onCheckout={handleGoToCheckout}
        onContinueShopping={handleCloseCart}
        onUpdateItem={updateCartItem}
        onRemoveItem={removeFromCart}
      />
    </div>
  );
}
