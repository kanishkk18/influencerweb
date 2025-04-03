import React from 'react';
import { 
  Cat, GamepadIcon, Dumbbell, VideoIcon, BookOpen, Camera, 
  Plane, Paintbrush, Shirt, Coffee, Music, Heart, 
  ShoppingBag, Utensils, Baby, Globe
} from 'lucide-react';
import { motion } from 'framer-motion';
import  Link from "next/link";
import { cn } from '@/lib/utils';

const CategoryCard = ({ icon, title, link, delay = 0 }) => {
  return (
    <Link href={link}>
      <motion.div 
        className="border rounded-xl shadow-sm hover:shadow-md transition-all duration-300 h-full"
        whileHover={{ 
          scale: 1.05, 
          y: -5,
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.08)" 
        }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: delay * 0 }}
      >
        <div className="p-6 flex flex-col items-center justify-center h-full">
          <motion.div 
            className="w-16 h-16 flex items-center justify-center feature-icon rounded-full mb-4 text-primary"
            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5 }}
          >
            {icon}
          </motion.div>
          <h3 className="text-center text-gray-800 dark:text-gray-100 font-medium">{title}</h3>
        </div>
      </motion.div>
    </Link>
  );
};



const Categories = ({ variant = 'grid', className }) => {
  const categories = [
    { icon: <Cat size={28} strokeWidth={2.5} />, title: 'Pet', link: '/category/pet' },
    { icon: <GamepadIcon size={28} strokeWidth={2.5} />, title: 'Gaming', link: '/' },
    { icon: <Dumbbell size={28} strokeWidth={2.5} />, title: 'Fitness', link: '/' },
    { icon: <VideoIcon size={28} strokeWidth={2.5} />, title: 'Vlogging', link: '/' },
    { icon: <BookOpen size={28} strokeWidth={2.5} />, title: 'Books', link: '/' },
    { icon: <Camera size={28} strokeWidth={2.5} />, title: 'Photography', link: '/' },
    { icon: <Plane size={28} strokeWidth={2.5} />, title: 'Travel', link: '/' },
    { icon: <Heart size={28} strokeWidth={2.5} />, title: 'Beauty', link: '/' },
    { icon: <Baby size={28} strokeWidth={2.5} />, title: 'Parenting', link: '/' },
    { icon: <Utensils size={28} strokeWidth={2.5} />, title: 'Food', link: '/' },
    { icon: <Shirt size={28} strokeWidth={2.5} />, title: 'Fashion', link: '/' },
    { icon: <Music size={28} strokeWidth={2.5} />, title: 'Music', link: '/' },
    { icon: <Paintbrush size={28} strokeWidth={2.5} />, title: 'Art', link: '/' },
    { icon: <Coffee size={28} strokeWidth={2.5} />, title: 'Lifestyle', link: '/' },
    { icon: <Globe size={28} strokeWidth={2.5} />, title: 'Travel', link: '/' },
    { icon: <ShoppingBag size={28} strokeWidth={2.5} />, title: 'Shopping', link: '/' },
  ];

  // Get only the first 12 categories to display
  const displayCategories = categories.slice(0, 12);

  return (
    <div className={cn("w-full", className)}>
      {variant === 'featured' && (
        <motion.div 
          className="text-center mb-12 relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="absolute left-1/4 -top-12 opacity-70 hidden md:block"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 0.7, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img src="https://i.pinimg.com/736x/40/e4/e1/40e4e1cbf52729cc90cfd6e221ccdb7e.jpg" alt="Decorator" className="w-16 h-auto rounded-sm" />
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="bg-gradient-to-r from-[#A531DC] to-[#4300B1] bg-clip-text text-transparent">Pick</span>
            <span className="text-primary"> Your own Category</span>
          </h2>
          
          <motion.div 
            className="absolute right-1/4 -top-12 opacity-70 hidden md:block"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 0.7, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img src="https://i.pinimg.com/736x/f5/5c/f9/f55cf9ce666fb40bde1e203506ef0ea4.jpg" alt="Decorator" className="w-16 h-auto rounded-sm transform scale-x-[-1]" />
          </motion.div>
        </motion.div>
      )}
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
        {displayCategories.map((category, index) => (
          <CategoryCard 
            key={index}
            icon={category.icon}
            title={category.title}
            link={category.link}
            delay={index}
          />
        ))}
      </div>
    </div>
  );
};

export default Categories;