"use client"
import Aurora from './Aurora';
import React, { useEffect, useState } from 'react';
import LoginCard from '@/Componentes/Barralogin/Login';
import DecryptedText from '@/Componentes/Animetiontexto/DecryptedText';
import SplitText from '@/Componentes/Animetiontexto/SplitText';
import CarrouselArtitas from '@/Componentes/CarrouselArtista/CarrouselArtista';

import Loading from '@/Componentes/Loading/Loading';

  const useLoading = (display: number) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => setLoading(false), display);
      return () => clearTimeout(timer);
    }, [display]);

    return loading;
  }

  const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};

  export default function Home() {
  const loading = useLoading(3000);

  if(loading) {
    return <Loading></Loading>
  }


  return (
      <div className='Panel-principal' >
        <Aurora colorStops={["#0fb809", "#21c201", "#28a103"]} blend={15.0} amplitude={6.0} speed={2.0}/>
         <LoginCard />
          <div>
            <div className='text-Musicalily'>
              <SplitText text="Musicalily, Spotify!" className="text-Musicalily" delay={100} duration={0.6} ease="power3.out" splitType="chars" from={{ opacity: 0, y: 40 }} to={{ opacity: 1, y: 0 }} threshold={0.1} rootMargin="-100px" textAlign="center" onLetterAnimationComplete={handleAnimationComplete}/>
            </div>
            <div className='min-text'>
              <DecryptedText
                text="Uma forma simples e prática de ouvir suas músicas favoritas.
                  Descubra novos sons, crie playlists personalizadas e aproveite cada momento com a trilha sonora perfeita.
                  Tudo isso em uma plataforma rápida, intuitiva e feita para quem ama música de verdade.
                  Dê o play e sinta a vibe!"
                className="revealed"
              />
            </div>
              <CarrouselArtitas />
          </div>
      </div>
  );
}

