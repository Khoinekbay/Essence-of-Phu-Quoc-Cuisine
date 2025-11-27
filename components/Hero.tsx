import React from 'react';
import { Link } from 'react-router-dom';
import { images } from '../data/images';

const Hero: React.FC = () => {
    return (
        <section className="relative h-[calc(100vh-80px)] min-h-[500px] flex items-center justify-center text-center text-white">
            {/* Background Image */}
            <div className="absolute inset-0">
                <img 
                    src={images.hero} 
                    alt="A vibrant feast of Vietnamese cuisine"
                    className="w-full h-full object-cover"
                />
                {/* Overlay for text readability */}
                <div className="absolute inset-0 bg-black/50"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 p-4">
                <h1 className="font-serif text-5xl md:text-7xl font-bold">
                    {/* Cultural Design Choice: This phrase means "The Essence of Vietnamese Cuisine," conveying authenticity and quality. */}
                    Tinh Hoa Ẩm Thực Việt
                </h1>
                <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-white/90">
                    Discover the rich flavors, fresh ingredients, and cultural stories behind Vietnam's most beloved dishes.
                </p>
                <Link
                    to="/menu"
                    className="mt-8 inline-block bg-primary text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-amber-500 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                    Khám Phá Menu
                </Link>
            </div>
        </section>
    );
};

export default Hero;