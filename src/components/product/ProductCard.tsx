import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { cn } from '@/lib/utils';
import CustomToast from '@/components/ui/custom-toast';
import { getPrimaryProductImage } from '@/lib/productImages';

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, className }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const primaryImage = getPrimaryProductImage(product);

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart({
      productId: product.id,
      quantity: 1,
      weight: product.weights[0].label,
      price: product.weights[0].price
    });
    
    setToastMessage(`${product.name} added to cart!`);
    setShowToast(true);
  }, [addToCart, product]);

  const handleToggleWishlist = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const added = toggleWishlist(product.id);
    setToastMessage(added ? 'Added to wishlist!' : 'Removed from wishlist');
    setShowToast(true);
  }, [toggleWishlist, product.id]);

  return (
    <>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className={cn("group", className)}
      >
        <Link to={`/product/${product.slug}`} className="block">
          <div className="premium-card overflow-hidden">
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden bg-muted">
              <img
                src={primaryImage}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              
              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-2">
                {product.isBestSeller && (
                  <span className="badge-gold text-xs">Best Seller</span>
                )}
                {product.isSugarFree && (
                  <span className="badge-saffron text-xs">Sugar-Free</span>
                )}
                {product.originalPrice && (
                  <span className="bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full text-xs font-medium">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                  </span>
                )}
              </div>

              {/* Wishlist Button */}
              <button
                onClick={handleToggleWishlist}
                className={cn(
                  "absolute top-3 right-3 p-2 rounded-full transition-all duration-200",
                  "bg-card/80 backdrop-blur-sm hover:bg-card",
                  inWishlist && "text-secondary"
                )}
                aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart className={cn("h-4 w-4", inWishlist && "fill-current")} />
              </button>

              {/* Quick Add Button - Desktop */}
              <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 hidden md:block">
                <button
                  onClick={handleAddToCart}
                  className="w-full btn-premium py-2 text-sm"
                >
                  <ShoppingBag className="h-4 w-4" />
                  Add to Cart
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-serif font-medium text-foreground mb-1 truncate">
                {product.name}
              </h3>
              
              {/* Rating */}
              <div className="flex items-center gap-1 mb-2">
                <Star className="h-3.5 w-3.5 fill-gold text-gold" />
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviewsCount})
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2">
                <span className="font-semibold text-foreground">
                  ₹{product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    ₹{product.originalPrice}
                  </span>
                )}
                <span className="text-xs text-muted-foreground">
                  / {product.weights[0].label}
                </span>
              </div>

              {/* Mobile Add Button */}
              <button
                onClick={handleAddToCart}
                className="w-full btn-premium py-2 text-sm mt-3 md:hidden"
              >
                <ShoppingBag className="h-4 w-4" />
                Add to Cart
              </button>
            </div>
          </div>
        </Link>
      </motion.div>

      <CustomToast
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </>
  );
};

export default ProductCard;
