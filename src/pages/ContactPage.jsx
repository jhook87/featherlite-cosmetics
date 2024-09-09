import React from 'react';

const ContactPage = () => {
    return (
        <section className="contact-page container">
            <h1>Contact Us</h1>
            <p>
                If you have any questions, please don’t hesitate to contact us. Our team is happy to assist you with
                any inquiries you may have!
            </p>
            <div className="contact-info">
                <p>Email: <a href="mailto:info@featherlitemakeup.com">info@featherlitemakeup.com</a></p>
                <p>Phone: 1-800-999-9999</p>
                <p>Address: 14039 E. Independence Blvd., Indian Trail, NC</p>
            </div>
            <form className="contact-form">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" placeholder="Your Name" />

                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="Your Email" />

                <label htmlFor="message">Message</label>
                <textarea id="message" placeholder="Your Message"></textarea>

                <button type="submit">Submit</button>
            </form>
        </section>
    );
};

export default ContactPage;
