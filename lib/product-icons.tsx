import { 
  Pill, 
  Gem, 
  Fish, 
  Activity, 
  Leaf, 
  Dumbbell, 
  Shield, 
  Moon, 
  Sparkles, 
  Bone,
  LucideIcon
} from "lucide-react";

// Map product categories to their corresponding icons
export const categoryIcons: Record<string, LucideIcon> = {
  "Vitamins": Pill,
  "Minerals": Gem,
  "Omega-3": Fish,
  "Probiotics": Activity,
  "Herbal": Leaf,
  "Protein": Dumbbell,
  "Antioxidants": Shield,
  "Sleep": Moon,
  "Beauty": Sparkles,
  "Joint Health": Bone,
};

// Get icon component for a product category
export function getCategoryIcon(category: string): LucideIcon {
  return categoryIcons[category] || Pill; // Default to Pill icon if category not found
}

// Component to render category icon with consistent styling
export function CategoryIcon({ 
  category, 
  className = "h-12 w-12",
  ...props 
}: { 
  category: string; 
  className?: string;
} & React.ComponentProps<LucideIcon>) {
  const IconComponent = getCategoryIcon(category);
  
  return (
    <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg">
      <IconComponent 
        className={`text-primary ${className}`} 
        {...props}
      />
    </div>
  );
}
