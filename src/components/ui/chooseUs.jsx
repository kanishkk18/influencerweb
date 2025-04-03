import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';


const FeatureCard = ({ 
  title, 
  description, 
  icon, 
  alignment = 'right',
  className 
}) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className={cn(
        alignment === 'right' 
          ? 'feature-item' 
          : 'feature-item-left',
        className
      )}
    >
      <motion.div 
        variants={item}
        className="feature-icon"
      >
        {icon}
      </motion.div>
      <motion.h3 
        variants={item}
        className="text-xl font-semibold mb-2"
      >
        {title}
      </motion.h3>
      <motion.p 
        variants={item}
        className="text-gray-600 max-w-md"
      >
        {description}
      </motion.p>
    </motion.div>
  );
};

export default FeatureCard;
