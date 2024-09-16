import React, { useState } from 'react';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [errors, setErrors] = useState({});
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [id]: value
        }));
    };

    const validateForm = () => {
        let newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid";
        }
        if (!formData.message.trim()) newErrors.message = "Message is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            setSubmitStatus('submitting');
            try {
                // Here you would typically send the data to your backend
                // For now, we'll just simulate an API call
                await new Promise(resolve => setTimeout(resolve, 1000));
                setSubmitStatus('success');
                setFormData({ name: '', email: '', message: '' });
            } catch (error) {
                console.error('Error submitting form:', error);
                setSubmitStatus('error');
            }
        }
    };

    return (
        <section className="contact-page container">
            <h1>Contact Us</h1>
            <p>
                If you have any questions, please don't hesitate to contact us. Our team is happy to assist you with
                any inquiries you may have!
            </p>
            <div className="contact-info">
                <p>Email: <a href="mailto:info@featherlitemakeup.com">info@featherlitemakeup.com</a></p>
                <p>Phone: 1-800-999-9999</p>
                <p>Address: 14039 E. Independence Blvd., Indian Trail, NC</p>
            </div>
            <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                    />
                    {errors.name && <span className="error">{errors.name}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your Email"
                    />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                        id="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Your Message"
                    ></textarea>
                    {errors.message && <span className="error">{errors.message}</span>}
                </div>

                <button type="submit" disabled={submitStatus === 'submitting'}>
                    {submitStatus === 'submitting' ? 'Submitting...' : 'Submit'}
                </button>

                {submitStatus === 'success' && (
                    <p className="success-message">Thank you for your message. We'll get back to you soon!</p>
                )}
                {submitStatus === 'error' && (
                    <p className="error-message">There was an error submitting your message. Please try again.</p>
                )}
            </form>
        </section>
    );
};

export default ContactPage;