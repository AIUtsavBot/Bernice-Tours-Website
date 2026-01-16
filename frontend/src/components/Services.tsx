'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaPassport, FaPlane, FaGlobe, FaArrowRight } from 'react-icons/fa';

const services = [
    {
        icon: FaPassport,
        title: 'Passport Services',
        description: 'Fresh passport applications, renewals, name changes, and Tatkal service.',
        features: ['New Applications', 'Renewals', 'Tatkal'],
        bgColor: '#fef3c7',
        iconBg: '#fcd34d',
        iconColor: '#b45309',
    },
    {
        icon: FaGlobe,
        title: 'Visa Assistance',
        description: 'Expert guidance for tourist, business, student, and work visas.',
        features: ['Tourist Visa', 'Business Visa', 'Work Permit'],
        bgColor: '#ffedd5',
        iconBg: '#fdba74',
        iconColor: '#c2410c',
    },
    {
        icon: FaPlane,
        title: 'Flight Booking',
        description: 'Best deals on domestic and international flights with 24/7 support.',
        features: ['Domestic', 'International', 'Best Prices'],
        bgColor: '#fef9c3',
        iconBg: '#fde047',
        iconColor: '#a16207',
    },
];

export default function Services() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });

    return (
        <section
            id="services"
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
                        What We Offer
                    </p>
                    <h2 style={{
                        fontWeight: '700',
                        color: '#1f2937',
                        fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
                        marginBottom: '12px',
                    }}>
                        Our Premium <span className="gradient-text">Services</span>
                    </h2>
                    <p style={{
                        color: '#6b7280',
                        maxWidth: '500px',
                        margin: '0 auto',
                        fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                        lineHeight: '1.6',
                    }}>
                        End-to-end travel documentation services for your journey.
                    </p>
                </motion.div>

                {/* Services Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '24px',
                }}>
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.12)' }}
                            style={{
                                backgroundColor: service.bgColor,
                                borderRadius: '16px',
                                padding: '28px',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                            }}
                        >
                            {/* Icon */}
                            <motion.div
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.5 }}
                                style={{
                                    width: '56px',
                                    height: '56px',
                                    backgroundColor: service.iconBg,
                                    borderRadius: '14px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '18px',
                                }}
                            >
                                <service.icon size={26} style={{ color: service.iconColor }} />
                            </motion.div>

                            {/* Title */}
                            <h3 style={{
                                fontWeight: '700',
                                color: '#1f2937',
                                fontSize: '1.125rem',
                                marginBottom: '10px',
                            }}>
                                {service.title}
                            </h3>

                            {/* Description */}
                            <p style={{
                                color: '#6b7280',
                                fontSize: '0.9rem',
                                lineHeight: '1.6',
                                marginBottom: '16px',
                            }}>
                                {service.description}
                            </p>

                            {/* Features */}
                            <div style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '8px',
                                marginBottom: '18px',
                            }}>
                                {service.features.map((feature, i) => (
                                    <span
                                        key={i}
                                        style={{
                                            fontSize: '12px',
                                            backgroundColor: 'rgba(255,255,255,0.9)',
                                            color: '#4b5563',
                                            padding: '6px 12px',
                                            borderRadius: '20px',
                                            fontWeight: '500',
                                        }}
                                    >
                                        {feature}
                                    </span>
                                ))}
                            </div>

                            {/* Learn More */}
                            <motion.a
                                href="#contact"
                                whileHover={{ x: 5 }}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    color: service.iconColor,
                                    fontWeight: '600',
                                    fontSize: '0.9rem',
                                    textDecoration: 'none',
                                }}
                            >
                                Learn More <FaArrowRight size={12} />
                            </motion.a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
