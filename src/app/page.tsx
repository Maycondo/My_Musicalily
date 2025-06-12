import Aurora from './Aurora';
  


export default function Home() {
  return (
    <div>
      <Aurora colorStops={["#086b05", "#196e08", "#155302"]} blend={1.0} amplitude={1.5} speed={1.5}/>
      
    </div>
  );
}
