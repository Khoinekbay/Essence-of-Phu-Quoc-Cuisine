
import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { dishes } from '../data/dishes';

const SpicinessIndicator: React.FC<{ level: number }> = ({ level }) => (
    <div className="flex items-center gap-1">
        <span className="font-semibold text-sm mr-2">Spiciness:</span>
        {Array.from({ length: 3 }).map((_, i) => (
            <i
                key={i}
                className={`fa-solid fa-pepper-hot ${i < level ? 'text-accent' : 'text-neutral-700/20'}`}
                title={`${level}/3 spicy`}
            ></i>
        ))}
    </div>
);

const DishDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dish = dishes.find(d => d.id === id);

    if (!dish) {
        // If no dish is found for the given id, redirect to the menu.
        return <Navigate to="/menu" replace />;
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 py-12">
            <div className="mb-8">
                <Link to="/menu" className="text-secondary font-semibold hover:underline">
                    &larr; Back to Menu
                </Link>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                {/* Left: Image */}
                <div className="rounded-2xl overflow-hidden shadow-lg">
                    <img src={dish.imageUrl} alt={dish.name} className="w-full h-full object-cover" />
                </div>

                {/* Right: Content */}
                <div>
                    <h1 className="font-serif text-5xl font-bold text-secondary">{dish.name}</h1>
                    <p className="text-lg text-neutral-700/80 mb-4">{dish.englishName}</p>

                    <p className="font-sans font-bold text-3xl text-primary mb-6">
                        {dish.price.toLocaleString('vi-VN')} VND
                    </p>

                    <div className="mb-6">
                        <SpicinessIndicator level={dish.spicinessLevel} />
                    </div>

                    <div className="max-w-none text-neutral-800 space-y-6">
                        <div>
                            <h2 className="font-serif text-2xl font-semibold text-secondary/90 mb-2">The Story</h2>
                            {/* Cultural Design Choice: The story is italicized to separate it as a narrative element. */}
                            <p className="italic leading-relaxed">{dish.story}</p>
                        </div>

                        <div>
                            <h2 className="font-serif text-2xl font-semibold text-secondary/90 mb-3">Key Ingredients</h2>
                            <div className="flex flex-wrap gap-2">
                                {dish.ingredients.map(ingredient => (
                                    <span key={ingredient} className="bg-secondary/10 text-secondary font-semibold px-3 py-1 rounded-full text-sm">
                                        {ingredient}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DishDetail;
