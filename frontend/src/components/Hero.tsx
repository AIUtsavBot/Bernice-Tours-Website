'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaArrowRight, FaCheckCircle } from 'react-icons/fa';

export default function Hero() {
    return (
        <section
            id="home"
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                paddingTop: '80px',
                paddingBottom: '40px',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Background Decorations */}
            <div style={{
                position: 'absolute',
                top: '-100px',
                right: '-100px',
                width: '400px',
                height: '400px',
                background: 'radial-gradient(circle, rgba(251, 191, 36, 0.3) 0%, transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(60px)',
            }} />

            {/* Main Container */}
            <div style={{
                maxWidth: '1100px',
                margin: '0 auto',
                padding: '0 20px',
                width: '100%',
            }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '40px',
                    alignItems: 'center',
                }}>
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        style={{ textAlign: 'center' }}
                        className="lg:text-left"
                    >
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                backgroundColor: '#fef3c7',
                                color: '#b45309',
                                padding: '8px 16px',
                                borderRadius: '20px',
                                fontSize: '12px',
                                fontWeight: '600',
                                marginBottom: '20px',
                            }}
                        >
                            <FaCheckCircle size={12} />
                            Trusted by 10,000+ Travelers
                        </motion.div>

                        {/* Heading */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            style={{
                                fontWeight: '700',
                                color: '#1f2937',
                                fontSize: 'clamp(1.75rem, 5vw, 3rem)',
                                lineHeight: '1.15',
                                marginBottom: '16px',
                            }}
                        >
                            Your Travel Partner for{' '}
                            <span className="gradient-text">Passport & Visa</span>
                        </motion.h1>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            style={{
                                color: '#6b7280',
                                fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
                                lineHeight: '1.7',
                                marginBottom: '24px',
                                maxWidth: '450px',
                                margin: '0 auto 24px',
                            }}
                            className="lg:mx-0"
                        >
                            Quick passport services, hassle-free visas, and best flight deals.
                            We handle the paperwork so you can focus on your journey.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '12px',
                                justifyContent: 'center',
                                marginBottom: '32px',
                            }}
                            className="lg:justify-start"
                        >
                            <motion.a
                                href="#services"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '12px 24px',
                                    background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
                                    color: '#ffffff',
                                    borderRadius: '30px',
                                    fontWeight: '600',
                                    fontSize: '0.9rem',
                                    textDecoration: 'none',
                                    boxShadow: '0 4px 15px rgba(245, 158, 11, 0.3)',
                                }}
                            >
                                Explore Services <FaArrowRight size={14} />
                            </motion.a>
                            <motion.a
                                href="#contact"
                                whileHover={{ scale: 1.05, borderColor: '#f59e0b' }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    padding: '12px 24px',
                                    border: '2px solid #e5e7eb',
                                    color: '#374151',
                                    borderRadius: '30px',
                                    fontWeight: '600',
                                    fontSize: '0.9rem',
                                    textDecoration: 'none',
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                Get Free Quote
                            </motion.a>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                gap: '32px',
                                paddingTop: '24px',
                                borderTop: '1px solid #e5e7eb',
                            }}
                            className="lg:justify-start"
                        >
                            {[
                                { value: '15+', label: 'Years' },
                                { value: '50K+', label: 'Clients' },
                                { value: '100+', label: 'Countries' },
                            ].map((stat) => (
                                <motion.div
                                    key={stat.label}
                                    whileHover={{ scale: 1.1 }}
                                    style={{ textAlign: 'center', cursor: 'pointer' }}
                                >
                                    <div style={{
                                        fontWeight: '700',
                                        color: '#1f2937',
                                        fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
                                    }}>
                                        {stat.value}
                                    </div>
                                    <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                                        {stat.label}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Right Content - Logo */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <motion.div
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                            style={{
                                position: 'relative',
                                width: 'clamp(180px, 40vw, 280px)',
                                height: 'clamp(180px, 40vw, 280px)',
                            }}
                        >
                            {/* Rotating ring */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                                style={{
                                    position: 'absolute',
                                    inset: '-15px',
                                    border: '2px dashed rgba(245, 158, 11, 0.3)',
                                    borderRadius: '50%',
                                }}
                            />
                            {/* Glow background */}
                            <div style={{
                                position: 'absolute',
                                inset: '10px',
                                background: 'linear-gradient(135deg, #fef3c7 0%, #ffedd5 100%)',
                                borderRadius: '50%',
                                boxShadow: '0 20px 50px rgba(245, 158, 11, 0.25)',
                            }} />
                            <Image
                                src="/logo.png"
                                alt="Bernice Tours N Travels"
                                fill
                                className="object-contain p-6"
                                priority
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
