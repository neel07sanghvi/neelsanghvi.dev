import { motion } from "framer-motion";

interface SkillNodeProps {
  name: string;
  category: string;
  color: string;
  size?: "sm" | "md" | "lg";
  x: number;
  y: number;
  delay?: number;
  isHovered?: boolean;
  isConnected?: boolean;
  onHover?: () => void;
  onLeave?: () => void;
}

const sizeClasses = {
  sm: "w-2 h-2",
  md: "w-3 h-3",
  lg: "w-4 h-4",
};

const glowSizes = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
};

const SkillNode = ({
  name,
  color,
  size = "md",
  x,
  y,
  delay = 0,
  isHovered = false,
  isConnected = false,
  onHover,
  onLeave,
}: SkillNodeProps) => {
  const scale = isHovered ? 1.4 : isConnected ? 1.2 : 1;
  const glowOpacity = isHovered ? 0.9 : isConnected ? 0.6 : 0.4;

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        zIndex: isHovered ? 20 : 10,
      }}
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <motion.div
        className="relative flex flex-col items-center"
        style={{ transform: "translate(-50%, -50%)" }}
        animate={{ scale }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Outer glow */}
        <motion.div
          className={`absolute rounded-full blur-md ${glowSizes[size]}`}
          style={{
            backgroundColor: color,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          animate={{ opacity: glowOpacity }}
          transition={{ duration: 0.3 }}
        />

        {/* Core star */}
        <div
          className={`rounded-full ${sizeClasses[size]}`}
          style={{
            backgroundColor: color,
            boxShadow: isHovered
              ? `0 0 20px ${color}, 0 0 40px ${color}`
              : isConnected
                ? `0 0 15px ${color}`
                : `0 0 10px ${color}`,
          }}
        />

        {/* Inner bright core */}
        <div
          className="absolute w-1 h-1 rounded-full bg-white/80"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Label */}
        <span
          className="mt-2 text-[10px] font-medium whitespace-nowrap pointer-events-none"
          style={{
            color: color,
            opacity: isHovered ? 1 : isConnected ? 0.9 : 0.7,
            textShadow: "0 1px 4px rgba(0,0,0,0.8)",
          }}
        >
          {name}
        </span>
      </motion.div>
    </motion.div>
  );
};

export default SkillNode;
