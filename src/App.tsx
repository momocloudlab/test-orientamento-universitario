import React, { useState, useMemo } from 'react';
import { 
  GraduationCap, Target, Search, BarChart, 
  CheckCircle2, ChevronRight, Printer, Send, Sparkles
} from 'lucide-react';

export default function UniOrientationApp() {
  const [step, setStep] = useState<'welcome' | 'user-info' | 'test' | 'result'>('welcome');
  const [userData, setUserData] = useState({ name: '', email: '' });
  const [currentIdx, setCurrentIdx] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({ Consapevolezza: 0, Esplorazione: 0, Pianificazione: 0 });

  const questions = [
    { id: 1, text: "Ho riflettuto a fondo su quali siano i miei veri interessi professionali", dim: "Consapevolezza" },
    { id: 2, text: "Conosco i miei punti di forza e le materie in cui rendo meglio", dim: "Consapevolezza" },
    { id: 3, text: "So quali valori sono importanti per me nel mio futuro lavoro", dim: "Consapevolezza" },
    { id: 4, text: "Ho cercato informazioni dettagliate sui piani di studio di diversi corsi di laurea", dim: "Esplorazione" },
    { id: 5, text: "Ho partecipato a Open Day o incontri di orientamento universitario", dim: "Esplorazione" },
    { id: 6, text: "Ho parlato con studenti o professionisti che lavorano nel settore che mi interessa", dim: "Esplorazione" },
    { id: 7, text: "Ho già verificato quali sono le modalità di accesso (test, graduatorie) dei corsi", dim: "Pianificazione" },
    { id: 8, text: "Ho un piano chiaro dei passi da fare dopo l'esame di maturità", dim: "Pianificazione" },
    { id: 9, text: "Mi sento capace di gestire lo studio autonomo richiesto dall'università", dim: "Pianificazione" },
    { id: 10, text: "So quali sono gli sbocchi occupazionali dei corsi che sto valutando", dim: "Consapevolezza" },
    { id: 11, text: "Ho valutato attentamente i costi e l'organizzazione della vita universitaria", dim: "Esplorazione" },
    { id: 12, text: "Ho già scelto almeno due o tre opzioni valide per il mio futuro", dim: "Pianificazione" }
  ];

  const profiles: any = {
    Consapevolezza: { 
      title: "Il Riflessivo", 
      desc: "Hai un'ottima connessione con i tuoi desideri e i tuoi talenti. Sai cosa ti piace, ma forse ti mancano dati pratici. La tua bussola interna funziona bene, devi solo tararla sul mondo esterno.", 
      tip: "È il momento di uscire dalla teoria: vai agli Open Day e confronta i tuoi sogni con i piani di studio reali.", 
      icon: <Target />, color: "#701a75" 
    },
    Esplorazione: { 
      title: "L'Esploratore Attivo", 
      desc: "Sei un cercatore di informazioni instancabile. Conosci ogni corso di laurea, ma rischi la 'paralisi da analisi'. Hai tanti dati, ora devi capire quali risuonano davvero con te.", 
      tip: "Smetti di raccogliere brochure per un attimo e chiediti: 'Quale di queste strade mi fa battere il cuore?'.", 
      icon: <Search />, color: "#4f46e5" 
    },
    Pianificazione: { 
      title: "Lo Stratega", 
      desc: "Sei già proiettato al 'dopo'. Test d'ingresso e logistica non ti spaventano. Assicurati solo che questa tua efficienza sia al servizio di una passione reale e non solo di un calcolo di convenienza.", 
      tip: "Usa la tua dote organizzativa per mappare anche le tue emozioni, non solo le scadenze burocratiche.", 
      icon: <BarChart />, color: "#d946ef" 
    }
  };

  const handleAnswer = (val: number) => {
    const dim = questions[currentIdx].dim;
    setScores(prev => ({ ...prev, [dim]: prev[dim] + val }));
    if (currentIdx < questions.length - 1) setCurrentIdx(currentIdx + 1);
    else setStep('result');
  };

  const dominant = useMemo(() => Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b), [scores, step]);

  const sendEmail = () => {
    const subject = encodeURIComponent(`Report Orientamento Universitario - ${userData.name}`);
    const body = encodeURIComponent(`Ciao ${userData.name},\n\necco il tuo profilo di maturità orientativa:\n\nPROFILO: ${profiles[dominant].title}\n${profiles[dominant].desc}\n\nCONSIGLIO: ${profiles[dominant].tip}`);
    window.location.href = `mailto:${userData.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="app-wrapper">
      <style>{`
        .app-wrapper { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #FDFBFE; font-family: 'Segoe UI', Roboto, sans-serif; padding: 20px; }
        .card { max-width: 750px; width: 100%; background: white; border-radius: 45px; box-shadow: 0 40px 80px rgba(112,26,117,0.12); overflow: hidden; border: 1px solid #f3e8ff; }
        .content { padding: 50px; text-align: center; }
        .icon-header { background: #701a75; color: white; padding: 25px; border-radius: 28px; display: inline-flex; margin-bottom: 30px; rotate: -2deg; }
        h1 { color: #0f172a; font-size: 45px; font-weight: 900; margin: 0; letter-spacing: -2px; }
        .text-accent { color: #701a75; }
        .subtitle { color: #64748b; font-size: 19px; margin: 25px 0 45px; line-height: 1.6; }
        .btn-main { background: #1e293b; color: white; width: 100%; padding: 22px; border-radius: 22px; font-weight: 800; font-size: 18px; border: none; cursor: pointer; transition: all 0.3s; }
        .btn-main:hover { background: #701a75; transform: translateY(-2px); }
        .input-field { width: 100%; padding: 20px; background: #f8fafc; border: 2px solid transparent; border-radius: 22px; margin-bottom: 15px; font-size: 16px; outline: none; box-sizing: border-box; }
        .likert-btn { width: 100%; text-align: left; padding: 22px; background: white; border: 2px solid #f1f5f9; border-radius: 22px; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
        .likert-btn:hover { border-color: #701a75; background: #faf5ff; }
        .progress-fill { height: 8px; background: #701a75; transition: width 0.4s; }
        .result-box { background: #0f172a; color: white; padding: 45px; border-radius: 40px; margin: 30px 0; text-align: left; }
        .tip-box { background: #f5f3ff; border-left: 5px solid #701a75; padding: 20px; border-radius: 15px; color: #4c1d95; margin-top: 20px; }
        @media print { .no-print { display: none; } }
      `}</style>

      <div className="card">
        {step === 'test' && <div className="progress-fill" style={{ width: `${((currentIdx + 1) / 12) * 100}%` }}></div>}

        <div className="content">
          {step === 'welcome' && (
            <div>
              <div className="icon-header"><GraduationCap size={45} /></div>
              <h1>Pronto per<br/><span className="text-accent">l'Università?</span></h1>
              <p className="subtitle">Scopri la tua "Maturità di Scelta" con il test basato sul modello Pombeni-Guglielmi. Pochi minuti per un futuro più chiaro.</p>
              <button onClick={() => setStep('user-info')} className="btn-main">Inizia l'Analisi</button>
            </div>
          )}

          {step === 'user-info' && (
            <div>
              <h2 style={{fontSize: '36px', fontWeight: '900'}}>Piacere di conoscerti!</h2>
              <p className="subtitle">Inserisci i tuoi dati per ricevere il report di orientamento.</p>
              <input type="text" placeholder="Il tuo nome" className="input-field" value={userData.name} onChange={e => setUserData({...userData, name: e.target.value})} />
              <input type="email" placeholder="La tua email" className="input-field" value={userData.email} onChange={e => setUserData({...userData, email: e.target.value})} />
              <button disabled={!userData.name || !userData.email} onClick={() => setStep('test')} className="btn-main" style={{opacity: !userData.name ? 0.3 : 1}}>Vai al Test</button>
            </div>
          )}

          {step === 'test' && (
            <div style={{textAlign: 'left'}}>
              <span style={{color: '#701a75', fontWeight: '900', fontSize: '12px', textTransform: 'uppercase'}}>Maturità di Scelta - Domanda {currentIdx + 1} di 12</span>
              <h2 style={{fontSize: '28px', margin: '15px 0 30px', lineHeight: '1.3'}}>{questions[currentIdx].text}?</h2>
              {["Per nulla", "Poco", "In parte", "Moltissimo"].map((label, i) => (
                <button key={i} onClick={() => handleAnswer(i + 1)} className="likert-btn">
                  <span style={{fontWeight: '700', color: '#334155'}}>{label}</span>
                  <ChevronRight size={20} color="#701a75" />
                </button>
              ))}
            </div>
          )}

          {step === 'result' && (
            <div>
              <CheckCircle2 size={60} color="#22c55e" style={{marginBottom: '20px', margin: '0 auto'}} />
              <h1 style={{marginTop: '20px'}}>Analisi per {userData.name}</h1>
              <div className="result-box">
                <div style={{display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px'}}>
                  <div style={{background: 'white', color: '#0f172a', padding: '10px', borderRadius: '12px'}}>{profiles[dominant].icon}</div>
                  <h3 style={{fontSize: '28px', margin: 0}}>{profiles[dominant].title}</h3>
                </div>
                <p style={{fontSize: '18px', lineHeight: '1.7', color: '#cbd5e1'}}>{profiles[dominant].desc}</p>
                <div className="tip-box"><strong>💡 Prossimo passo:</strong> {profiles[dominant].tip}</div>
              </div>
              <div style={{display: 'flex', gap: '15px'}} className="no-print">
                <button onClick={() => window.print()} className="btn-main" style={{flex: 1}}>Salva PDF</button>
                <button onClick={sendEmail} className="btn-main" style={{flex: 1, background: 'white', color: '#1e293b', border: '2px solid #f1f5f9'}}>Email</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
