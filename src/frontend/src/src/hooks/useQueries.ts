import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Cart, Product, ShippingInfo } from "../backend.d";
import { useActor } from "./useActor";

export function useListProducts() {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listProducts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetCart(cartKey: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Cart>({
    queryKey: ["cart", cartKey],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCart(cartKey);
    },
    enabled: !!actor && !isFetching && !!cartKey,
  });
}

export function useAddToCart(cartKey: string) {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      productId,
      quantity,
    }: { productId: number; quantity: number }) => {
      if (!actor) throw new Error("No actor");
      await actor.addItemToCart(cartKey, productId, quantity);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cart", cartKey] }),
  });
}

export function useUpdateCartItem(cartKey: string) {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      productId,
      quantity,
    }: { productId: number; quantity: number }) => {
      if (!actor) throw new Error("No actor");
      await actor.updateCartItem(cartKey, productId, quantity);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cart", cartKey] }),
  });
}

export function useRemoveFromCart(cartKey: string) {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (productId: number) => {
      if (!actor) throw new Error("No actor");
      await actor.removeItemFromCart(cartKey, productId);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cart", cartKey] }),
  });
}

export function usePlaceOrder(cartKey: string) {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      shippingInfo,
      paymentCardLast4,
    }: {
      shippingInfo: ShippingInfo;
      paymentCardLast4: number;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.placeOrder(cartKey, shippingInfo, paymentCardLast4);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cart", cartKey] }),
  });
}
