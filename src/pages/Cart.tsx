import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, X, ShoppingBag, Tag, ArrowRight } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import EmptyState from '@/components/ui/EmptyState';
import CustomToast from '@/components/ui/custom-toast';
import { useCart } from '@/context/CartContext';
import { products } from '@/data/products';
import { getPrimaryProductImage } from '@/lib/productImages';

const Cart: React.FC = () => {
  const { cart, cartTotal, updateQuantity, removeItem, clearCart } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const getProductDetails = (productId: string) => {
    return products.find(p => p.id === productId);
  };

  const handleApplyCoupon = () => {
    if (couponCode.toLowerCase() === 'sweet10') {
      setAppliedCoupon('SWEET10');
      setToastMessage('Coupon applied! 10% discount');
      setShowToast(true);
    } else {
      setToastMessage('Invalid coupon code');
      setShowToast(true);
    }
    setCouponCode('');
  };

  const discount = appliedCoupon ? cartTotal * 0.1 : 0;
  const deliveryFee = cartTotal >= 999 ? 0 : 99;
  const finalTotal = cartTotal - discount + deliveryFee;

  if (cart.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs items={[{ label: 'Cart' }]} />
          <EmptyState type="cart" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={[{ label: 'Cart' }]} />
        
        <h1 className="font-serif text-3xl font-bold mt-6 mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {cart.map((item) => {
                const product = getProductDetails(item.productId);
                if (!product) return null;

                return (
                  <motion.div
                    key={`${item.productId}-${item.weight}`}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    className="premium-card p-4 flex gap-4"
                  >
                    {/* Image */}
                    <Link to={`/product/${product.slug}`} className="shrink-0">
                      <div className="w-24 h-24 rounded-lg overflow-hidden bg-muted">
                        <img
                          src={getPrimaryProductImage(product)}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </Link>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <Link to={`/product/${product.slug}`}>
                            <h3 className="font-serif font-medium text-foreground hover:text-primary transition-colors">
                              {product.name}
                            </h3>
                          </Link>
                          <p className="text-sm text-muted-foreground">{item.weight}</p>
                        </div>
                        <button
                          onClick={() => removeItem(item.productId, item.weight)}
                          className="p-1 hover:bg-muted rounded-full transition-colors"
                        >
                          <X className="h-4 w-4 text-muted-foreground" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        {/* Quantity */}
                        <div className="inline-flex items-center border border-border rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.productId, item.weight, item.quantity - 1)}
                            className="p-2 hover:bg-muted transition-colors"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.weight, item.quantity + 1)}
                            className="p-2 hover:bg-muted transition-colors"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <p className="font-semibold">₹{item.price * item.quantity}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Clear Cart */}
            <div className="flex justify-between items-center pt-4">
              <Link to="/shop" className="text-primary hover:underline text-sm">
                Continue Shopping
              </Link>
              <button
                onClick={clearCart}
                className="text-sm text-muted-foreground hover:text-destructive transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="premium-card p-6 sticky top-24">
              <h2 className="font-serif text-xl font-semibold mb-4">Order Summary</h2>

              {/* Coupon */}
              <div className="mb-6">
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Coupon code"
                      className="w-full pl-10 pr-4 py-2 rounded-lg bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <button
                    onClick={handleApplyCoupon}
                    className="px-4 py-2 bg-foreground text-background rounded-lg text-sm font-medium hover:bg-foreground/90 transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {appliedCoupon && (
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="text-green-600">Coupon {appliedCoupon} applied!</span>
                    <button
                      onClick={() => setAppliedCoupon(null)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Remove
                    </button>
                  </div>
                )}
                <p className="text-xs text-muted-foreground mt-2">Try: SWEET10</p>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 text-sm border-t border-border pt-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{cartTotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount (10%)</span>
                    <span>-₹{discount.toFixed(0)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery</span>
                  <span>{deliveryFee === 0 ? 'Free' : `₹${deliveryFee}`}</span>
                </div>
                {deliveryFee > 0 && (
                  <p className="text-xs text-muted-foreground">
                    Add ₹{999 - cartTotal} more for free delivery
                  </p>
                )}
              </div>

              <div className="flex justify-between font-semibold text-lg border-t border-border pt-4 mt-4">
                <span>Total</span>
                <span>₹{finalTotal.toFixed(0)}</span>
              </div>

              <Link
                to="/checkout"
                className="w-full btn-premium py-3 mt-6 text-center block"
              >
                Proceed to Checkout
                <ArrowRight className="h-4 w-4 ml-2 inline" />
              </Link>

              <p className="text-xs text-muted-foreground text-center mt-4">
                Taxes calculated at checkout
              </p>
            </div>
          </div>
        </div>
      </div>

      <CustomToast
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </Layout>
  );
};

export default Cart;
