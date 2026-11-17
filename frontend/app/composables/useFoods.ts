import foodsData from "~/data/foods.json";

export interface Food {
  id: number;
  slug: string;
  name: string;
  category: string;
  icon: string;
  preparation: string;
  servingSizeG: number;
  calories: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  fiber_g: number;
  sugar_g: number;
  sodium_mg: number;
  tags: string[];
}

export interface CategoryMeta {
  name: string;
  slug: string;
  icon: string;
  badgeClass: string;
  cardBgClass: string;
  textClass: string;
}

const foods = foodsData as Food[];

const categoryMetaMap: Record<string, Omit<CategoryMeta, "name" | "slug">> = {
  Fruits: {
    icon: "🍎",
    badgeClass: "bg-rose-50 text-rose-700 border-rose-200",
    cardBgClass: "bg-rose-50/50",
    textClass: "text-rose-700",
  },
  Vegetables: {
    icon: "🥦",
    badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
    cardBgClass: "bg-emerald-50/50",
    textClass: "text-emerald-700",
  },
  "Meat & Poultry": {
    icon: "🥩",
    badgeClass: "bg-red-50 text-red-700 border-red-200",
    cardBgClass: "bg-red-50/50",
    textClass: "text-red-700",
  },
  Seafood: {
    icon: "🐟",
    badgeClass: "bg-cyan-50 text-cyan-700 border-cyan-200",
    cardBgClass: "bg-cyan-50/50",
    textClass: "text-cyan-700",
  },
  "Dairy & Eggs": {
    icon: "🥛",
    badgeClass: "bg-amber-50 text-amber-700 border-amber-200",
    cardBgClass: "bg-amber-50/50",
    textClass: "text-amber-700",
  },
  "Grains & Bread": {
    icon: "🍞",
    badgeClass: "bg-yellow-50 text-yellow-800 border-yellow-200",
    cardBgClass: "bg-yellow-50/50",
    textClass: "text-yellow-800",
  },
  "Legumes & Nuts": {
    icon: "🥜",
    badgeClass: "bg-orange-50 text-orange-700 border-orange-200",
    cardBgClass: "bg-orange-50/50",
    textClass: "text-orange-700",
  },
  "Fast Food": {
    icon: "🍔",
    badgeClass: "bg-purple-50 text-purple-700 border-purple-200",
    cardBgClass: "bg-purple-50/50",
    textClass: "text-purple-700",
  },
  Beverages: {
    icon: "🥤",
    badgeClass: "bg-blue-50 text-blue-700 border-blue-200",
    cardBgClass: "bg-blue-50/50",
    textClass: "text-blue-700",
  },
  Snacks: {
    icon: "🍿",
    badgeClass: "bg-pink-50 text-pink-700 border-pink-200",
    cardBgClass: "bg-pink-50/50",
    textClass: "text-pink-700",
  },
  "Supplements & Fitness": {
    icon: "💪",
    badgeClass: "bg-indigo-50 text-indigo-700 border-indigo-200",
    cardBgClass: "bg-indigo-50/50",
    textClass: "text-indigo-700",
  },
  "Bakery & Breakfast": {
    icon: "🥐",
    badgeClass: "bg-amber-50 text-amber-800 border-amber-200",
    cardBgClass: "bg-amber-50/50",
    textClass: "text-amber-800",
  },
};

export function useFoods() {
  const all = foods;

  const categories = Array.from(new Set(foods.map((f) => f.category))).sort();

  function getBySlug(slug: string): Food | undefined {
    return foods.find((f) => f.slug === slug);
  }

  function getByCategory(category: string): Food[] {
    return foods.filter(
      (f) => f.category.toLowerCase() === category.toLowerCase()
    );
  }

  function search(query: string): Food[] {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return foods.filter((f) => f.name.toLowerCase().includes(q));
  }

  function categorySlug(category: string): string {
    return category
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  function getCategoryMeta(categoryName: string): CategoryMeta {
    const slug = categorySlug(categoryName);
    const meta = categoryMetaMap[categoryName] || {
      icon: "🍽️",
      badgeClass: "bg-slate-100 text-slate-700 border-slate-200",
      cardBgClass: "bg-slate-50/50",
      textClass: "text-slate-700",
    };
    return {
      name: categoryName,
      slug,
      ...meta,
    };
  }

  return {
    all,
    categories,
    getBySlug,
    getByCategory,
    search,
    categorySlug,
    getCategoryMeta,
  };
}
