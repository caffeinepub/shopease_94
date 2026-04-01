import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ShippingInfo {
    zip: string;
    country: string;
    city: string;
    name: string;
    email: string;
    address: string;
}
export interface CartItem {
    productId: number;
    quantity: number;
}
export type Cart = Array<CartItem>;
export interface Order {
    id: number;
    paymentCardLast4: number;
    cart: Array<CartItem>;
    totalPriceCents: number;
    shippingInfo: ShippingInfo;
}
export interface Product {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    category: string;
    priceCents: number;
}
export interface backendInterface {
    addItemToCart(cartKey: string, productId: number, quantity: number): Promise<void>;
    clearCart(cartKey: string): Promise<void>;
    getCart(cartKey: string): Promise<Cart>;
    getOrder(orderId: number): Promise<Order | null>;
    getProduct(id: number): Promise<Product | null>;
    listProducts(): Promise<Array<Product>>;
    placeOrder(cartKey: string, shippingInfo: ShippingInfo, paymentCardLast4: number): Promise<number>;
    removeItemFromCart(cartKey: string, productId: number): Promise<void>;
    updateCartItem(cartKey: string, productId: number, quantity: number): Promise<void>;
}
