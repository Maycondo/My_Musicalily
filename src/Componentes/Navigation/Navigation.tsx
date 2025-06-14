
"use client";
import React, { useState } from 'react';
import CardLogin from '../CardLogin/Cardlogin';
import { AnimatePresence } from 'framer-motion';
import './Navigationbar.css';
// ...restante do código


export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    return (
        <>
            <nav className="navigation-bar">
                <div >
                    <button className="navigation-button" onClick={toggleMenu}>
                        <span className="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fff" viewBox="0 0 496 512">
                            <path d="M248 8C111 8 0 119 0 256c0 137.2 111 248 248 248s248-110.8 248-248C496 119 385 8 248 8zM363.9 372.3c-4.2 6.9-13.2 9-20.1 4.8-55.2-33.7-124.8-41.4-207.3-22.9-7.7 1.7-15.3-3.1-17-10.8-1.7-7.7 3.1-15.3 10.8-17 93.4-20.6 172.8-11.4 237.8 26.7 6.8 4.2 8.9 13.2 4.8 20.2zm27.1-65.3c-5.2 8.4-16.3 11-24.7 5.8-63.3-38.6-159.8-49.8-234.5-27.5-9.3 2.8-19.2-2.4-22-11.7-2.8-9.3 2.4-19.2 11.7-22 87.6-26.4 196.8-14 269.6 31.8 8.4 5.2 11 16.3 5.9 24.6zM388.4 238c-74.4-45.5-197.6-49.6-269.2-27.3-11.2 3.4-23.1-2.7-26.6-13.9-3.4-11.2 2.7-23.1 13.9-26.6 82.2-25.3 222.6-20.6 308.2 33.3 10 6.1 13.2 19.3 7.1 29.3-6.1 10.1-19.4 13.3-29.4 5.2z"/>
                        </svg>
                        </span>
                        <span>Spotify</span>
                    </button>
                </div>
            </nav>
            {isOpen && (
                <AnimatePresence mode="wait">
                    <CardLogin onClose={() => setIsOpen(false)} />
                </AnimatePresence>
            )}
        </>
    )   
}