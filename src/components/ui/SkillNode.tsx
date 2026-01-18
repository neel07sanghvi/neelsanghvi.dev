import { motion } from "framer-motion";
import { useState } from "react";

interface SkillNodeProps {
  name: string;
  category: string;
  color: string;
  size?: "sm" | "md" | "lg";
  x: number;
  y: number;
  delay?: number;
}

const sizeClasses = {
  sm: { dot: 6, glow: 12 },
  md: { dot: 10, glow: 20 },
  lg: { dot: 14, glow: 28 },
};

const SkillNode = ({ name, color, size = "md", x, y, delay = 0 }: SkillNodeProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const dimensions = sizeClasses[size];

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        // Center the entire node container at the coordinate
        transform: "translate(-50%, -50%)",
      }}
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="flex flex-col items-center"
        animate={{ scale: isHovered ? 1.3 : 1 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Glow effect */}
        <div
          className="absolute rounded-full blur-md"
          style={{
            width: dimensions.glow,
            height: dimensions.glow,
            backgroundColor: color,
            opacity: isHovered ? 0.8 : 0.4,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Core dot - this is the visual center that lines connect to */}
        <div
          className="rounded-full relative z-10"
          style={{
            width: dimensions.dot,
            height: dimensions.dot,
            backgroundColor: color,
            boxShadow: isHovered
              ? `0 0 20px ${color}, 0 0 40px ${color}`
              : `0 0 10px ${color}`,
          }}
        />

        {/* Label below the dot */}
        <span
          className="mt-2 text-[10px] font-medium whitespace-nowrap pointer-events-none absolute"
          style={{
            color: color,
            opacity: isHovered ? 1 : 0.8,
            top: "100%",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          {name}
        </span>
      </motion.div>
    </motion.div>
  );
};

export default SkillNode;
