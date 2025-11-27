
import React from 'react';

const About: React.FC = () => {
    return (
        <div className="container mx-auto px-4 sm:px-6 py-12">
            <div className="text-center">
                <h1 className="font-serif text-5xl font-bold text-secondary">About Bếp Việt</h1>
                <p className="mt-4 text-lg max-w-3xl mx-auto text-neutral-700">
                    Bếp Việt is a celebration of Vietnamese culinary heritage. Our mission is to share the authentic tastes, rich history, and vibrant culture of our cuisine with the world. This project is a digital showcase, lovingly crafted to honor the stories woven into every dish.
                </p>
            </div>

            <div className="mt-16 max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
                <h2 className="font-serif text-3xl font-bold text-secondary mb-4">Our Philosophy</h2>
                <p className="text-neutral-800 mb-4">
                    We believe food is more than sustenance; it's a connection to our roots, a form of storytelling, and a way to build community. Our selection of dishes represents the diverse "Digital Terroir" of Vietnam—from the imperial kitchens of Huế to the bustling street food stalls of Saigon.
                </p>
                <p className="text-neutral-800">
                    Thank you for joining us on this flavorful journey.
                </p>
            </div>
        </div>
    );
};

export default About;
