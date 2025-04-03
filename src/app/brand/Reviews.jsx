import React, { useState } from 'react';
import { reviews } from '@/components/assets/influencers';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
const ReviewSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const nextReview = () => {
    setActiveIndex((current) => (current === reviews.length - 1 ? 0 : current + 1));
  };
  
  const prevReview = () => {
    setActiveIndex((current) => (current === 0 ? reviews.length - 1 : current - 1));
  };
  
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <span className="inline-block category-label mb-3">Testimonials</span>
          <h2 className="text-3xl md:text-4xl font-bold">
            What our clients say
          </h2>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Large quote mark */}
          <div className="absolute -top-10 left-0 text-primary/10">
            <Quote size={80} />
          </div>
          
          <div className="relative bg-white rounded-2xl shadow-lg p-8 md:p-12 animate-scale-in">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 border-4 border-white shadow-md">
                <img 
                  src={reviews[activeIndex].imageUrl} 
                  alt={reviews[activeIndex].author} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1">
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      fill={i < reviews[activeIndex].rating ? "currentColor" : "none"} 
                      className={i < reviews[activeIndex].rating ? "text-yellow-400" : "text-gray-300"} 
                    />
                  ))}
                </div>
                
                <blockquote className="text-lg md:text-xl italic text-gray-700 mb-4">
                  "{reviews[activeIndex].content}"
                </blockquote>
                
                <div>
                  <p className="font-semibold text-gray-900">{reviews[activeIndex].author}</p>
                  <p className="text-sm text-gray-500">{reviews[activeIndex].company}</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center mt-8 gap-4">
              <button 
                onClick={prevReview}
                className="p-2 rounded-full bg-gray-100 hover:bg-primary/10 text-gray-600 hover:text-primary transition-colors"
                aria-label="Previous review"
              >
                <ChevronLeft size={20} />
              </button>
              
              <div className="flex gap-2">
                {reviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      index === activeIndex ? "bg-primary scale-125" : "bg-gray-300"
                    }`}
                    aria-label={`Go to review ${index + 1}`}
                  />
                ))}
              </div>
              
              <button 
                onClick={nextReview}
                className="p-2 rounded-full bg-gray-100 hover:bg-primary/10 text-gray-600 hover:text-primary transition-colors"
                aria-label="Next review"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ReviewSection;