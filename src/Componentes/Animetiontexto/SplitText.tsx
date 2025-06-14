"use client"

import { motion } from "framer-motion"
import { animate, stagger } from "motion"
import { splitText } from "motion-plus"
import { useEffect, useRef } from "react"

export default function WavyText() {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        document.fonts.ready.then(() => {
            if (!containerRef.current) return

            const { chars } = splitText(
                containerRef.current.querySelector(".wavy")!
            )
            containerRef.current.style.visibility = "visible"

            const staggerDelay = 0.15

            animate(
                chars,
                { y: [-20, 20] },
                {
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                    duration: 2,
                    delay: stagger(
                        staggerDelay,
                        { startDelay: -staggerDelay * chars.length }
                    ),
                }
            )
        })
    }, [])

    return (
        <div className="container" ref={containerRef}>
            <motion.h1
            className="h1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
>
                Spotify <span className="wavy">Premium</span>.
            </motion.h1>
            <Stylesheet />
        </div>
    )
}

function Stylesheet() {
    return (
        <style>{`
            .container {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                margin: 6rem 12rem;
                visibility: hidden;
            }

            .h1 {
                font-size: 5rem;
                font-weight: bold;
                font-family: "Poppins", sans-serif;
                color: #fff;
                text-align: center;
                margin: 0;
            }

            .split-char {
                will-change: transform, opacity;
            }
        `}</style>
    )
}






