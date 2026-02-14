import React, { useState } from 'react';
import { Sparkles, Cloud, Sun, Coffee, Zap } from 'lucide-react';

const AIRecommend = () => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({ mood: '', weather: '', taste: '' });

  const recommendations = {
    'energetic-sunny-strong': { name: 'Double Nitro Cold Brew', desc: 'Maximum power for a bright day.' },
    'chill-rainy-sweet': { name: 'Salted Caramel Mocha', desc: 'Cozy vibes for the rain.' },
    // Add more logic mapping here
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 bg-cream flex flex-col items-center">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-5xl md:text-7xl font-oswald font-extrabold uppercase italic tracking-tighter mb-8 text-[#3E2723]">
          The <span className="text-gold animate-pulse">Oracle</span> Speaks
        </h1>
        
        {step === 1 && (
          <div className="animate-fade-up">
            <p className="text-2xl mb-8 font-bold">What's the vibe today?</p>
            <div className="grid grid-cols-2 gap-4">
              {['Energetic', 'Chill', 'Stressed', 'Sleepy'].map(m => (
                <button key={m} onClick={() => { setAnswers({...answers, mood: m}); setStep(2); }} 
                  className="p-6 border-2 border-[#3E2723] hover:bg-gold hover:text-white transition-all font-black uppercase italic">
                  {m}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Add steps for Weather and Taste similarly... */}
      </div>
    </div>
  );
};

export default AIRecommend;