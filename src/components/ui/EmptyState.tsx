import React from 'react';
import { ShoppingBag, Search, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface EmptyStateProps {
  type: 'cart' | 'search' | 'wishlist' | 'orders';
  message?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ type, message }) => {
  const config = {
    cart: {
      icon: ShoppingBag,
      title: 'Your cart is empty',
      description: message || 'Looks like you haven\'t added any sweets yet. Explore our collection and treat yourself!',
      action: { label: 'Start Shopping', href: '/shop' }
    },
    search: {
      icon: Search,
      title: 'No results found',
      description: message || 'Try adjusting your search or filters to find what you\'re looking for.',
      action: { label: 'Clear Filters', href: '/shop' }
    },
    wishlist: {
      icon: Heart,
      title: 'Your wishlist is empty',
      description: message || 'Save your favorite sweets to find them easily later.',
      action: { label: 'Explore Sweets', href: '/shop' }
    },
    orders: {
      icon: ShoppingBag,
      title: 'No orders yet',
      description: message || 'When you place orders, they will appear here.',
      action: { label: 'Start Shopping', href: '/shop' }
    }
  };

  const { icon: Icon, title, description, action } = config[type];

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
        <Icon className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="font-serif text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground max-w-sm mb-6">{description}</p>
      <Link to={action.href} className="btn-premium">
        {action.label}
      </Link>
    </div>
  );
};

export default EmptyState;
