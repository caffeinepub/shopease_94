import { useCallback, useEffect, useState } from "react";
import type { CartItem } from "../backend.d";

const CART_KEY = "shopease_cart_items";

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>(loadCart);

  useEffect(() => {
    saveCart(cartItems);
  }, [cartItems]);

  const addToCart = useCallback((productId: number, quantity: number) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.productId === productId);
      if (existing) {
        return prev.map((i) =>
          i.productId === productId
            ? { ...i, quantity: Math.min(10, i.quantity + quantity) }
            : i,
        );
      }
      return [...prev, { productId, quantity }];
    });
  }, []);

  const updateCartItem = useCallback((productId: number, quantity: number) => {
    setCartItems((prev) =>
      prev.map((i) => (i.productId === productId ? { ...i, quantity } : i)),
    );
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setCartItems((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  return { cartItems, addToCart, updateCartItem, removeFromCart, clearCart };
}
