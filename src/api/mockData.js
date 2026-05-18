import kurtiCatImg from '../assets/kurtisc.png';
import sareeCatImg from '../assets/sareesc.png';
import frocksCatImg from '../assets/frocksc.png';
import casualCatImg from '../assets/casualwear.png';

import kurtiBlueImg from '../assets/kurtiblue.png';
import kurtiPinkImg from '../assets/kurtipink.png';
import sareeGreenImg from '../assets/sareegreen.png';
import sareeVioletImg from '../assets/sareeviolet.png';

export const mockCategories = [
  { id: 1, name: "Kurtis", slug: "kurtis", image: kurtiCatImg },
  { id: 2, name: "Sarees", slug: "sarees", image: sareeCatImg },
  { id: 3, name: "Frocks", slug: "frocks", image: frocksCatImg },
  { id: 4, name: "Casual Wear", slug: "casual-wear", image: casualCatImg }
];

const allSizes = ["XS", "S", "M", "L", "XL", "XXL", "Free Size"];

const generateVariants = (color) => {
  return allSizes.map((size, index) => ({
    id: `${color.id}-${size}`,
    size: size,
    stock: 10,
    color: color
  }));
};

export const mockProducts = [
  {
    id: 1,
    code: "VS-K001",
    name: "Designer Kurti",
    description: "Beautiful designer kurti available in refreshing colors. Made with premium fabric for maximum comfort.",
    price: 1299.00,
    original_price: 1999.00,
    discount_percentage: 35.02,
    has_sizes: true,
    shipping_charge: 50.00,
    category: 1,
    category_name: "Kurtis",
    variants: [
      ...generateVariants({ id: 1, name: "Blue", color: "#3B82F6", image: kurtiBlueImg }),
      ...generateVariants({ id: 2, name: "Pink", color: "#EC4899", image: kurtiPinkImg })
    ],
    images: [
      { id: 1, image: kurtiBlueImg },
      { id: 2, image: kurtiPinkImg }
    ],
    tag_names: ["Trending", "New"],
    available_colors: [
      { id: 1, name: "Blue", color: "#3B82F6", image: kurtiBlueImg },
      { id: 2, name: "Pink", color: "#EC4899", image: kurtiPinkImg }
    ],
    total_stock: 140,
    is_sold_out: false
  },
  {
    id: 2,
    code: "VS-S001",
    name: "Elegant Saree",
    description: "Traditional yet modern saree perfect for festive occasions and parties.",
    price: 2499.00,
    original_price: 3499.00,
    discount_percentage: 28.58,
    has_sizes: true,
    shipping_charge: 100.00,
    category: 2,
    category_name: "Sarees",
    variants: [
      ...generateVariants({ id: 3, name: "Green", color: "#10B981", image: sareeGreenImg }),
      ...generateVariants({ id: 4, name: "Violet", color: "#8B5CF6", image: sareeVioletImg })
    ],
    images: [
      { id: 3, image: sareeGreenImg },
      { id: 4, image: sareeVioletImg }
    ],
    tag_names: ["Party Wear", "Premium"],
    available_colors: [
      { id: 3, name: "Green", color: "#10B981", image: sareeGreenImg },
      { id: 4, name: "Violet", color: "#8B5CF6", image: sareeVioletImg }
    ],
    total_stock: 140,
    is_sold_out: false
  },
  {
    id: 3,
    code: "VS-F001",
    name: "Beautiful Frock",
    description: "Stunning frock with smooth fabric. The perfect choice for your upcoming event.",
    price: 1599.00,
    original_price: 2199.00,
    discount_percentage: 27.28,
    has_sizes: true,
    shipping_charge: 50.00,
    category: 3,
    category_name: "Frocks",
    variants: [
      ...generateVariants({ id: 5, name: "Blue", color: "#3B82F6", image: frocksCatImg }),
      ...generateVariants({ id: 6, name: "Light Green", color: "#86EFAC", image: frocksCatImg })
    ],
    images: [
      { id: 5, image: frocksCatImg }
    ],
    tag_names: ["Trending"],
    available_colors: [
      { id: 5, name: "Blue", color: "#3B82F6", image: frocksCatImg },
      { id: 6, name: "Light Green", color: "#86EFAC", image: frocksCatImg }
    ],
    total_stock: 140,
    is_sold_out: false
  },
  {
    id: 4,
    code: "VS-C001",
    name: "Trendy Casual Wear",
    description: "Comfortable and stylish casual wear for your day out.",
    price: 999.00,
    original_price: 1499.00,
    discount_percentage: 33.35,
    has_sizes: true,
    shipping_charge: 50.00,
    category: 4,
    category_name: "Casual Wear",
    variants: [
      ...generateVariants({ id: 7, name: "Blue", color: "#3B82F6", image: casualCatImg }),
      ...generateVariants({ id: 8, name: "Light Green", color: "#86EFAC", image: casualCatImg })
    ],
    images: [
      { id: 7, image: casualCatImg }
    ],
    tag_names: ["Casual", "Comfort"],
    available_colors: [
      { id: 7, name: "Blue", color: "#3B82F6", image: casualCatImg },
      { id: 8, name: "Light Green", color: "#86EFAC", image: casualCatImg }
    ],
    total_stock: 140,
    is_sold_out: false
  }
];

export const mockHeroImages = [
  { id: 1, image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&auto=format&fit=crop&q=80" },
  { id: 2, image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1600&auto=format&fit=crop&q=80" },
  { id: 3, image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600&auto=format&fit=crop&q=80" }
];
