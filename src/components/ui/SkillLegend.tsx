import { motion } from 'framer-motion';

interface Category {
  name: string;
  color: string;
  count: number;
}

interface SkillLegendProps {
  categories: Category[];
  activeCategory: string | null;
  onCategoryHover: (category: string | null) => void;
}

const SkillLegend = ({ categories, activeCategory, onCategoryHover }: SkillLegendProps) => {
  return (
    <motion.div 
      className="flex flex-wrap justify-center gap-4 md:gap-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      {categories.map((category, index) => (
        <motion.button
          key={category.name}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 ${
            activeCategory === null || activeCategory === category.name
              ? 'opacity-100'
              : 'opacity-40'
          }`}
          style={{
            borderColor: `${category.color}40`,
            backgroundColor: activeCategory === category.name ? `${category.color}20` : 'transparent',
          }}
          onMouseEnter={() => onCategoryHover(category.name)}
          onMouseLeave={() => onCategoryHover(null)}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
          whileHover={{ scale: 1.05 }}
        >
          <span 
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: category.color }}
          />
          <span 
            className="text-xs font-mono"
            style={{ color: category.color }}
          >
            {category.name}
          </span>
          <span className="text-xs text-muted-foreground">
            ({category.count})
          </span>
        </motion.button>
      ))}
    </motion.div>
  );
};

export default SkillLegend;
