import React from 'react';

const Testimonials = () => {
    const testimonials = [
        { name: 'Emily S.', review: 'FeatherLite’s foundation has transformed my skin!' },
        { name: 'Sarah K.', review: 'I love that I can trust the ingredients.' },
        { name: 'Jessica L.', review: 'The natural look I get is unmatched!' }
    ];

    return (
        <section className="testimonials">
            <h2>What Our Customers Are Saying</h2>
            <div className="testimonials-carousel">
                {testimonials.map((testimonial, index) => (
                    <div key={index} className="testimonial">
                        <p>{testimonial.review}</p>
                        <span>- {testimonial.name}</span>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Testimonials;
