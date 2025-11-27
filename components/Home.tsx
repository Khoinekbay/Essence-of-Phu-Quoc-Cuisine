import React from 'react';
import Hero from './Hero';
import { dishes } from '../data/dishes';
import DishCard from './DishCard';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    // Select the first 3 dishes as featured items.
    const featuredDishes = dishes.slice(0, 3);

    return (
        <div>
            <Hero />
            
            {/* Featured Dishes Section */}
            <section className="py-16 sm:py-24 bg-white/50">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="text-center mb-12">
                        <h2 className="font-serif text-4xl md:text-5xl font-bold text-secondary">
                            Món Ăn Tiêu Biểu
                        </h2>
                        <p className="mt-4 text-lg text-neutral-700 max-w-2xl mx-auto">
                            A curated selection of our most iconic dishes, each telling a unique story of Vietnamese flavor.
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredDishes.map(dish => (
                            <DishCard key={dish.id} dish={dish} />
                        ))}
                    </div>

                    <div className="text-center mt-16">
                        <Link 
                            to="/menu"
                            className="inline-block bg-secondary text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-emerald-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                            Xem Toàn Bộ Thực Đơn
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
