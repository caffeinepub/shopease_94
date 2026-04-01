import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, Package } from "lucide-react";
import { motion } from "motion/react";

interface OrderConfirmationProps {
  orderId: number;
  onContinueShopping: () => void;
}

export default function OrderConfirmation({
  orderId,
  onContinueShopping,
}: OrderConfirmationProps) {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-background py-20 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-lg w-full text-center"
        data-ocid="confirmation.panel"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-accent/10 mb-8"
        >
          <CheckCircle2 className="h-14 w-14 text-accent" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h1 className="font-display font-extrabold text-4xl uppercase tracking-tight mb-3">
            Order Confirmed!
          </h1>
          <p className="text-muted-foreground text-lg mb-6">
            Thank you for your purchase. Your order has been placed
            successfully.
          </p>

          <div className="bg-card border border-border rounded-sm p-6 mb-8 text-left">
            <div className="flex items-center gap-3 mb-4">
              <Package className="h-5 w-5 text-accent" />
              <span className="font-display font-semibold uppercase tracking-wider text-sm">
                Order Details
              </span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Order ID</span>
                <span className="font-mono font-bold text-foreground">
                  #{orderId}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status</span>
                <span className="text-accent font-semibold">Processing</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Estimated Delivery
                </span>
                <span className="font-medium">5-7 Business Days</span>
              </div>
            </div>
          </div>

          <Button
            onClick={onContinueShopping}
            data-ocid="confirmation.primary_button"
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold uppercase tracking-widest rounded-none px-10 py-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Continue Shopping
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
