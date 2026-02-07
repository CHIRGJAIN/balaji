export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  tags: string[];
  price: number;
  originalPrice?: number;
  images: string[];
  rating: number;
  reviewsCount: number;
  description: string;
  ingredients: string;
  shelfLife: string;
  storage: string;
  weights: { label: string; price: number }[];
  isBestSeller: boolean;
  isGiftable: boolean;
  isSugarFree: boolean;
  isVegan: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  image: string;
}

export const categories: Category[] = [
  {
    id: "milk-sweets",
    name: "Milk Sweets",
    icon: "🥛",
    description: "Rich, creamy delights",
    image: "/images/products/motichoor-ladoo-1.svg"
  },
  {
    id: "dry-fruit-sweets",
    name: "Dry Fruit Sweets",
    icon: "🥜",
    description: "Premium nutty treats",
    image: "/images/products/kaju-katli-1.svg"
  },
  {
    id: "bengali",
    name: "Bengali Sweets",
    icon: "🍮",
    description: "Eastern delicacies",
    image: "/images/products/rasgulla-1.svg"
  },
  {
    id: "namkeen",
    name: "Namkeen",
    icon: "🌶️",
    description: "Savory snacks",
    image: "/images/products/aloo-bhujia-1.svg"
  },
  {
    id: "gift-boxes",
    name: "Gift Boxes",
    icon: "🎁",
    description: "Perfect for gifting",
    image: "/images/products/premium-gift-box-1.svg"
  },
  {
    id: "sugar-free",
    name: "Sugar-Free",
    icon: "🍃",
    description: "Guilt-free indulgence",
    image: "/images/products/sugar-free-kaju-katli-1.svg"
  }
];

export const products: Product[] = [
  {
    id: "1",
    slug: "kaju-katli",
    name: "Kaju Katli",
    category: "dry-fruit-sweets",
    tags: ["premium", "bestseller", "gifting"],
    price: 850,
    images: [
      "/images/products/kaju-katli-1.svg",
      "/images/products/kaju-katli-2.svg"
    ],
    rating: 4.9,
    reviewsCount: 2847,
    description: "Our signature Kaju Katli is crafted with premium Goan cashews, pure ghee, and natural cardamom. Each diamond-shaped piece melts in your mouth, offering a perfect balance of sweetness and nutty richness. A timeless classic that has been our family's pride for generations.",
    ingredients: "Premium Cashew Nuts (70%), Sugar, Pure Ghee, Cardamom, Edible Silver Foil",
    shelfLife: "15 days at room temperature, 30 days refrigerated",
    storage: "Store in a cool, dry place. Keep away from direct sunlight.",
    weights: [
      { label: "250g", price: 850 },
      { label: "500g", price: 1650 },
      { label: "1kg", price: 3200 }
    ],
    isBestSeller: true,
    isGiftable: true,
    isSugarFree: false,
    isVegan: false
  },
  {
    id: "2",
    slug: "motichoor-ladoo",
    name: "Motichoor Ladoo",
    category: "milk-sweets",
    tags: ["traditional", "festive"],
    price: 450,
    images: [
      "/images/products/motichoor-ladoo-1.svg"
    ],
    rating: 4.8,
    reviewsCount: 1923,
    description: "Delicate pearls of besan, fried to golden perfection and bound with aromatic sugar syrup. Our Motichoor Ladoo carries the essence of celebrations, made fresh daily using traditional recipes passed down through generations.",
    ingredients: "Besan (Gram Flour), Sugar, Pure Ghee, Cardamom, Saffron, Pistachios",
    shelfLife: "10 days at room temperature, 20 days refrigerated",
    storage: "Store in an airtight container in a cool place.",
    weights: [
      { label: "250g (6 pcs)", price: 450 },
      { label: "500g (12 pcs)", price: 850 },
      { label: "1kg (24 pcs)", price: 1650 }
    ],
    isBestSeller: true,
    isGiftable: true,
    isSugarFree: false,
    isVegan: false
  },
  {
    id: "3",
    slug: "rasgulla",
    name: "Bengal Rasgulla",
    category: "bengali",
    tags: ["bengali", "spongy"],
    price: 380,
    images: [
      "/images/products/rasgulla-1.svg"
    ],
    rating: 4.7,
    reviewsCount: 1456,
    description: "Soft, spongy cottage cheese balls soaked in light sugar syrup flavored with rose water. Our Rasgullas are made using the authentic Bengali method, ensuring each piece is pillowy soft and bursting with sweetness.",
    ingredients: "Fresh Chhena (Cottage Cheese), Sugar, Rose Water, Cardamom",
    shelfLife: "7 days refrigerated",
    storage: "Keep refrigerated. Consume within 2 days of opening.",
    weights: [
      { label: "500g (8 pcs)", price: 380 },
      { label: "1kg (16 pcs)", price: 720 }
    ],
    isBestSeller: true,
    isGiftable: false,
    isSugarFree: false,
    isVegan: false
  },
  {
    id: "4",
    slug: "gulab-jamun",
    name: "Gulab Jamun",
    category: "milk-sweets",
    tags: ["traditional", "festive", "popular"],
    price: 420,
    images: [
      "/images/products/gulab-jamun-1.svg"
    ],
    rating: 4.9,
    reviewsCount: 2156,
    description: "Golden brown, melt-in-your-mouth khoya balls soaked in rose-scented sugar syrup. Our Gulab Jamuns are fried to perfection and allowed to absorb the aromatic syrup overnight for maximum flavor.",
    ingredients: "Khoya (Milk Solids), Maida, Sugar, Rose Water, Cardamom, Saffron",
    shelfLife: "10 days refrigerated",
    storage: "Keep refrigerated. Best served warm.",
    weights: [
      { label: "500g (10 pcs)", price: 420 },
      { label: "1kg (20 pcs)", price: 800 }
    ],
    isBestSeller: true,
    isGiftable: true,
    isSugarFree: false,
    isVegan: false
  },
  {
    id: "5",
    slug: "milk-cake",
    name: "Milk Cake (Alwar Ka Mawa)",
    category: "milk-sweets",
    tags: ["premium", "rich"],
    price: 580,
    images: [
      "/images/products/milk-cake-1.svg"
    ],
    rating: 4.6,
    reviewsCount: 892,
    description: "A rich, caramelized milk cake made by slow-cooking milk for hours until it transforms into a dense, fudge-like delicacy. The slight caramelization gives it a unique flavor that's irresistible.",
    ingredients: "Full Cream Milk, Sugar, Ghee, Cardamom",
    shelfLife: "12 days at room temperature, 25 days refrigerated",
    storage: "Store in a cool, dry place.",
    weights: [
      { label: "250g", price: 580 },
      { label: "500g", price: 1100 },
      { label: "1kg", price: 2100 }
    ],
    isBestSeller: false,
    isGiftable: true,
    isSugarFree: false,
    isVegan: false
  },
  {
    id: "6",
    slug: "badam-barfi",
    name: "Badam Barfi",
    category: "dry-fruit-sweets",
    tags: ["premium", "almond"],
    price: 780,
    images: [
      "/images/products/badam-barfi-1.svg"
    ],
    rating: 4.8,
    reviewsCount: 1234,
    description: "Premium almond barfi made with California almonds, slow-cooked with milk and aromatic spices. Each piece is garnished with slivers of almonds and a touch of edible silver.",
    ingredients: "Almonds (65%), Sugar, Milk, Ghee, Cardamom, Saffron, Edible Silver Foil",
    shelfLife: "15 days at room temperature, 30 days refrigerated",
    storage: "Store in an airtight container in a cool place.",
    weights: [
      { label: "250g", price: 780 },
      { label: "500g", price: 1500 },
      { label: "1kg", price: 2900 }
    ],
    isBestSeller: false,
    isGiftable: true,
    isSugarFree: false,
    isVegan: false
  },
  {
    id: "7",
    slug: "peda",
    name: "Mathura Peda",
    category: "milk-sweets",
    tags: ["traditional", "temple"],
    price: 380,
    images: [
      "/images/products/peda-1.svg"
    ],
    rating: 4.7,
    reviewsCount: 987,
    description: "Traditional Mathura-style peda made with fresh khoya, flavored with cardamom and saffron. These golden discs carry the authentic taste of Braj, perfect for religious offerings or everyday indulgence.",
    ingredients: "Khoya (Milk Solids), Sugar, Cardamom, Saffron, Pistachios",
    shelfLife: "8 days at room temperature, 20 days refrigerated",
    storage: "Store in a cool, dry place away from moisture.",
    weights: [
      { label: "250g", price: 380 },
      { label: "500g", price: 720 },
      { label: "1kg", price: 1400 }
    ],
    isBestSeller: false,
    isGiftable: true,
    isSugarFree: false,
    isVegan: false
  },
  {
    id: "8",
    slug: "soan-papdi",
    name: "Soan Papdi",
    category: "milk-sweets",
    tags: ["flaky", "festive"],
    price: 320,
    images: [
      "/images/products/soan-papdi-1.svg"
    ],
    rating: 4.5,
    reviewsCount: 1567,
    description: "Flaky, melt-in-your-mouth sweet made with besan, ghee, and sugar. The unique texture is achieved through a traditional pulling technique that creates hundreds of delicate layers.",
    ingredients: "Besan, Sugar, Ghee, Cardamom, Almonds, Pistachios",
    shelfLife: "30 days in sealed pack",
    storage: "Store in airtight container. Keep away from moisture.",
    weights: [
      { label: "250g", price: 320 },
      { label: "500g", price: 600 },
      { label: "1kg", price: 1150 }
    ],
    isBestSeller: false,
    isGiftable: true,
    isSugarFree: false,
    isVegan: false
  },
  {
    id: "9",
    slug: "mysore-pak",
    name: "Mysore Pak",
    category: "milk-sweets",
    tags: ["south-indian", "ghee-rich"],
    price: 520,
    images: [
      "/images/products/mysore-pak-1.svg"
    ],
    rating: 4.8,
    reviewsCount: 1089,
    description: "Authentic Mysore Pak made the traditional way with generous amounts of pure ghee and finest besan. The rich, crumbly texture and intense ghee flavor make this a royal treat.",
    ingredients: "Besan, Pure Ghee (40%), Sugar, Cardamom",
    shelfLife: "15 days at room temperature",
    storage: "Store in a cool, dry place. Best at room temperature.",
    weights: [
      { label: "250g", price: 520 },
      { label: "500g", price: 1000 },
      { label: "1kg", price: 1900 }
    ],
    isBestSeller: true,
    isGiftable: true,
    isSugarFree: false,
    isVegan: false
  },
  {
    id: "10",
    slug: "sandesh",
    name: "Bengali Sandesh",
    category: "bengali",
    tags: ["bengali", "light"],
    price: 420,
    images: [
      "/images/products/sandesh-1.svg"
    ],
    rating: 4.6,
    reviewsCount: 756,
    description: "Delicate Bengali sweet made from fresh chhena, lightly sweetened and flavored with cardamom. Each piece is hand-molded into beautiful shapes, representing the artistry of Bengali confectioners.",
    ingredients: "Fresh Chhena, Sugar, Cardamom, Pistachios",
    shelfLife: "5 days refrigerated",
    storage: "Must be refrigerated. Consume fresh.",
    weights: [
      { label: "250g (8 pcs)", price: 420 },
      { label: "500g (16 pcs)", price: 800 }
    ],
    isBestSeller: false,
    isGiftable: true,
    isSugarFree: false,
    isVegan: false
  },
  {
    id: "11",
    slug: "kesar-pista-roll",
    name: "Kesar Pista Roll",
    category: "dry-fruit-sweets",
    tags: ["premium", "saffron", "pistachio"],
    price: 920,
    images: [
      "/images/products/kesar-pista-roll-1.svg"
    ],
    rating: 4.9,
    reviewsCount: 678,
    description: "Luxurious roll of saffron-infused khoya wrapped around a rich pistachio filling. This premium sweet showcases the best of Indian confectionery with its beautiful spiral pattern.",
    ingredients: "Khoya, Pistachios (30%), Saffron, Sugar, Cardamom, Edible Silver Foil",
    shelfLife: "12 days refrigerated",
    storage: "Keep refrigerated for best taste.",
    weights: [
      { label: "250g", price: 920 },
      { label: "500g", price: 1800 },
      { label: "1kg", price: 3500 }
    ],
    isBestSeller: false,
    isGiftable: true,
    isSugarFree: false,
    isVegan: false
  },
  {
    id: "12",
    slug: "besan-ladoo",
    name: "Besan Ladoo",
    category: "milk-sweets",
    tags: ["traditional", "homestyle"],
    price: 380,
    images: [
      "/images/products/besan-ladoo-1.svg"
    ],
    rating: 4.7,
    reviewsCount: 1345,
    description: "Classic besan ladoos made with roasted gram flour and pure ghee. The deep roasting of besan gives these ladoos their distinctive nutty aroma and golden color.",
    ingredients: "Besan, Sugar, Pure Ghee, Cardamom, Almonds",
    shelfLife: "20 days at room temperature",
    storage: "Store in airtight container in a cool place.",
    weights: [
      { label: "250g (6 pcs)", price: 380 },
      { label: "500g (12 pcs)", price: 720 },
      { label: "1kg (24 pcs)", price: 1400 }
    ],
    isBestSeller: false,
    isGiftable: true,
    isSugarFree: false,
    isVegan: false
  },
  {
    id: "13",
    slug: "sugar-free-kaju-katli",
    name: "Sugar-Free Kaju Katli",
    category: "sugar-free",
    tags: ["sugar-free", "diabetic-friendly"],
    price: 950,
    images: [
      "/images/products/sugar-free-kaju-katli-1.svg"
    ],
    rating: 4.5,
    reviewsCount: 432,
    description: "All the richness of our classic Kaju Katli, now with zero added sugar. Made with premium cashews and natural sugar alternatives, perfect for those watching their sugar intake.",
    ingredients: "Premium Cashews (70%), Maltitol, Ghee, Cardamom, Stevia Extract",
    shelfLife: "12 days refrigerated",
    storage: "Store refrigerated in airtight container.",
    weights: [
      { label: "250g", price: 950 },
      { label: "500g", price: 1850 }
    ],
    isBestSeller: false,
    isGiftable: true,
    isSugarFree: true,
    isVegan: false
  },
  {
    id: "14",
    slug: "sugar-free-ladoo",
    name: "Sugar-Free Dry Fruit Ladoo",
    category: "sugar-free",
    tags: ["sugar-free", "healthy"],
    price: 680,
    images: [
      "/images/products/sugar-free-ladoo-1.svg"
    ],
    rating: 4.4,
    reviewsCount: 289,
    description: "A healthier take on traditional ladoos, packed with dates, nuts, and seeds. Naturally sweetened with dates and jaggery alternatives.",
    ingredients: "Dates, Almonds, Cashews, Walnuts, Desiccated Coconut, Ghee, Cardamom",
    shelfLife: "20 days refrigerated",
    storage: "Keep refrigerated for extended freshness.",
    weights: [
      { label: "250g", price: 680 },
      { label: "500g", price: 1300 }
    ],
    isBestSeller: false,
    isGiftable: true,
    isSugarFree: true,
    isVegan: false
  },
  {
    id: "15",
    slug: "aloo-bhujia",
    name: "Aloo Bhujia",
    category: "namkeen",
    tags: ["namkeen", "crispy", "spicy"],
    price: 280,
    images: [
      "/images/products/aloo-bhujia-1.svg"
    ],
    rating: 4.6,
    reviewsCount: 1876,
    description: "Crispy, spicy potato noodles made with the finest potatoes and a secret blend of spices. Perfect for snacking or as an accompaniment to tea.",
    ingredients: "Potato, Besan, Vegetable Oil, Salt, Red Chili, Spices",
    shelfLife: "90 days in sealed pack",
    storage: "Store in airtight container. Keep dry.",
    weights: [
      { label: "200g", price: 280 },
      { label: "400g", price: 520 },
      { label: "1kg", price: 1200 }
    ],
    isBestSeller: false,
    isGiftable: false,
    isSugarFree: true,
    isVegan: true
  },
  {
    id: "16",
    slug: "mixed-namkeen",
    name: "Royal Mixed Namkeen",
    category: "namkeen",
    tags: ["namkeen", "mixed", "party"],
    price: 350,
    images: [
      "/images/products/mixed-namkeen-1.svg"
    ],
    rating: 4.7,
    reviewsCount: 1234,
    description: "A royal mix of crispy snacks including bhujia, peanuts, cashews, and various savory elements. Perfect party snack.",
    ingredients: "Besan, Peanuts, Cashews, Rice Flakes, Curry Leaves, Spices, Salt",
    shelfLife: "90 days in sealed pack",
    storage: "Store in airtight container.",
    weights: [
      { label: "250g", price: 350 },
      { label: "500g", price: 650 },
      { label: "1kg", price: 1250 }
    ],
    isBestSeller: false,
    isGiftable: true,
    isSugarFree: true,
    isVegan: true
  },
  {
    id: "17",
    slug: "premium-gift-box",
    name: "Premium Celebration Box",
    category: "gift-boxes",
    tags: ["gifting", "premium", "festive"],
    price: 2500,
    originalPrice: 2800,
    images: [
      "/images/products/premium-gift-box-1.svg"
    ],
    rating: 4.9,
    reviewsCount: 567,
    description: "An exquisite collection of our finest sweets, beautifully packaged in a handcrafted wooden box. Includes Kaju Katli, Motichoor Ladoo, Badam Barfi, and Kesar Pista Roll.",
    ingredients: "Assorted Premium Sweets (see individual items)",
    shelfLife: "10 days from packing date",
    storage: "Store in cool, dry place. Refrigerate after opening.",
    weights: [
      { label: "1kg Box", price: 2500 },
      { label: "2kg Box", price: 4800 }
    ],
    isBestSeller: true,
    isGiftable: true,
    isSugarFree: false,
    isVegan: false
  },
  {
    id: "18",
    slug: "diwali-special-hamper",
    name: "Diwali Special Hamper",
    category: "gift-boxes",
    tags: ["gifting", "diwali", "festive", "premium"],
    price: 3500,
    originalPrice: 4000,
    images: [
      "/images/products/diwali-special-hamper-1.svg"
    ],
    rating: 4.9,
    reviewsCount: 892,
    description: "The ultimate Diwali gift featuring our best sweets, premium dry fruits, and artisanal chocolates. Comes in an elegant festive packaging with traditional motifs.",
    ingredients: "Assorted Sweets, Dry Fruits, Artisanal Items",
    shelfLife: "15 days from packing date",
    storage: "Store in cool, dry place.",
    weights: [
      { label: "2kg Hamper", price: 3500 },
      { label: "3kg Hamper", price: 5200 }
    ],
    isBestSeller: true,
    isGiftable: true,
    isSugarFree: false,
    isVegan: false
  },
  {
    id: "19",
    slug: "malai-ghewar",
    name: "Malai Ghewar",
    category: "milk-sweets",
    tags: ["rajasthani", "festive", "seasonal"],
    price: 480,
    images: [
      "/images/products/malai-ghewar-1.svg"
    ],
    rating: 4.6,
    reviewsCount: 423,
    description: "Traditional Rajasthani delicacy, a disc-shaped sweet made with flour, ghee, and soaked in sugar syrup. Topped with creamy rabri and garnished with pistachios.",
    ingredients: "Flour, Ghee, Sugar, Milk, Rabri, Pistachios, Saffron",
    shelfLife: "3 days refrigerated",
    storage: "Must be refrigerated. Best consumed fresh.",
    weights: [
      { label: "1 piece (250g)", price: 480 },
      { label: "2 pieces (500g)", price: 920 }
    ],
    isBestSeller: false,
    isGiftable: false,
    isSugarFree: false,
    isVegan: false
  },
  {
    id: "20",
    slug: "rasmalai",
    name: "Rasmalai",
    category: "bengali",
    tags: ["bengali", "creamy", "festive"],
    price: 450,
    images: [
      "/images/products/rasmalai-1.svg"
    ],
    rating: 4.8,
    reviewsCount: 1678,
    description: "Soft cottage cheese patties soaked in rich, saffron-flavored thickened milk. Each piece is a perfect blend of creaminess and delicate sweetness.",
    ingredients: "Fresh Chhena, Full Cream Milk, Sugar, Saffron, Cardamom, Pistachios",
    shelfLife: "5 days refrigerated",
    storage: "Keep refrigerated at all times.",
    weights: [
      { label: "500g (6 pcs)", price: 450 },
      { label: "1kg (12 pcs)", price: 850 }
    ],
    isBestSeller: true,
    isGiftable: true,
    isSugarFree: false,
    isVegan: false
  }
];

export const testimonials = [
  {
    id: "1",
    name: "Priya Sharma",
    location: "Mumbai",
    rating: 5,
    text: "The Kaju Katli from Balaji Sweets is simply divine! It reminds me of my grandmother's homemade sweets. The quality is unmatched.",
    avatar: "PS"
  },
  {
    id: "2",
    name: "Rajesh Gupta",
    location: "Delhi",
    rating: 5,
    text: "We order gift boxes for all our corporate events. The presentation is elegant and the taste is always consistent. Highly recommended!",
    avatar: "RG"
  },
  {
    id: "3",
    name: "Anita Patel",
    location: "Ahmedabad",
    rating: 5,
    text: "Being diabetic, I never thought I could enjoy sweets again. Their sugar-free range is a blessing. Tastes just like the real thing!",
    avatar: "AP"
  },
  {
    id: "4",
    name: "Vikram Singh",
    location: "Jaipur",
    rating: 5,
    text: "The freshness of their sweets is remarkable. You can taste the pure ghee and quality ingredients in every bite.",
    avatar: "VS"
  }
];

export const getBestSellers = () => products.filter(p => p.isBestSeller);
export const getProductBySlug = (slug: string) => products.find(p => p.slug === slug);
export const getProductsByCategory = (category: string) => products.filter(p => p.category === category);
export const getGiftableProducts = () => products.filter(p => p.isGiftable);
export const getSugarFreeProducts = () => products.filter(p => p.isSugarFree);


