import { motion } from 'framer-motion';

interface Connection {
  from: { x: number; y: number };
  to: { x: number; y: number };
  color: string;
}

interface ConstellationLinesProps {
  connections: Connection[];
}

const ConstellationLines = ({ connections }: ConstellationLinesProps) => {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none">
      <defs>
        {connections.map((_, index) => (
          <linearGradient key={`gradient-${index}`} id={`line-gradient-${index}`}>
            <stop offset="0%" stopColor={connections[index].color} stopOpacity="0.3" />
            <stop offset="50%" stopColor={connections[index].color} stopOpacity="0.5" />
            <stop offset="100%" stopColor={connections[index].color} stopOpacity="0.3" />
          </linearGradient>
        ))}
      </defs>
      
      {connections.map((connection, index) => (
        <motion.line
          key={index}
          x1={`${connection.from.x}%`}
          y1={`${connection.from.y}%`}
          x2={`${connection.to.x}%`}
          y2={`${connection.to.y}%`}
          stroke={`url(#line-gradient-${index})`}
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 1.5, 
            delay: 0.5 + index * 0.05,
            ease: [0.16, 1, 0.3, 1]
          }}
        />
      ))}
    </svg>
  );
};

export default ConstellationLines;
