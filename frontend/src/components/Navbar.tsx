'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaBars, FaTimes, FaPhone } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 50,
                transition: 'all 0.3s ease',
                backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
                backdropFilter: scrolled ? 'blur(12px)' : 'none',
                boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.1)' : 'none',
            }}
        >
            <div
                style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}
                className="sm:px-8 lg:px-12"
            >
                <div className="flex items-center justify-between h-20 sm:h-24">
                    {/* Logo */}
                    <Link href="#home" className="flex items-center gap-3" style={{ textDecoration: 'none' }}>
                        <motion.div
                            whileHover={{ rotate: 15, scale: 1.1 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                            className="relative w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14"
                        >
                            <Image
                                src="/logo.png"
                                alt="Bernice Tours"
                                fill
                                className="object-contain"
                            />
                        </motion.div>
                        <div className="hidden sm:block">
                            <motion.h1
                                className="text-base sm:text-lg lg:text-xl"
                                style={{ fontWeight: '700', color: '#1f2937', margin: 0 }}
                                whileHover={{ color: '#d97706' }}
                            >
                                Bernice Tours
                            </motion.h1>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-2 lg:gap-4">
                        {navLinks.map((link, index) => (
                            <motion.div
                                key={link.name}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 + index * 0.1 }}
                            >
                                <Link
                                    href={link.href}
                                    className="nav-link-hover"
                                    style={{
                                        padding: '12px 20px',
                                        fontSize: '1rem',
                                        fontWeight: '500',
                                        color: '#374151',
                                        textDecoration: 'none',
                                        borderRadius: '10px',
                                        transition: 'all 0.3s ease',
                                        display: 'block',
                                    }}
                                >
                                    {link.name}
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <motion.a
                        href="tel:+919152510738"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                        whileHover={{
                            scale: 1.05,
                            boxShadow: '0 12px 35px rgba(245, 158, 11, 0.4)',
                            y: -2,
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="hidden md:inline-flex items-center gap-2"
                        style={{
                            background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
                            color: '#ffffff',
                            padding: '14px 28px',
                            borderRadius: '9999px',
                            fontSize: '1rem',
                            fontWeight: '600',
                            textDecoration: 'none',
                            boxShadow: '0 4px 20px rgba(245, 158, 11, 0.3)',
                        }}
                    >
                        <motion.span
                            animate={{ rotate: [0, 15, -15, 0] }}
                            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                        >
                            <FaPhone size={14} />
                        </motion.span>
                        Call Now
                    </motion.a>

                    {/* Mobile Menu Button */}
                    <motion.button
                        whileTap={{ scale: 0.9, rotate: 90 }}
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden"
                        style={{
                            padding: '10px',
                            color: '#4b5563',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                        }}
                    >
                        <AnimatePresence mode="wait">
                            {isOpen ? (
                                <motion.span
                                    key="close"
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <FaTimes size={26} />
                                </motion.span>
                            ) : (
                                <motion.span
                                    key="menu"
                                    initial={{ rotate: 90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: -90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <FaBars size={26} />
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </motion.button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0, y: -20 }}
                            animate={{ opacity: 1, height: 'auto', y: 0 }}
                            exit={{ opacity: 0, height: 0, y: -20 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="md:hidden"
                            style={{
                                overflow: 'hidden',
                                backgroundColor: '#ffffff',
                                borderRadius: '0 0 20px 20px',
                                boxShadow: '0 15px 40px rgba(0,0,0,0.15)',
                            }}
                        >
                            <div style={{ padding: '20px' }}>
                                {navLinks.map((link, index) => (
                                    <motion.div
                                        key={link.name}
                                        initial={{ opacity: 0, x: -30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={() => setIsOpen(false)}
                                            style={{
                                                display: 'block',
                                                padding: '16px 20px',
                                                color: '#374151',
                                                fontSize: '1.125rem',
                                                fontWeight: '500',
                                                textDecoration: 'none',
                                                borderRadius: '12px',
                                                marginBottom: '8px',
                                                transition: 'all 0.3s ease',
                                            }}
                                            className="hover:bg-amber-50 hover:text-amber-600"
                                        >
                                            {link.name}
                                        </Link>
                                    </motion.div>
                                ))}
                                <motion.a
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    href="tel:+919152510738"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '10px',
                                        marginTop: '16px',
                                        background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
                                        color: '#ffffff',
                                        padding: '16px',
                                        borderRadius: '14px',
                                        fontSize: '1.125rem',
                                        fontWeight: '600',
                                        textDecoration: 'none',
                                        boxShadow: '0 4px 20px rgba(245, 158, 11, 0.3)',
                                    }}
                                >
                                    <FaPhone size={16} />
                                    Call Now
                                </motion.a>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
}
