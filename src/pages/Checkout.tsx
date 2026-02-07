import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, CreditCard, MapPin, Truck, Package, ArrowLeft, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { useCart } from '@/context/CartContext';
import { products } from '@/data/products';
import { cn } from '@/lib/utils';

const steps = [
  { id: 'address', label: 'Address', icon: MapPin },
  { id: 'delivery', label: 'Delivery', icon: Truck },
  { id: 'payment', label: 'Payment', icon: CreditCard },
  { id: 'review', label: 'Review', icon: Package }
];

const Checkout: React.FC = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Form states
  const [address, setAddress] = useState({
    name: '',
    phone: '',
    email: '',
    street: '',
    city: '',
    state: '',
    pincode: ''
  });
  const [deliverySlot, setDeliverySlot] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('cod');

  const getProductDetails = (productId: string) => {
    return products.find(p => p.id === productId);
  };

  const deliveryFee = cartTotal >= 999 ? 0 : 99;
  const expressDeliveryFee = deliverySlot === 'express' ? 99 : 0;
  const finalTotal = cartTotal + deliveryFee + expressDeliveryFee;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg mx-auto text-center"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/10 flex items-center justify-center">
              <Check className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="font-serif text-3xl font-bold mb-4">Order Placed Successfully!</h1>
            <p className="text-muted-foreground mb-2">
              Thank you for your order. We'll send you a confirmation email shortly.
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              Order ID: #BS{Date.now().toString().slice(-8)}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/track-order" className="btn-premium-outline">
                Track Order
              </Link>
              <Link to="/shop" className="btn-premium">
                Continue Shopping
              </Link>
            </div>
          </motion.div>
        </div>
      </Layout>
    );
  }

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={[
          { label: 'Cart', href: '/cart' },
          { label: 'Checkout' }
        ]} />

        <h1 className="font-serif text-3xl font-bold mt-6 mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Stepper */}
            <div className="flex items-center justify-between mb-8">
              {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                        index <= currentStep
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {index < currentStep ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        <step.icon className="h-5 w-5" />
                      )}
                    </div>
                    <span className="text-xs mt-2 hidden sm:block">{step.label}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={cn(
                        "flex-1 h-0.5 mx-2",
                        index < currentStep ? "bg-primary" : "bg-muted"
                      )}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Step Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="premium-card p-6"
              >
                {/* Address Step */}
                {currentStep === 0 && (
                  <div className="space-y-4">
                    <h2 className="font-serif text-xl font-semibold mb-4">Delivery Address</h2>
                    
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-1 block">Full Name</label>
                        <input
                          type="text"
                          value={address.name}
                          onChange={(e) => setAddress({ ...address, name: e.target.value })}
                          className="w-full px-4 py-2 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Phone Number</label>
                        <input
                          type="tel"
                          value={address.phone}
                          onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                          className="w-full px-4 py-2 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-1 block">Email</label>
                      <input
                        type="email"
                        value={address.email}
                        onChange={(e) => setAddress({ ...address, email: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-1 block">Street Address</label>
                      <input
                        type="text"
                        value={address.street}
                        onChange={(e) => setAddress({ ...address, street: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="123 Sweet Lane"
                      />
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-1 block">City</label>
                        <input
                          type="text"
                          value={address.city}
                          onChange={(e) => setAddress({ ...address, city: e.target.value })}
                          className="w-full px-4 py-2 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="Delhi"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">State</label>
                        <input
                          type="text"
                          value={address.state}
                          onChange={(e) => setAddress({ ...address, state: e.target.value })}
                          className="w-full px-4 py-2 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="Delhi"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Pincode</label>
                        <input
                          type="text"
                          value={address.pincode}
                          onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                          className="w-full px-4 py-2 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="110006"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Delivery Step */}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <h2 className="font-serif text-xl font-semibold mb-4">Delivery Slot</h2>
                    
                    <div className="space-y-3">
                      <label
                        className={cn(
                          "flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-colors",
                          deliverySlot === 'standard'
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-muted-foreground"
                        )}
                      >
                        <input
                          type="radio"
                          name="delivery"
                          value="standard"
                          checked={deliverySlot === 'standard'}
                          onChange={(e) => setDeliverySlot(e.target.value)}
                          className="sr-only"
                        />
                        <div className="flex-1">
                          <p className="font-medium">Standard Delivery</p>
                          <p className="text-sm text-muted-foreground">3-5 business days</p>
                        </div>
                        <span className="font-medium">{deliveryFee === 0 ? 'Free' : `₹${deliveryFee}`}</span>
                      </label>

                      <label
                        className={cn(
                          "flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-colors",
                          deliverySlot === 'express'
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-muted-foreground"
                        )}
                      >
                        <input
                          type="radio"
                          name="delivery"
                          value="express"
                          checked={deliverySlot === 'express'}
                          onChange={(e) => setDeliverySlot(e.target.value)}
                          className="sr-only"
                        />
                        <div className="flex-1">
                          <p className="font-medium">Express Delivery</p>
                          <p className="text-sm text-muted-foreground">Same day (Delhi NCR only)</p>
                        </div>
                        <span className="font-medium">₹{99 + deliveryFee}</span>
                      </label>
                    </div>
                  </div>
                )}

                {/* Payment Step */}
                {currentStep === 2 && (
                  <div className="space-y-4">
                    <h2 className="font-serif text-xl font-semibold mb-4">Payment Method</h2>
                    
                    <div className="space-y-3">
                      {[
                        { id: 'upi', label: 'UPI', desc: 'Google Pay, PhonePe, Paytm' },
                        { id: 'card', label: 'Credit/Debit Card', desc: 'Visa, Mastercard, RuPay' },
                        { id: 'cod', label: 'Cash on Delivery', desc: 'Pay when you receive' }
                      ].map((method) => (
                        <label
                          key={method.id}
                          className={cn(
                            "flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-colors",
                            paymentMethod === method.id
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-muted-foreground"
                          )}
                        >
                          <input
                            type="radio"
                            name="payment"
                            value={method.id}
                            checked={paymentMethod === method.id}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="sr-only"
                          />
                          <div className="flex-1">
                            <p className="font-medium">{method.label}</p>
                            <p className="text-sm text-muted-foreground">{method.desc}</p>
                          </div>
                          <div className={cn(
                            "w-5 h-5 rounded-full border-2",
                            paymentMethod === method.id
                              ? "border-primary bg-primary"
                              : "border-muted-foreground"
                          )}>
                            {paymentMethod === method.id && (
                              <Check className="h-4 w-4 text-primary-foreground m-auto" />
                            )}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Review Step */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <h2 className="font-serif text-xl font-semibold">Review Your Order</h2>
                    
                    <div className="space-y-4">
                      <div className="p-4 bg-muted rounded-lg">
                        <h3 className="font-medium mb-2">Delivery Address</h3>
                        <p className="text-sm text-muted-foreground">
                          {address.name}<br />
                          {address.street}<br />
                          {address.city}, {address.state} - {address.pincode}<br />
                          {address.phone}
                        </p>
                      </div>

                      <div className="p-4 bg-muted rounded-lg">
                        <h3 className="font-medium mb-2">Delivery</h3>
                        <p className="text-sm text-muted-foreground">
                          {deliverySlot === 'express' ? 'Express Delivery (Same day)' : 'Standard Delivery (3-5 days)'}
                        </p>
                      </div>

                      <div className="p-4 bg-muted rounded-lg">
                        <h3 className="font-medium mb-2">Payment Method</h3>
                        <p className="text-sm text-muted-foreground">
                          {paymentMethod === 'upi' ? 'UPI' : paymentMethod === 'card' ? 'Credit/Debit Card' : 'Cash on Delivery'}
                        </p>
                      </div>

                      <div className="border-t border-border pt-4">
                        <h3 className="font-medium mb-3">Items ({cart.length})</h3>
                        <div className="space-y-2">
                          {cart.map((item) => {
                            const product = getProductDetails(item.productId);
                            if (!product) return null;
                            return (
                              <div key={`${item.productId}-${item.weight}`} className="flex justify-between text-sm">
                                <span>{product.name} ({item.weight}) × {item.quantity}</span>
                                <span>₹{item.price * item.quantity}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex justify-between mt-8 pt-6 border-t border-border">
                  <button
                    onClick={handleBack}
                    disabled={currentStep === 0}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors",
                      currentStep === 0
                        ? "text-muted-foreground cursor-not-allowed"
                        : "hover:bg-muted"
                    )}
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </button>

                  {currentStep < steps.length - 1 ? (
                    <button onClick={handleNext} className="btn-premium">
                      Continue
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  ) : (
                    <button onClick={handlePlaceOrder} className="btn-gold">
                      Place Order
                      <Check className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="premium-card p-6 sticky top-24">
              <h2 className="font-serif text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-3 text-sm max-h-48 overflow-y-auto mb-4">
                {cart.map((item) => {
                  const product = getProductDetails(item.productId);
                  if (!product) return null;
                  return (
                    <div key={`${item.productId}-${item.weight}`} className="flex gap-3">
                      <div className="w-12 h-12 rounded-lg bg-muted overflow-hidden shrink-0">
                        <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{product.name}</p>
                        <p className="text-muted-foreground text-xs">{item.weight} × {item.quantity}</p>
                      </div>
                      <span>₹{item.price * item.quantity}</span>
                    </div>
                  );
                })}
              </div>

              <div className="space-y-2 text-sm border-t border-border pt-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{cartTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery</span>
                  <span>{deliveryFee + expressDeliveryFee === 0 ? 'Free' : `₹${deliveryFee + expressDeliveryFee}`}</span>
                </div>
              </div>

              <div className="flex justify-between font-semibold text-lg border-t border-border pt-4 mt-4">
                <span>Total</span>
                <span>₹{finalTotal}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
