
import React, { useState, useMemo } from 'react';
import { dishes } from '../data/dishes';
import { Dish } from '../types';
import DishCard from './DishCard';

type RegionFilter = 'All' | 'North' | 'Central' | 'South';

const Menu: React.FC = () => {
    const [filter, setFilter] = useState<RegionFilter>('All');

    const filteredDishes = useMemo(() => {
        if (filter === 'All') {
            return dishes;
        }
        return dishes.filter(dish => dish.region === filter);
    }, [filter]);

    const FilterButton: React.FC<{ region: RegionFilter }> = ({ region }) => {
        const isActive = filter === region;
        return (
            <button
                onClick={() => setFilter(region)}
                className={`px-4 py-2 rounded-full font-semibold transition-colors duration-300 min-h-[44px] ${
                    isActive ? 'bg-secondary text-white shadow-md' : 'bg-white text-neutral-700 hover:bg-gray-100'
                }`}
            >
                {region}
            </button>
        );
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 py-12">
            <div className="text-center mb-12">
                <h1 className="font-serif text-5xl font-bold text-secondary">Our Menu</h1>
                <p className="mt-2 text-lg text-neutral-700">A journey through the flavors of Vietnam</p>
            </div>

            {/* Filter Bar */}
            <div className="flex justify-center items-center gap-2 md:gap-4 mb-12 flex-wrap">
                <FilterButton region="All" />
                <FilterButton region="North" />
                <FilterButton region="Central" />
                <FilterButton region="South" />
            </div>

            {/* Dishes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredDishes.map(dish => (
                    <DishCard key={dish.id} dish={dish} />
                ))}
            </div>
        </div>
    );
};

export default Menu;
