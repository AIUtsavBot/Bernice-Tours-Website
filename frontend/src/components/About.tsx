'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { FaShieldAlt, FaClock, FaUsers, FaAward } from 'react-icons/fa';

const highlights = [
    { icon: FaClock, text: '15+ Years', color: '#f59e0b' },
    { icon: FaUsers, text: '50K+ Clients', color: '#22c55e' },
    { icon: FaShieldAlt, text: '100% Safe', color: '#3b82f6' },
    { icon: FaAward, text: 'Expert Team', color: '#8b5cf6' },
];

const steps = [
    { num: '1', title: 'Contact Us' },
    { num: '2', title: 'Submit Docs' },
    { num: '3', title: 'We Process' },
    { num: '4', title: 'Get Delivered' },
];

export default function About() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });

    return (
        <section
            id="about"
            ref={ref}
            style={{
                padding: '80px 0',
                background: 'linear-gradient(180deg, #fffbeb 0%, #fff7ed 100%)',
                borderTop: '1px solid rgba(0,0,0,0.05)',
            }}
        >
            <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
                {/* Main Content */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '48px',
                    alignItems: 'center',
                }}>
                    {/* Left - Logo */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        style={{ display: 'flex', justifyContent: 'center' }}
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            style={{
                                position: 'relative',
                                width: 'clamp(180px, 35vw, 260px)',
                                height: 'clamp(180px, 35vw, 260px)',
                            }}
                        >
                            {/* Rotating ring */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                                style={{
                                    position: 'absolute',
                                    inset: '-12px',
                                    border: '2px dashed rgba(245, 158, 11, 0.3)',
                                    borderRadius: '20px',
                                }}
                            />
                            {/* Main container */}
                            <div style={{
                                width: '100%',
                                height: '100%',
                                background: 'linear-gradient(135deg, #fef3c7 0%, #ffedd5 100%)',
                                borderRadius: '20px',
                                overflow: 'hidden',
                                position: 'relative',
                                boxShadow: '0 15px 40px rgba(245, 158, 11, 0.2)',
                            }}>
                                <Image
                                    src="/logo.png"
                                    alt="Bernice Tours"
                                    fill
                                    className="object-contain p-6"
                                />
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right - Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        style={{ textAlign: 'center' }}
                        className="lg:text-left"
                    >
                        <p style={{
                            color: '#d97706',
                            fontWeight: '600',
                            marginBottom: '10px',
                            fontSize: '13px',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                        }}>
                            About Us
                        </p>
                        <h2 style={{
                            fontWeight: '700',
                            color: '#1f2937',
                            fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
                            marginBottom: '16px',
                        }}>
                            Your Trusted <span className="gradient-text">Travel Partner</span>
                        </h2>
                        <p style={{
                            color: '#6b7280',
                            fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                            lineHeight: '1.7',
                            marginBottom: '28px',
                        }}>
                            Since 2009, <strong style={{ color: '#374151' }}>Bernice Tours</strong> has been
                            Mumbai&apos;s preferred choice for passport and visa services. Over 50,000 happy travelers served.
                        </p>

                        {/* Highlights */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gap: '14px',
                        }}>
                            {highlights.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 0.2 + index * 0.1 }}
                                    whileHover={{ scale: 1.03, y: -3 }}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        backgroundColor: '#ffffff',
                                        padding: '14px',
                                        borderRadius: '12px',
                                        border: '1px solid #f3f4f6',
                                        cursor: 'pointer',
                                    }}
                                >
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '10px',
                                        backgroundColor: `${item.color}15`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0,
                                    }}>
                                        <item.icon size={18} style={{ color: item.color }} />
                                    </div>
                                    <span style={{
                                        color: '#374151',
                                        fontWeight: '600',
                                        fontSize: '0.85rem',
                                    }}>
                                        {item.text}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* How It Works */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    style={{ marginTop: '72px' }}
                >
                    <div style={{ textAlign: 'center', marginBottom: '36px' }}>
                        <h3 style={{
                            fontWeight: '700',
                            color: '#1f2937',
                            fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
                        }}>
                            How It <span className="gradient-text">Works</span>
                        </h3>
                        <p style={{ color: '#6b7280', fontSize: '0.9rem', marginTop: '8px' }}>
                            Simple 4-step process
                        </p>
                    </div>

                    {/* Steps Container */}
                    <div style={{
                        backgroundColor: '#ffffff',
                        borderRadius: '16px',
                        padding: '32px 24px',
                        boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
                        border: '1px solid #f3f4f6',
                        maxWidth: '800px',
                        margin: '0 auto',
                    }}>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(4, 1fr)',
                            gap: '16px',
                        }}>
                            {steps.map((step, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                    transition={{ delay: 0.4 + index * 0.1 }}
                                    whileHover={{ y: -5 }}
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        textAlign: 'center',
                                        cursor: 'pointer',
                                    }}
                                >
                                    <motion.div
                                        whileHover={{ rotate: 360 }}
                                        transition={{ duration: 0.5 }}
                                        style={{
                                            width: '52px',
                                            height: '52px',
                                            borderRadius: '50%',
                                            background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: '#ffffff',
                                            fontWeight: '700',
                                            fontSize: '1.125rem',
                                            boxShadow: '0 4px 15px rgba(245, 158, 11, 0.3)',
                                            marginBottom: '12px',
                                        }}
                                    >
                                        {step.num}
                                    </motion.div>
                                    <p style={{
                                        color: '#1f2937',
                                        fontWeight: '600',
                                        fontSize: '0.85rem',
                                    }}>
                                        {step.title}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
