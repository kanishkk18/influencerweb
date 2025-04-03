

import React, { useEffect } from 'react';
import Navbar from './navbar';
import Hero from './hero';
import InfluencerCategory from './InfluencerCategory';
import ReviewSection from './Reviews';
import { influencers } from '@/components/assets/influencers';
import { ArrowDown } from 'lucide-react';
const Index = () => {
  // Add a fade-in effect to sections as they appear in the viewport
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('appear');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal-section').forEach(section => {
      observer.observe(section);
    });
    return () => {
      document.querySelectorAll('.reveal-section').forEach(section => {
        observer.unobserve(section);
      });
    };
  }, []);
  
  return (
    <div className="min-h-screen w-full
flex items-center justify-center 
bg-gray-100">
    <div className="min-h-screen 
bg-white">
      <div className="text-center">
      <Navbar/>
            
</div>
        
<Hero />
        
        <div className="flex justify-center my-4">
          <div className="animate-bounce text-gray-400">
            <ArrowDown size={24} />
          </div>
        </div>
        
        <section className="section-container reveal-section opacity-0 transition-opacity duration-1000" id="influencers">
          <div className="text-center mb-12">
            <span className="inline-block category-label mb-3">Browse Our Network</span>
            <h2 className="section-title">Find Your Perfect Influencer Match</h2>
          </div>
          
          <InfluencerCategory platform="instagram" influencers={influencers} />
          <InfluencerCategory platform="youtube" influencers={influencers} />
        </section>
        
        <div className="max-w-7xl mx-auto px-4">
          <hr className="my-12 border-gray-100" />
        </div>
        
        <div className="reveal-section opacity-0 transition-opacity duration-1000">
          <ReviewSection />
        </div>
   
      
      <footer className="bg-gray-50 py-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400 mb-4">
             Influewebhub marketplace
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Connect with the perfect influencers to elevate your brand
            </p>
            <div className="flex justify-center space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                Terms
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                Privacy
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                Contact
              </a>
            </div>
            <p className="mt-8 text-sm text-gray-400">
              © {new Date().getFullYear()} Influewebhub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
      
      <style jsx>{`
        .reveal-section.appear {
          opacity: 1;
        }
      `}</style>
    </div>
    </div>
   
  );}

export default Index;
