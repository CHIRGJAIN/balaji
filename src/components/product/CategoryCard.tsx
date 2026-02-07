import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Category } from '@/data/products';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Link
        to={`/shop?category=${category.id}`}
        className="block premium-card overflow-hidden group"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div className="p-4 text-center">
          <div className="text-3xl mb-2 group-hover:animate-float">
            {category.icon}
          </div>
          <h3 className="font-serif font-medium text-foreground mb-1">
            {category.name}
          </h3>
          <p className="text-sm text-muted-foreground">
            {category.description}
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;
