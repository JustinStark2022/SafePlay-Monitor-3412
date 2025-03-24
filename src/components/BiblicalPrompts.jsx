import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

const prompts = [
  {
    question: "Why is it important to guard what we see and hear online?",
    insight:
      "Our eyes and ears are gateways to our hearts (Proverbs 4:23). What we consume can shape our thoughts, behavior, and relationship with God. It's important to avoid content that leads us away from righteousness.",
  },
  {
    question: "How can we honor God with our screen time?",
    insight:
      "Ephesians 5:15-16 reminds us to make the most of our time. Choosing uplifting, educational, and kind content over wasteful or harmful entertainment can glorify God in our digital habits.",
  },
  {
    question: "What would Jesus do if He saw someone being unkind in a game?",
    insight:
      "Jesus taught us to love one another and to stand up for what is right (John 13:34). Encouraging kindness and stepping away from negativity honors His teachings.",
  },
  {
    question: "Is this game helping you become more patient, kind, or joyful?",
    insight:
      "The fruits of the Spirit in Galatians 5:22-23 are a great filter for evaluating digital choices. If a game helps grow patience and kindness, it's likely a good fit. If it stirs anger or selfishness, it may need to be reconsidered.",
  },
];

const BiblicalPrompts = () => {
  // We want two cards per slide:
  const visibleCards = 2;
  const totalSlides = Math.ceil(prompts.length / visibleCards);

  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);

  // Wrap nextSlide in useCallback to satisfy the dependency array
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      nextSlide();
    }, 7000);
    return () => clearTimeout(timeoutRef.current);
  }, [currentIndex, nextSlide]);

  const handleMouseEnter = () => clearTimeout(timeoutRef.current);
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      nextSlide();
    }, 7000);
  };

  return (
    <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
      Biblical talks to have with your kids today
      </h3>
      <div 
        className="overflow-hidden" 
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave}
      >
        {/* The slider container: each slide takes full width */}
        <div
          className="grid transition-transform duration-700 ease-in-out"
          style={{
            gridTemplateColumns: `repeat(${totalSlides}, 100%)`,
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {Array.from({ length: totalSlides }).map((_, slideIndex) => (
            <div key={slideIndex} className="grid grid-cols-2 gap-4 w-full flex-shrink-0">
              {prompts
                .slice(slideIndex * visibleCards, slideIndex * visibleCards + visibleCards)
                .map((prompt, idx) => (
                  <motion.div
                    key={idx}
                    className="p-4 rounded-xl border border-gray-300 dark:border-gray-600 shadow bg-gray-50 dark:bg-gray-700"
                  >
                    <h4 className="text-md font-semibold text-primary-700 dark:text-primary-300 mb-2">
                      {prompt.question}
                    </h4>
                    <p className="text-sm text-gray-700 dark:text-gray-200">
                      {prompt.insight}
                    </p>
                  </motion.div>
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BiblicalPrompts;

