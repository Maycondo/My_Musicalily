"use client"

import { animate, stagger } from "motion"
import { splitText } from "motion-plus"
import { useEffect, useRef } from "react"

export default function SplitText() {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        document.fonts.ready.then(() => {
            if (!containerRef.current) return


            containerRef.current.style.visibility = "visible"

            const { words } = splitText(
                containerRef.current.querySelector("h1")!
            )

            animate(
                words,
                { opacity: [0, 1], y: [10, 0] },
                {
                    type: "spring",
                    duration: 2,
                    bounce: 0,
                    delay: stagger(0.05),
                }
            )
        })
    }, [])

    return (
        <div className="container" ref={containerRef}>
            <h1 className="h1">
                A smarter, more practical way to enjoy your favorite music.
            </h1>
            <Stylesheet />
        </div>
    )
}

function Stylesheet() {
    return (
        <style>{`
            .container {
                position: relative;
                margin: 17rem 0;
                padding: 2rem;
                display: flex;
                justify-content: center;
                align-items: center;
                max-width: 75rem;
                text-align: left;
                visibility: hidden;
            }
            .h1 {
                font-size: 8rem;
                line-height: 0.9;
                font-family: 'Roboto Mono', monospace;
                
                font-weight: bold;
                margin: 0;
                color: #ffffff;
            }

            .split-word {
                will-change: transform, opacity;
            }
        `}</style>
    )
}
