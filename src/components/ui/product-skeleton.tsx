import React from 'react';
import { cn } from '@/lib/utils';

interface ProductSkeletonProps {
  className?: string;
}

export const ProductSkeleton: React.FC<ProductSkeletonProps> = ({ className }) => {
  return (
    <div className={cn("animate-pulse bg-muted rounded-lg", className)} />
  );
};

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="premium-card overflow-hidden">
      <ProductSkeleton className="aspect-square w-full" />
      <div className="p-4 space-y-3">
        <ProductSkeleton className="h-5 w-3/4" />
        <ProductSkeleton className="h-4 w-1/2" />
        <ProductSkeleton className="h-6 w-1/3" />
      </div>
    </div>
  );
};

export default ProductSkeleton;
