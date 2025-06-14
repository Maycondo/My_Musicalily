"use client"
import Aurora from './Aurora';
import React, { useEffect, useState } from 'react';
import Navigation from '@/Componentes/Navigation/Navigation';
import DecryptedText from '@/Componentes/Animetiontexto/DecryptedText';
import SplitText from '@/Componentes/Animetiontexto/SplitText';

import Loading from '@/Componentes/Loading/Loading';

  const useLoading = (display: number) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => setLoading(false), display);
      return () => clearTimeout(timer);
    }, [display]);

    return loading;
  }

export default function Home() {
  const loading = useLoading(3000);

  if(loading) {
    return <Loading></Loading>
  }


  return (
<div>
  <Aurora colorStops={["#0fb809", "#21c201", "#28a103"]} blend={10.0} amplitude={2.0} speed={2.0}/>
    <div className='Panel-project'>
      <Navigation />
      <SplitText />
      <DecryptedText
        text="Ouça sem limites. Experimente 1 mês de Premium Individual por R$ 0."
        className="revealed"
      />
    </div>
</div>
  );
}

