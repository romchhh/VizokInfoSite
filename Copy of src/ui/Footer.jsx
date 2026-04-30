import React from 'react';
import { FaInstagram, FaTelegram } from 'react-icons/fa';

function Footer() {
    return (
        <footer className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 text-white py-8 mt-10">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4 md:px-0">
                {/* Branding Section */}
                <div className="mb-6 md:mb-0 text-center md:text-left">
                    <h2 className="text-2xl font-bold">Vizok</h2>
                    <p className="text-gray-400 mt-2">Ваш партнер у світі поїздок</p>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-col md:flex-row md:space-x-8 text-center md:text-left mb-6 md:mb-0">
                    <a href="#" className="hover:text-gray-300 transition-colors">Головна</a>
                    <a href="#portfolio" className="hover:text-gray-300 transition-colors">Розіграші</a>
                    <a href="#about" className="hover:text-gray-300 transition-colors">Про нас</a>
                </div>

                {/* Social Media Links */}
                <div className="text-center md:text-right">
                    <h3 className="text-lg font-semibold">Слідкуйте за нами</h3>
                    <div className="flex justify-center md:justify-end space-x-4 mt-2">
                        <a href="https://www.instagram.com/vizok.info/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">
                            <FaInstagram size={24} />
                        </a>
                        <a href="https://t.me/VizokUAbot" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">
                            <FaTelegram size={24} />
                        </a>
                    </div>
                </div>
            </div>

            {/* Copyright Section */}
            <div className="text-center mt-8">
                <p className="text-gray-500 text-sm">©2024 Vizok. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
