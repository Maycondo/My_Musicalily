import Aurora from './Aurora';

import Navigation from '@/Componentes/Navigation/Navigation';


export default function Home() {
  return (
    <div>
      <Aurora colorStops={["#0fb809", "#21c201", "#28a103"]} blend={10.0} amplitude={2.0} speed={2.0}/>
        <div className='Main-panel'>
          <Navigation />
        </div>
    </div>
  );
}

