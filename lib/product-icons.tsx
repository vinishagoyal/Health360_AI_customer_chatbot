import Image from "next/image";
import { 
  Apple,
  Bone,
  Brain,
  Dumbbell,
  Fish,
  Flower2,
  Gem,
  Leaf,
  LucideIcon,
  Moon,
  Pill,
  Shield,
  Sparkles,
  Sprout,
} from "lucide-react";

type CategoryIconConfig = {
  icon: LucideIcon;
  accentIcon: LucideIcon;
  label: string;
  color: string;
  accentColor: string;
  background: string;
  imageSrc?: string;
};

const defaultConfig: CategoryIconConfig = {
  icon: Pill,
  accentIcon: Sparkles,
  label: "Supplement",
  color: "#334155",
  accentColor: "#64748b",
  background: "linear-gradient(135deg, #f1f5f9 0%, #ffffff 52%, #e2e8f0 100%)",
};

export const categoryIconConfigs: Record<string, CategoryIconConfig> = {
  Vitamins: {
    icon: Apple,
    accentIcon: Pill,
    label: "Vitamins",
    color: "#e11d48",
    accentColor: "#f59e0b",
    background: "linear-gradient(135deg, #ffe4e6 0%, #ffffff 48%, #fef3c7 100%)",
    imageSrc: "/images/health360/health360-multivitamins.png",
  },
  Minerals: {
    icon: Gem,
    accentIcon: Sparkles,
    label: "Minerals",
    color: "#0e7490",
    accentColor: "#059669",
    background: "linear-gradient(135deg, #cffafe 0%, #ffffff 50%, #d1fae5 100%)",
    imageSrc: "/images/health360/health360-minerals.png",
  },
  Herbal: {
    icon: Leaf,
    accentIcon: Flower2,
    label: "Herbal",
    color: "#047857",
    accentColor: "#65a30d",
    background: "linear-gradient(135deg, #d1fae5 0%, #ffffff 50%, #ecfccb 100%)",
    imageSrc: "/images/health360/health360-herbal.png",
  },
  Probiotics: {
    icon: Sprout,
    accentIcon: Shield,
    label: "Probiotics",
    color: "#0f766e",
    accentColor: "#0284c7",
    background: "linear-gradient(135deg, #ccfbf1 0%, #ffffff 50%, #e0f2fe 100%)",
    imageSrc: "/images/health360/health360-probiotics.png",
  },
  "Omega-3": {
    icon: Fish,
    accentIcon: Sparkles,
    label: "Omega-3",
    color: "#1d4ed8",
    accentColor: "#0891b2",
    background: "linear-gradient(135deg, #dbeafe 0%, #ffffff 50%, #cffafe 100%)",
    imageSrc: "/images/health360/health360-omega-3.png",
  },
  Protein: {
    icon: Dumbbell,
    accentIcon: Pill,
    label: "Protein",
    color: "#c2410c",
    accentColor: "#ca8a04",
    background: "linear-gradient(135deg, #ffedd5 0%, #ffffff 50%, #fef9c3 100%)",
    imageSrc: "/images/health360/health360-protein.png",
  },
  Antioxidants: {
    icon: Shield,
    accentIcon: Sparkles,
    label: "Antioxidants",
    color: "#6d28d9",
    accentColor: "#c026d3",
    background: "linear-gradient(135deg, #ede9fe 0%, #ffffff 50%, #fae8ff 100%)",
    imageSrc: "/images/health360/health360-antioxidants.png",
  },
  Sleep: {
    icon: Moon,
    accentIcon: Sparkles,
    label: "Sleep",
    color: "#4338ca",
    accentColor: "#475569",
    background: "linear-gradient(135deg, #e0e7ff 0%, #ffffff 50%, #f1f5f9 100%)",
    imageSrc: "/images/health360/health360-sleep.png",
  },
  Beauty: {
    icon: Sparkles,
    accentIcon: Flower2,
    label: "Beauty",
    color: "#be185d",
    accentColor: "#e11d48",
    background: "linear-gradient(135deg, #fce7f3 0%, #ffffff 50%, #ffe4e6 100%)",
    imageSrc: "/images/health360/health360-beauty.png",
  },
  "Joint Health": {
    icon: Bone,
    accentIcon: Shield,
    label: "Joint Health",
    color: "#44403c",
    accentColor: "#71717a",
    background: "linear-gradient(135deg, #f5f5f4 0%, #ffffff 50%, #f4f4f5 100%)",
    imageSrc: "/images/health360/health360-joint-health.png",
  },
  "Brain Health": {
    icon: Brain,
    accentIcon: Sparkles,
    label: "Brain Health",
    color: "#7e22ce",
    accentColor: "#0284c7",
    background: "linear-gradient(135deg, #f3e8ff 0%, #ffffff 50%, #e0f2fe 100%)",
  },
  "Plant-Based": {
    icon: Flower2,
    accentIcon: Leaf,
    label: "Plant-Based",
    color: "#15803d",
    accentColor: "#047857",
    background: "linear-gradient(135deg, #dcfce7 0%, #ffffff 50%, #d1fae5 100%)",
  },
};

export const categoryIcons: Record<string, LucideIcon> = Object.fromEntries(
  Object.entries(categoryIconConfigs).map(([category, config]) => [category, config.icon])
);

export function getCategoryIcon(category: string): LucideIcon {
  return categoryIconConfigs[category]?.icon || defaultConfig.icon;
}

export function getCategoryImageSrc(category: string): string | undefined {
  return categoryIconConfigs[category]?.imageSrc;
}

export function CategoryIcon({ 
  category, 
  className = "h-12 w-12",
  ...props 
}: { 
  category: string; 
  className?: string;
} & React.ComponentProps<LucideIcon>) {
  const config = categoryIconConfigs[category] || { ...defaultConfig, label: category || defaultConfig.label };
  const IconComponent = config.icon;
  const AccentIcon = config.accentIcon;

  if (config.imageSrc) {
    return (
      <div
        className="relative h-full w-full overflow-hidden rounded-lg bg-muted"
        aria-label={`${config.label} category`}
      >
        <Image
          src={config.imageSrc}
          alt={`${config.label} supplements`}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent" />
        <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-slate-900 shadow-sm">
          {config.label}
        </span>
      </div>
    );
  }
  
  return (
    <div
      className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg"
      style={{ background: config.background }}
      aria-label={`${config.label} category`}
    >
      <div
        className="absolute -left-6 -top-8 h-24 w-24 rounded-full opacity-20"
        style={{ backgroundColor: config.color }}
      />
      <div
        className="absolute -bottom-10 -right-8 h-28 w-28 rounded-full opacity-20"
        style={{ backgroundColor: config.accentColor }}
      />
      <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl bg-white/80 shadow-sm ring-1 ring-black/5">
        <IconComponent 
          className={className}
          style={{ color: config.color }}
          strokeWidth={2}
          {...props}
        />
        <span
          className="absolute -right-2 -top-2 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-black/5"
          aria-hidden="true"
        >
          <AccentIcon className="h-5 w-5" style={{ color: config.accentColor }} strokeWidth={2.1} />
        </span>
      </div>
    </div>
  );
}
