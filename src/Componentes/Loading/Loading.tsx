"use client"
import React from 'react';
import './Loading.css';



export default function LoadingCircleSpinner() {
    return (
        <div className="load">
            <div className="progress"></div>
            <div className="progress"></div>
            <div className="progress"></div>
        </div>
    )
}

