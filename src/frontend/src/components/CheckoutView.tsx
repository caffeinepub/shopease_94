import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import type { CartItem, Product } from "../backend.d";

interface CheckoutViewProps {
  cartItems: CartItem[];
  products: Product[];
  onOrderPlaced: (orderId: number) => void;
  onBack: () => void;
}

function formatPrice(cents: number) {
  return `\u20b9${(cents / 100).toFixed(0)}`;
}

export default function CheckoutView({
  cartItems,
  products,
  onOrderPlaced,
  onBack,
}: CheckoutViewProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const getProduct = (id: number) => products.find((p) => p.id === id);

  const subtotal = cartItems.reduce((sum, item) => {
    const p = getProduct(item.productId);
    return sum + (p ? p.priceCents * item.quantity : 0);
  }, 0);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (!name.trim() || !email.trim() || !phone.trim() || !address.trim())
      return;
    onOrderPlaced(Date.now());
  };

  const showNameError = submitted && !name.trim();
  const showEmailError = submitted && !email.trim();
  const showPhoneError = submitted && !phone.trim();
  const showAddressError = submitted && !address.trim();

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={onBack}
          data-ocid="checkout.link"
          className="flex items-center gap-1 text-muted-foreground hover:text-foreground text-sm mb-8 transition-colors"
        >
          <ChevronLeft className="h-4 w-4" /> Back to Shop
        </button>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display font-bold text-3xl uppercase tracking-tight mb-10"
        >
          Checkout
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-2"
          >
            <form onSubmit={handlePlaceOrder} className="space-y-6">
              {/* Full Name */}
              <div className="space-y-2">
                <Label
                  htmlFor="full-name"
                  className="uppercase text-xs tracking-wider font-semibold"
                >
                  Full Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="full-name"
                  data-ocid="checkout.input"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className={`rounded-none text-sm ${showNameError ? "border-destructive" : "border-border"}`}
                />
                {showNameError && (
                  <p
                    className="text-destructive text-xs"
                    data-ocid="checkout.error_state"
                  >
                    Please enter your full name.
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="uppercase text-xs tracking-wider font-semibold"
                >
                  Email <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  data-ocid="checkout.input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. rahul@example.com"
                  className={`rounded-none text-sm ${showEmailError ? "border-destructive" : "border-border"}`}
                />
                {showEmailError && (
                  <p
                    className="text-destructive text-xs"
                    data-ocid="checkout.error_state"
                  >
                    Please enter your email address.
                  </p>
                )}
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <Label
                  htmlFor="phone"
                  className="uppercase text-xs tracking-wider font-semibold"
                >
                  Phone Number <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="phone"
                  data-ocid="checkout.input"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +91 98765 43210"
                  className={`rounded-none text-sm ${showPhoneError ? "border-destructive" : "border-border"}`}
                />
                {showPhoneError && (
                  <p
                    className="text-destructive text-xs"
                    data-ocid="checkout.error_state"
                  >
                    Please enter your phone number.
                  </p>
                )}
              </div>

              {/* Delivery Address */}
              <div className="space-y-2">
                <Label
                  htmlFor="delivery-address"
                  className="uppercase text-xs tracking-wider font-semibold"
                >
                  Delivery Address <span className="text-destructive">*</span>
                </Label>
                <p className="text-muted-foreground text-xs">
                  Enter your full address including street, city, state and PIN
                  code.
                </p>
                <Textarea
                  id="delivery-address"
                  data-ocid="checkout.textarea"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. 12, MG Road, Koramangala, Bengaluru, Karnataka - 560034"
                  rows={5}
                  className={`rounded-none resize-none text-sm ${showAddressError ? "border-destructive" : "border-border"}`}
                />
                {showAddressError && (
                  <p
                    className="text-destructive text-xs"
                    data-ocid="checkout.error_state"
                  >
                    Please enter your delivery address to continue.
                  </p>
                )}
              </div>

              <Button
                type="submit"
                data-ocid="checkout.confirm_button"
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold uppercase tracking-widest rounded-none px-10 py-6 text-sm"
              >
                Place Order
              </Button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-card border border-border rounded-sm p-6 sticky top-24">
              <h3 className="font-display font-bold uppercase tracking-wider text-sm mb-5">
                Order Summary
              </h3>
              <div className="space-y-3 mb-4">
                {cartItems.map((item) => {
                  const p = getProduct(item.productId);
                  if (!p) return null;
                  return (
                    <div
                      key={item.productId}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-muted-foreground line-clamp-1 flex-1 pr-2">
                        {p.name} x{item.quantity}
                      </span>
                      <span className="font-medium flex-shrink-0">
                        {formatPrice(p.priceCents * item.quantity)}
                      </span>
                    </div>
                  );
                })}
              </div>
              <Separator className="my-4" />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="flex justify-between font-display font-bold text-lg">
                <span>Total</span>
                <span className="text-accent">{formatPrice(subtotal)}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
