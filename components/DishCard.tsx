
import React from 'react';
import { Link } from 'react-router-dom';
import { Dish } from '../types';

interface DishCardProps {
    dish: Dish;
}

const RegionBadge: React.FC<{ region: Dish['region'] }> = ({ region }) => {
    const regionStyles = {
        North: 'bg-accent text-white', // Red for the North's historical flag color
        Central: 'bg-secondary text-white', // Green for the lush central highlands
        South: 'bg-primary text-white', // Amber/Yellow for the fertile Mekong Delta
    };
    return (
        <span className={`absolute top-3 right-3 text-xs font-bold px-2 py-1 rounded-full ${regionStyles[region]}`}>
            {region}
        </span>
    );
};

const DishCard: React.FC<DishCardProps> = ({ dish }) => {
    return (
        <Link to={`/dish/${dish.id}`} className="block group">
            {/* Cultural Design Choice: The card uses large rounded corners (rounded-2xl) and a soft shadow 
                to feel more organic and inviting than a sharp-edged box. */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
                <div className="relative overflow-hidden">
                    <img
                        src={dish.imageUrl}
                        alt={dish.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <RegionBadge region={dish.region} />
                </div>
                <div className="p-6 flex-grow flex flex-col">
                    <h3 className="font-serif text-2xl font-bold text-secondary">{dish.name}</h3>
                    <p className="text-sm text-neutral-700/80 mb-2">{dish.englishName}</p>
                    <p className="text-sm text-neutral-700/90 flex-grow">{dish.description}</p>
                    <div className="mt-4 text-right">
                        <p className="font-sans font-bold text-xl text-primary">
                            {dish.price.toLocaleString('vi-VN')} VND
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default DishCard;
