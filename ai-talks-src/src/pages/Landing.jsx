import LeadFormCard from '../components/LeadFormCard';

const BENEFITS = [
  'Sales AI-Stack completo — as 5 camadas de ferramentas usadas hoje em vendas',
  'Sales AI-Daily — a rotina hora a hora de uma operação de vendas AI-First',
  'Os 3 Fluxos AI-First com KPIs de referência',
  'Cases reais com números — Nestlé, Spreed e Azul Cargo',
  'Roteiro de implementação em 3 fases — do Quick Win à Autonomia',
  'As 6 armadilhas que destroem o ROI na adoção de IA em vendas',
];

export default function Landing() {
  return (
    <div className="min-h-screen" style={{ fontFamily: 'Inter, sans-serif' }}>

      {/* Header */}
      <header style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-6 py-4">
          <img src="https://tutoriais.deltaacademy.ai/ai-talks/logo.png" alt="AI Talks" className="h-14 w-auto" />
        </div>
      </header>

      {/* Main grid */}
      <section className="mx-auto grid max-w-6xl gap-12 px-6 pb-16 pt-2 lg:grid-cols-[1.1fr_1fr] lg:pb-24 lg:pt-4">

        {/* Coluna esquerda */}
        <div className="flex flex-col justify-center">
          <span
            className="inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold"
            style={{ border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.75)', background: 'rgba(255,255,255,0.07)' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
            Material exclusivo 
          </span>

          <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight md:text-5xl" style={{ color: '#ffffff' }}>
            Conteúdo pensado para profissionais que querem{' '}
            <span style={{ color: '#7EC8A4' }}>resultado real.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Acesse os materiais exclusivos da palestra Gui Junqueira no AI Talks e leve para o seu negócio os frameworks, cases e roteiros usados por empresas AI-First.
          </p>

          <ul className="mt-8 flex flex-col gap-3 text-sm">
            {BENEFITS.map((b) => (
              <li key={b} className="flex items-start gap-2" style={{ color: 'rgba(255,255,255,0.75)' }}>
                <span
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                  style={{ background: 'rgba(126,200,164,0.15)', border: '1px solid rgba(126,200,164,0.3)', color: '#7EC8A4' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </span>
                {b}
              </li>
            ))}
          </ul>

        </div>

        {/* Coluna direita — formulário inalterado */}
        <LeadFormCard />

      </section>

      {/* Rodapé — abaixo do form em mobile e desktop */}
      <div className="mx-auto max-w-6xl px-6 pb-10" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem' }}>
        <div className="flex items-center gap-3">
          <img src="https://tutoriais.deltaacademy.ai/ai-talks/logo.png" alt="AI Talks" className="h-6 w-auto" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.4)' }}>AI Talks · 12/05/2026</p>
            <p className="text-sm font-bold" style={{ color: 'rgba(255,255,255,0.8)' }}>by Delta Academy</p>
          </div>
        </div>
      </div>

    </div>
  );
}
