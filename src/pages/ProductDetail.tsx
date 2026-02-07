import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Star, Truck, Shield, Package, Minus, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import ProductCard from '@/components/product/ProductCard';
import CustomToast from '@/components/ui/custom-toast';
import { products, getProductBySlug, categories } from '@/data/products';
import { getProductImages } from '@/lib/productImages';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { addRecentlyViewed } from '@/lib/storage';
import { cn } from '@/lib/utils';

const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug || '');
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedWeight, setSelectedWeight] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    if (product) {
      addRecentlyViewed(product.id);
    }
  }, [product]);

  useEffect(() => {
    setSelectedImage(0);
  }, [product?.id]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-serif text-2xl mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist.</p>
          <Link to="/shop" className="btn-premium">
            Back to Shop
          </Link>
        </div>
      </Layout>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const currentPrice = product.weights[selectedWeight].price;
  const category = categories.find(c => c.id === product.category);
  const productImages = useMemo(() => getProductImages(product), [product]);

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      quantity,
      weight: product.weights[selectedWeight].label,
      price: currentPrice
    });
    setToastMessage(`${product.name} added to cart!`);
    setShowToast(true);
  };

  const handleToggleWishlist = () => {
    const added = toggleWishlist(product.id);
    setToastMessage(added ? 'Added to wishlist!' : 'Removed from wishlist');
    setShowToast(true);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[
          { label: 'Shop', href: '/shop' },
          { label: category?.name || product.category, href: `/shop?category=${product.category}` },
          { label: product.name }
        ]} />

        {/* Product Section */}
        <div className="mt-8 grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="aspect-square rounded-xl overflow-hidden bg-muted relative group"
            >
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              
              {/* Navigation Arrows */}
              {productImages.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImage((prev) => (prev - 1 + productImages.length) % productImages.length)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-card/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setSelectedImage((prev) => (prev + 1) % productImages.length)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-card/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </motion.div>

            {/* Thumbnails */}
            {productImages.length > 1 && (
              <div className="flex gap-3">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={cn(
                      "w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors",
                      selectedImage === index ? "border-primary" : "border-transparent hover:border-muted-foreground"
                    )}
                  >
                    <img src={image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {product.isBestSeller && <span className="badge-gold">Best Seller</span>}
              {product.isSugarFree && <span className="badge-saffron">Sugar-Free</span>}
              {product.isGiftable && <span className="badge-saffron">Perfect for Gifting</span>}
            </div>

            {/* Title & Rating */}
            <div>
              <h1 className="font-serif text-3xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-gold text-gold" />
                  <span className="font-medium">{product.rating}</span>
                </div>
                <span className="text-muted-foreground">({product.reviewsCount} reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-foreground">₹{currentPrice * quantity}</span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>

            {/* Short Description */}
            <p className="text-muted-foreground">{product.description.slice(0, 150)}...</p>

            {/* Weight Selector */}
            <div>
              <label className="text-sm font-medium mb-3 block">Select Weight</label>
              <div className="flex flex-wrap gap-3">
                {product.weights.map((weight, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedWeight(index)}
                    className={cn(
                      "px-4 py-2 rounded-lg border-2 transition-all",
                      selectedWeight === index
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-muted-foreground"
                    )}
                  >
                    <span className="font-medium">{weight.label}</span>
                    <span className="text-sm text-muted-foreground ml-2">₹{weight.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="text-sm font-medium mb-3 block">Quantity</label>
              <div className="inline-flex items-center border border-border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-muted transition-colors"
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-muted transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <button onClick={handleAddToCart} className="flex-1 btn-premium py-3">
                <ShoppingBag className="h-5 w-5" />
                Add to Cart
              </button>
              <button
                onClick={handleToggleWishlist}
                className={cn(
                  "p-3 rounded-lg border-2 transition-all",
                  inWishlist
                    ? "border-secondary bg-secondary/10 text-secondary"
                    : "border-border hover:border-muted-foreground"
                )}
              >
                <Heart className={cn("h-5 w-5", inWishlist && "fill-current")} />
              </button>
            </div>

            {/* Buy Now */}
            <Link
              to="/checkout"
              onClick={() => handleAddToCart()}
              className="block w-full btn-gold py-3 text-center"
            >
              Buy Now
            </Link>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
              <div className="text-center">
                <Truck className="h-5 w-5 mx-auto mb-2 text-primary" />
                <p className="text-xs text-muted-foreground">Free Delivery<br />Above ₹999</p>
              </div>
              <div className="text-center">
                <Shield className="h-5 w-5 mx-auto mb-2 text-primary" />
                <p className="text-xs text-muted-foreground">Quality<br />Guaranteed</p>
              </div>
              <div className="text-center">
                <Package className="h-5 w-5 mx-auto mb-2 text-primary" />
                <p className="text-xs text-muted-foreground">Fresh<br />Packaging</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-12">
          <div className="flex border-b border-border overflow-x-auto">
            {['description', 'ingredients', 'storage', 'delivery'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-6 py-3 text-sm font-medium capitalize whitespace-nowrap border-b-2 transition-colors",
                  activeTab === tab
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                {tab === 'storage' ? 'Storage & Shelf Life' : tab === 'delivery' ? 'Delivery Info' : tab}
              </button>
            ))}
          </div>
          
          <div className="py-6">
            {activeTab === 'description' && (
              <p className="text-muted-foreground max-w-3xl">{product.description}</p>
            )}
            {activeTab === 'ingredients' && (
              <p className="text-muted-foreground max-w-3xl">{product.ingredients}</p>
            )}
            {activeTab === 'storage' && (
              <div className="space-y-4 max-w-3xl">
                <div>
                  <h4 className="font-medium mb-1">Shelf Life</h4>
                  <p className="text-muted-foreground">{product.shelfLife}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Storage Instructions</h4>
                  <p className="text-muted-foreground">{product.storage}</p>
                </div>
              </div>
            )}
            {activeTab === 'delivery' && (
              <div className="space-y-4 max-w-3xl text-muted-foreground">
                <p>• Free delivery on orders above ₹999</p>
                <p>• Same-day delivery available in Delhi NCR</p>
                <p>• Standard delivery: 3-5 business days</p>
                <p>• Temperature-controlled packaging for freshness</p>
                <p>• Track your order in real-time</p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="font-serif text-2xl font-semibold mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

        {/* Mobile Sticky Bar */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-card border-t border-border lg:hidden z-40">
          <div className="flex items-center gap-4">
            <div>
              <p className="text-xs text-muted-foreground">{product.weights[selectedWeight].label}</p>
              <p className="font-bold text-lg">₹{currentPrice * quantity}</p>
            </div>
            <button onClick={handleAddToCart} className="flex-1 btn-premium py-3">
              <ShoppingBag className="h-5 w-5" />
              Add to Cart
            </button>
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

export default ProductDetail;
