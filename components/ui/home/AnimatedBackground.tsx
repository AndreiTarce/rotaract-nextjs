"use client"
import NET from 'vanta/src/vanta.net'
import { useEffect, useState, useRef } from 'react'
import * as THREE from 'three'

export default function AnimatedBackground() {
    const [vantaEffect, setVantaEffect] = useState(0);
    const vantaRef = useRef(null);

    useEffect(() => {
        if (!vantaEffect) {
            setVantaEffect(
                NET({
                    el: vantaRef.current,
                    THREE: THREE,
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 600.0,
                    minWidth: 600.0,
                    scale: 1.0,
                    scaleMobile: 1.0,
                    color: 0xd41367,
                    backgroundColor: 0x020817,
                })
            );
        }
        return () => {
            if (vantaEffect) vantaEffect.destroy();
        };
    }, [vantaEffect]);
    return (
        <div ref={vantaRef} className='absolute top-0 w-full h-screen'>
        </div >
    );
};