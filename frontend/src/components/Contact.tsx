'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { FaWhatsapp, FaPhone, FaEnvelope, FaPaperPlane, FaMapMarkerAlt, FaClock, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const contactInfo = [
    {
        icon: FaPhone,
        label: 'Phone',
        value: '9152510738',
        href: 'tel:+919152510738',
        bgColor: '#dbeafe',
        iconBg: '#3b82f6',
    },
    {
        icon: FaWhatsapp,
        label: 'WhatsApp',
        value: '9820446490',
        href: 'https://wa.me/919820446490?text=Hi%20Bernice%20Tours!%20I%20am%20interested%20in%20your%20passport%20and%20visa%20services.%20Could%20you%20please%20help%20me%20with%20an%20enquiry%3F',
        bgColor: '#dcfce7',
        iconBg: '#22c55e',
    },
    {
        icon: FaEnvelope,
        label: 'Email',
        value: 'bernicepassport@gmail.com',
        href: 'mailto:bernicepassport@gmail.com',
        bgColor: '#fef3c7',
        iconBg: '#f59e0b',
    },
];

export default function Contact() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    // Client-side validation function
    const validateForm = () => {
        const nameRegex = /^[a-zA-Z\s\.\-']+$/;
        if (!formData.name.trim() || !nameRegex.test(formData.name.trim())) {
            return "Please enter a valid name (letters only).";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
        if (!formData.email.trim() || !emailRegex.test(formData.email)) {
            return "Please enter a valid email address (e.g. name@gmail.com).";
        }

        // Phone validation (exactly 10 digits)
        const phoneRegex = /^\d{10}$/;
        if (!formData.phone.trim() || !phoneRegex.test(formData.phone)) {
            return "Please enter a valid 10-digit phone number.";
        }

        if (!formData.service) return "Please select a service.";

        return null;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Run validation first
        const validationError = validateForm();
        if (validationError) {
            setStatus('error');
            setErrorMessage(validationError);
            return;
        }

        setStatus('loading');
        setErrorMessage('');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                // Show success on form
                setStatus('success');
                setFormData({ name: '', email: '', phone: '', service: '', message: '' });
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                setStatus('error');
                setErrorMessage(data.error || 'Failed to send message. Please try again.');
            }
        } catch (error) {
            setStatus('error');
            setErrorMessage('Unable to connect to server. Please try again or contact us directly.');
            console.error('Submission error:', error);
        }
    };

    return (
        <section
            id="contact"
            ref={ref}
            style={{
                padding: '80px 0',
                backgroundColor: '#ffffff',
                borderTop: '1px solid rgba(0,0,0,0.05)',
            }}
        >
            <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    style={{ textAlign: 'center', marginBottom: '48px' }}
                >
                    <p style={{
                        color: '#d97706',
                        fontWeight: '600',
                        marginBottom: '10px',
                        fontSize: '13px',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                    }}>
                        Get In Touch
                    </p>
                    <h2 style={{
                        fontWeight: '700',
                        color: '#1f2937',
                        fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
                        marginBottom: '12px',
                    }}>
                        Let&apos;s Start Your <span className="gradient-text">Journey</span>
                    </h2>
                    <p style={{
                        color: '#6b7280',
                        maxWidth: '500px',
                        margin: '0 auto',
                        fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                        lineHeight: '1.6',
                    }}>
                        Have questions? Reach out and we&apos;ll get back to you within 24 hours.
                    </p>
                </motion.div>

                {/* Content Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '36px',
                }}>
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6 }}
                    >
                        <h3 style={{
                            fontWeight: '700',
                            color: '#1f2937',
                            fontSize: '1.125rem',
                            marginBottom: '24px',
                        }}>
                            Contact Information
                        </h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                            {contactInfo.map((item, index) => (
                                <motion.a
                                    key={index}
                                    href={item.href}
                                    target={item.label === 'WhatsApp' ? '_blank' : undefined}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 0.1 + index * 0.1 }}
                                    whileHover={{ scale: 1.02, x: 5 }}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '16px',
                                        padding: '18px',
                                        backgroundColor: item.bgColor,
                                        borderRadius: '14px',
                                        textDecoration: 'none',
                                    }}
                                >
                                    <div style={{
                                        width: '48px',
                                        height: '48px',
                                        borderRadius: '12px',
                                        backgroundColor: item.iconBg,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <item.icon style={{ color: '#ffffff' }} size={22} />
                                    </div>
                                    <div>
                                        <p style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600', marginBottom: '2px' }}>
                                            {item.label}
                                        </p>
                                        <p style={{ fontWeight: '600', color: '#1f2937', fontSize: '0.95rem' }}>
                                            {item.value}
                                        </p>
                                    </div>
                                </motion.a>
                            ))}
                        </div>

                        {/* Working Hours */}
                        <div style={{
                            marginTop: '24px',
                            padding: '18px',
                            backgroundColor: '#f9fafb',
                            borderRadius: '14px',
                            border: '1px solid #f3f4f6',
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
                                <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <FaClock style={{ color: '#d97706' }} size={16} />
                                </div>
                                <div>
                                    <span style={{ color: '#374151', fontWeight: '600', fontSize: '0.9rem' }}>Working Hours</span>
                                    <p style={{ fontSize: '13px', color: '#6b7280' }}>Mon - Sat: 10 AM - 7 PM</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <FaMapMarkerAlt style={{ color: '#d97706' }} size={16} />
                                </div>
                                <div>
                                    <span style={{ color: '#374151', fontWeight: '600', fontSize: '0.9rem' }}>Location</span>
                                    <p style={{ fontSize: '13px', color: '#6b7280' }}>Mumbai, Maharashtra</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        style={{
                            backgroundColor: '#f9fafb',
                            borderRadius: '16px',
                            padding: '28px',
                            border: '1px solid #f3f4f6',
                        }}
                    >
                        <h3 style={{
                            fontWeight: '700',
                            color: '#1f2937',
                            fontSize: '1.125rem',
                            marginBottom: '24px',
                        }}>
                            Send us a Message
                        </h3>

                        {status === 'success' ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                style={{ textAlign: 'center', padding: '48px 0' }}
                            >
                                <div style={{
                                    width: '72px',
                                    height: '72px',
                                    margin: '0 auto 20px',
                                    borderRadius: '50%',
                                    backgroundColor: '#dcfce7',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <FaCheckCircle size={32} style={{ color: '#22c55e' }} />
                                </div>
                                <h4 style={{ fontWeight: '700', color: '#1f2937', fontSize: '1.25rem', marginBottom: '8px' }}>
                                    Message Sent!
                                </h4>
                                <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>We&apos;ll get back to you soon.</p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                {/* Error Message */}
                                {status === 'error' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '10px',
                                            padding: '12px 16px',
                                            backgroundColor: '#fef2f2',
                                            border: '1px solid #fecaca',
                                            borderRadius: '10px',
                                            marginBottom: '16px',
                                        }}
                                    >
                                        <FaExclamationCircle style={{ color: '#ef4444', flexShrink: 0 }} />
                                        <p style={{ color: '#dc2626', fontSize: '0.85rem' }}>{errorMessage}</p>
                                    </motion.div>
                                )}

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                                    <input
                                        type="text"
                                        placeholder="Your Name *"
                                        required
                                        style={{
                                            width: '100%',
                                            backgroundColor: '#ffffff',
                                            border: '1px solid #e5e7eb',
                                            borderRadius: '12px',
                                            padding: '14px 16px',
                                            color: '#1f2937',
                                            fontSize: '0.9rem',
                                            outline: 'none',
                                        }}
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                    <input
                                        type="email"
                                        placeholder="Email *"
                                        required
                                        style={{
                                            width: '100%',
                                            backgroundColor: '#ffffff',
                                            border: '1px solid #e5e7eb',
                                            borderRadius: '12px',
                                            padding: '14px 16px',
                                            color: '#1f2937',
                                            fontSize: '0.9rem',
                                            outline: 'none',
                                        }}
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                                <input
                                    type="tel"
                                    placeholder="Phone Number *"
                                    required
                                    style={{
                                        width: '100%',
                                        backgroundColor: '#ffffff',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '12px',
                                        padding: '14px 16px',
                                        color: '#1f2937',
                                        fontSize: '0.9rem',
                                        marginBottom: '14px',
                                        outline: 'none',
                                    }}
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                />
                                <select
                                    required
                                    style={{
                                        width: '100%',
                                        backgroundColor: '#ffffff',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '12px',
                                        padding: '14px 16px',
                                        color: '#1f2937',
                                        fontSize: '0.9rem',
                                        marginBottom: '14px',
                                        outline: 'none',
                                    }}
                                    value={formData.service}
                                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                                >
                                    <option value="">Select Service *</option>
                                    <option value="passport-new">New Passport</option>
                                    <option value="passport-renewal">Passport Renewal</option>
                                    <option value="passport-tatkal">Tatkal Passport</option>
                                    <option value="visa">Visa Services</option>
                                    <option value="flight">Flight Booking</option>
                                    <option value="other">Other</option>
                                </select>
                                <textarea
                                    placeholder="Your Message *"
                                    required
                                    rows={4}
                                    style={{
                                        width: '100%',
                                        backgroundColor: '#ffffff',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '12px',
                                        padding: '14px 16px',
                                        color: '#1f2937',
                                        fontSize: '0.9rem',
                                        marginBottom: '18px',
                                        resize: 'none',
                                        outline: 'none',
                                    }}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                />
                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    disabled={status === 'loading'}
                                    style={{
                                        width: '100%',
                                        background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
                                        color: '#ffffff',
                                        fontWeight: '600',
                                        padding: '16px',
                                        borderRadius: '12px',
                                        border: 'none',
                                        cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '10px',
                                        fontSize: '0.95rem',
                                        opacity: status === 'loading' ? 0.7 : 1,
                                    }}
                                >
                                    {status === 'loading' ? (
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                            style={{
                                                width: '22px',
                                                height: '22px',
                                                border: '2px solid #ffffff',
                                                borderTopColor: 'transparent',
                                                borderRadius: '50%',
                                            }}
                                        />
                                    ) : (
                                        <>
                                            <FaPaperPlane size={16} />
                                            Send Message
                                        </>
                                    )}
                                </motion.button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
