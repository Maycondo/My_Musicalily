import React from 'react';
import './Cardlogin.css'; 
import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";

interface CardLoginProps {
    onClose: () => void;
}

export default function CardLogin({ onClose }: CardLoginProps) {
    return (
        <div className="Card-backdrop-filter" >
            <motion.div 
                className="Conteiner-CardLogin"
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(10px)" }}
                transition={{ duration: 0.5 }}
            >
            <motion.button type="button" onClick={onClose} className="Button-close" aria-label="Close" whileHover={{ scale: 1.2, rotate: 90 }} whileTap={{ scale: 0.9 }}>
                <IoClose className="Icon-close" />
            </motion.button>
            <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
            <form>
                <motion.div className="mb-4" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                    <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter your username"
                    />
                </motion.div>

                <motion.div className="mb-6" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} >
                    <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                        Password
                    </label>
                    <input type="password" id="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter your password" />
                </motion.div>

                <motion.button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} >
                    Login
                </motion.button>
            </form>
        </motion.div>
        </div>
    );
}
