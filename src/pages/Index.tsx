import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Award, Clock, Leaf, Star, Quote } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/product/ProductCard';
import CategoryCard from '@/components/product/CategoryCard';
import ProductCarousel from '@/components/ui/product-carousel';
import { products, categories, testimonials, getBestSellers } from '@/data/products';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const Index: React.FC = () => {
  const bestSellers = getBestSellers();
  const heroImages = {
    main: "/images/products/image.png",
    top: "/images/products/motichoor-ladoo.jpg",
    bottom: "/images/products/sugar-free-sweets.jpg"
  };
  const featureCards = [
    {
      icon: Award,
      title: 'Quality Ingredients',
      desc: 'Only the finest ghee, dry fruits, and natural flavors',
      image: products.find((p) => p.slug === 'badam-barfi')?.images[0]
        ?? "/images/products/badam-barfi-1.svg",
      alt: 'Premium ingredients and dry fruits'
    },
    {
      icon: Leaf,
      title: 'Hygiene First',
      desc: 'FSSAI certified with strict quality controls',
      image: products.find((p) => p.slug === 'milk-cake')?.images[0]
        ?? "/images/products/milk-cake-1.svg",
      alt: 'Freshly prepared sweets'
    },
    {
      icon: Clock,
      title: 'Traditional Recipes',
      desc: '60+ years of authentic family recipes',
      image: products.find((p) => p.slug === 'peda')?.images[0]
        ?? "/images/products/peda-1.svg",
      alt: 'Traditional Indian sweets'
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      desc: 'Pan-India delivery with temperature control',
      image: products.find((p) => p.slug === 'premium-gift-box')?.images[0]
        ?? "/images/products/premium-gift-box-1.svg",
      alt: 'Gift box ready for delivery'
    }
  ];
  const storeImages = {
    visit: products.find((p) => p.slug === 'kesar-pista-roll')?.images[0]
      ?? "/images/products/kesar-pista-roll-1.svg",
    delivery: products.find((p) => p.slug === 'diwali-special-hamper')?.images[0]
      ?? "/images/products/diwali-special-hamper-1.svg"
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden mandala-pattern">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/20 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />
        
        <div className="container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              initial="initial"
              animate="animate"
              variants={stagger}
              className="text-center lg:text-left"
            >
              <motion.div variants={fadeInUp} className="mb-4">
                <span className="badge-gold">Authentic Since 1965</span>
              </motion.div>
              
              <motion.h1
                variants={fadeInUp}
                className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight"
              >
                Balaji Sweets
                <span className="block text-gradient-gold">Crafted with Purity</span>
              </motion.h1>
              
              <motion.p
                variants={fadeInUp}
                className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0"
              >
                Experience the authentic taste of India with our handcrafted sweets, 
                made with pure ghee and traditional recipes passed down through generations.
              </motion.p>

              {/* Highlight Chips */}
              <motion.div
                variants={fadeInUp}
                className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8"
              >
                {['Pure Ghee', 'Fresh Daily', 'Pan-India Delivery', 'Festive Hampers'].map((chip) => (
                  <span key={chip} className="px-4 py-2 rounded-full bg-muted text-sm font-medium text-muted-foreground">
                    {chip}
                  </span>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Link to="/shop" className="btn-premium">
                  Shop Sweets
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/shop?category=gift-boxes" className="btn-premium-outline">
                  Explore Gift Boxes
                </Link>
              </motion.div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-none mx-auto lg:mx-0"
            >
              <div className="relative z-10">
                <div className="aspect-square rounded-full overflow-hidden shadow-hover glow-gold">
                  <img
                    src={heroImages.main}
                    alt="Sugar-Free Sweets"
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                </div>
              </div>
              {/* Floating Elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute z-20 top-6 -left-6 sm:top-8 sm:-left-8 lg:top-10 lg:-left-10 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden shadow-card border-4 border-card"
              >
                <img
                  src={heroImages.top}
                  alt="Motichoor Ladoo"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </motion.div>
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute z-20 bottom-10 -right-6 sm:bottom-12 sm:-right-6 lg:bottom-20 lg:-right-8 w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden shadow-card border-4 border-card"
              >
                <img
                  src={heroImages.bottom}
                  alt="Gulab Jamun"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Category Strip */}
      <section className="py-16 bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="font-serif text-3xl font-semibold mb-2">Shop by Category</h2>
            <p className="text-muted-foreground">Find your favorite treats</p>
          </motion.div>
          
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            {categories.map((category) => (
              <motion.div key={category.id} variants={fadeInUp}>
                <CategoryCard category={category} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-10"
          >
            <div>
              <h2 className="font-serif text-3xl font-semibold mb-2">Best Sellers</h2>
              <p className="text-muted-foreground">Most loved by our customers</p>
            </div>
            <Link to="/shop" className="hidden sm:flex items-center gap-2 text-primary hover:underline font-medium">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {bestSellers.slice(0, 8).map((product) => (
              <motion.div key={product.id} variants={fadeInUp}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-8 text-center sm:hidden">
            <Link to="/shop" className="btn-premium-outline">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Festive Banner */}
      <section className="py-16 bg-gradient-maroon relative overflow-hidden">
        <div className="absolute inset-0 mandala-pattern opacity-20" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-primary-foreground"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-primary-foreground/20 text-sm font-medium mb-4">
              Festive Season
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4">
              Celebrate with Special Hampers
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Make every celebration sweeter with our curated gift hampers. 
              Perfect for Diwali, weddings, and corporate gifting.
            </p>
            <Link
              to="/gifting"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-foreground text-secondary rounded-lg font-medium hover:bg-primary-foreground/90 transition-colors"
            >
              Explore Gift Hampers
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why Balaji */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl font-semibold mb-2">Why Balaji Sweets?</h2>
            <p className="text-muted-foreground">A tradition of excellence</p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {featureCards.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="premium-card overflow-hidden text-center"
              >
                <div className="relative h-32">
                  <img
                    src={feature.image}
                    alt={feature.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <div className="w-14 h-14 mx-auto -mt-12 mb-4 rounded-full bg-gradient-saffron flex items-center justify-center border-4 border-card shadow-card">
                    <feature.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-serif font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl font-semibold mb-2">Customer Love</h2>
            <p className="text-muted-foreground">What our sweet family says</p>
          </motion.div>

          <ProductCarousel autoPlay interval={6000}>
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="px-4">
                <div className="max-w-2xl mx-auto text-center">
                  <Quote className="h-10 w-10 mx-auto mb-4 text-primary/30" />
                  <p className="text-lg text-foreground mb-6 italic">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-saffron flex items-center justify-center text-primary-foreground font-semibold">
                      {testimonial.avatar}
                    </div>
                    <div className="text-left">
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </div>
                  <div className="flex justify-center gap-1 mt-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </ProductCarousel>
        </div>
      </section>

      {/* Store & Delivery */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="premium-card overflow-hidden"
            >
              <div className="relative h-44 sm:h-52">
                <img
                  src={storeImages.visit}
                  alt="Balaji Sweets storefront"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-8">
                <h3 className="font-serif text-2xl font-semibold mb-4">Visit Our Store</h3>
                <p className="text-muted-foreground mb-4">
                  Experience the aroma of freshly made sweets at our flagship store in Old Delhi. 
                  Sample our specialties and shop in person.
                </p>
                <p className="text-sm mb-4">
                  <strong>Address:</strong> 123, Sweet Lane, Chandni Chowk, Old Delhi - 110006
                </p>
                <p className="text-sm mb-6">
                  <strong>Hours:</strong> 8 AM - 9 PM, All days
                </p>
                <Link to="/contact" className="btn-premium-outline">
                  Get Directions
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="premium-card overflow-hidden"
            >
              <div className="relative h-44 sm:h-52">
                <img
                  src={storeImages.delivery}
                  alt="Delivery-ready sweet hampers"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-8">
                <h3 className="font-serif text-2xl font-semibold mb-4">Pan-India Delivery</h3>
                <p className="text-muted-foreground mb-4">
                  We deliver our sweets across India with temperature-controlled packaging 
                  to ensure freshness at your doorstep.
                </p>
                <ul className="text-sm space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    Free delivery on orders above ₹999
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    Same-day delivery in Delhi NCR
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    Express delivery available
                  </li>
                </ul>
                <Link to="/shop" className="btn-premium">
                  Shop Now
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;


