'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaPhone, FaEnvelope, FaHeart, FaWhatsapp, FaInstagram, FaFacebookF, FaMapMarkerAlt, FaArrowUp } from 'react-icons/fa';

const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
];

const services = ['Passport', 'Visa', 'Flights', 'Insurance'];

const socialLinks = [
    { icon: FaWhatsapp, href: 'https://wa.me/919820446490', color: '#25D366' },
    { icon: FaInstagram, href: '#', color: '#E4405F' },
    { icon: FaFacebookF, href: '#', color: '#1877F2' },
];

export default function Footer() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });
    const currentYear = new Date().getFullYear();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer
            ref={ref}
            style={{
                backgroundColor: '#0f172a',
                color: '#ffffff',
                padding: '48px 0 24px',
                position: 'relative',
            }}
        >
            <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
                {/* Main Footer Content */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6 }}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '32px',
                        paddingBottom: '32px',
                        borderBottom: '1px solid rgba(255,255,255,0.1)',
                    }}
                >
                    {/* Brand */}
                    <div>
                        <Link href="#home" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', textDecoration: 'none' }}>
                            <motion.div
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.5 }}
                                style={{ position: 'relative', width: '44px', height: '44px', backgroundColor: '#ffffff', borderRadius: '10px', padding: '4px' }}
                            >
                                <Image src="/logo.png" alt="Bernice Tours" fill className="object-contain" />
                            </motion.div>
                            <div>
                                <h3 style={{ fontWeight: '700', color: '#ffffff', fontSize: '1rem' }}>Bernice Tours</h3>
                                <p style={{ fontSize: '12px', color: '#94a3b8' }}>N Travels</p>
                            </div>
                        </Link>
                        <p style={{ color: '#94a3b8', fontSize: '13px', lineHeight: '1.7', marginBottom: '16px' }}>
                            Your trusted partner for passport, visa & travel services since 2009.
                        </p>
                        {/* Social Icons */}
                        <div style={{ display: 'flex', gap: '10px' }}>
                            {socialLinks.map((social, index) => (
                                <motion.a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1, backgroundColor: social.color }}
                                    style={{
                                        width: '36px',
                                        height: '36px',
                                        borderRadius: '8px',
                                        backgroundColor: '#1e293b',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#ffffff',
                                        textDecoration: 'none',
                                    }}
                                >
                                    <social.icon size={16} />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 style={{ fontWeight: '600', color: '#ffffff', marginBottom: '16px', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            Quick Links
                        </h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {quickLinks.map((link) => (
                                <li key={link.name} style={{ marginBottom: '10px' }}>
                                    <Link href={link.href} style={{ color: '#94a3b8', fontSize: '13px', textDecoration: 'none' }}>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 style={{ fontWeight: '600', color: '#ffffff', marginBottom: '16px', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            Services
                        </h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {services.map((service) => (
                                <li key={service} style={{ marginBottom: '10px' }}>
                                    <Link href="#services" style={{ color: '#94a3b8', fontSize: '13px', textDecoration: 'none' }}>
                                        {service}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 style={{ fontWeight: '600', color: '#ffffff', marginBottom: '16px', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            Contact
                        </h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            <li style={{ marginBottom: '10px' }}>
                                <a href="tel:+919152510738" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#94a3b8', fontSize: '13px', textDecoration: 'none' }}>
                                    <FaPhone size={12} style={{ color: '#f59e0b' }} /> 9152510738
                                </a>
                            </li>
                            <li style={{ marginBottom: '10px' }}>
                                <a href="https://wa.me/919820446490" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#94a3b8', fontSize: '13px', textDecoration: 'none' }}>
                                    <FaWhatsapp size={14} style={{ color: '#f59e0b' }} /> 9820446490
                                </a>
                            </li>
                            <li style={{ marginBottom: '10px' }}>
                                <a href="mailto:bernicepassport@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#94a3b8', fontSize: '13px', textDecoration: 'none' }}>
                                    <FaEnvelope size={12} style={{ color: '#f59e0b' }} /> Email Us
                                </a>
                            </li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#94a3b8', fontSize: '13px' }}>
                                <FaMapMarkerAlt size={12} style={{ color: '#f59e0b' }} /> Mumbai, India
                            </li>
                        </ul>
                    </div>
                </motion.div>

                {/* Bottom Bar */}
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                    paddingTop: '24px',
                }}>
                    <p style={{ color: '#64748b', fontSize: '13px' }}>
                        © {currentYear} Bernice Tours N Travels
                    </p>
                    <p style={{ color: '#64748b', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        Made with
                        <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }}>
                            <FaHeart style={{ color: '#ef4444' }} size={12} />
                        </motion.span>
                        in Mumbai
                    </p>
                </div>

                {/* Scroll to Top */}
                <motion.button
                    onClick={scrollToTop}
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                        position: 'absolute',
                        right: '20px',
                        bottom: '24px',
                        width: '40px',
                        height: '40px',
                        borderRadius: '10px',
                        background: 'linear-gradient(135deg, #f59e0b, #f97316)',
                        border: 'none',
                        color: '#ffffff',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <FaArrowUp size={16} />
                </motion.button>
            </div>
        </footer>
    );
}
