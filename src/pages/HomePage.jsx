import React from 'react';
import HeroSection from '../components/HeroSection';
import ProductGrid from '../components/ProductGrid';
import AboutUs from '../components/AboutUs';
import Benefits from '../components/Benefits';
import Testimonials from '../components/Testimonials';

const HomePage = () => {
    return (
        <div>
            <HeroSection />
            <ProductGrid />
            <AboutUs />
            <Benefits />
            <Testimonials />
        </div>
    );
};

export default HomePage;
