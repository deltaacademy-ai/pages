import { useEffect, useState } from 'react';
import { submitToHubspot } from '../lib/hubspot.js';
import { trackEvent } from '../lib/tracking.js';
import {
  employeeRanges, revenueRanges, sectors,
  mainChallenges, priorityAreas, initialFormState,
} from '../data/formOptions.js';

const FIELD_REQUIRED = [
  'firstName','role','companyName','employeesRange','revenueRange',
  'email','whatsapp','sector','mainChallenge','priorityArea',
];

const TRACK_NAME = {
  firstName: 'nome', role: 'cargo', companyName: 'nome_empresa',
  employeesRange: 'funcionarios', revenueRange: 'faturamento',
  email: 'email', whatsapp: 'whatsapp', sector: 'setor',
  mainChallenge: 'obstaculo', priorityArea: 'area_prioritaria',
};

const REDIRECT = 'https://tutoriais.deltaacademy.ai/ai-talks/confirme.html';

const inputClass =
  'w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20';

function Field({ label, full, children }) {
  return (
    <label className={`block text-sm${full ? ' sm:col-span-2' : ''}`}>
      <span className="mb-1 block font-medium text-slate-700">{label}</span>
      {children}
    </label>
  );
}

function Select({ value, onChange, options, placeholder, onBlur }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
      className={inputClass}
      style={{ appearance: 'none', backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.6rem center', paddingRight: '2rem' }}
    >
      <option value="" disabled>{placeholder}</option>
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}

export default function LeadFormCard() {
  const [form, setForm] = useState(initialFormState);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const update = (patch) => setForm((f) => ({ ...f, ...patch }));
  const trackBlur = (key) => {
    if (form[key]) trackEvent({ event: 'radar_campo_preenchido', campo: TRACK_NAME[key] });
  };

  useEffect(() => { trackEvent({ event: 'radar_formulario_view' }); }, []);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    const missing = FIELD_REQUIRED.filter((f) => !form[f]);
    if (missing.length) {
      setError('Preencha todos os campos para liberar o acesso.');
      return;
    }
    trackEvent({ event: 'radar_formulario_submit' });
    setSubmitting(true);
    try {
      await submitToHubspot(form);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
      window.location.href = REDIRECT;
    }
  };

  return (
    <form onSubmit={submit} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg lg:p-8">
      <h2 className="text-lg font-bold text-slate-900">Acesse o conteúdo gratuitamente</h2>
      <p className="mt-1 text-sm text-slate-500">Preencha os campos abaixo para liberar o acesso imediato</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">

        <Field label="Nome">
          <input type="text" value={form.firstName} placeholder="Ex: Maria" className={inputClass}
            onChange={(e) => update({ firstName: e.target.value })}
            onBlur={() => trackBlur('firstName')} />
        </Field>

        <Field label="Cargo">
          <input type="text" value={form.role} placeholder="Ex: CEO" className={inputClass}
            onChange={(e) => update({ role: e.target.value })}
            onBlur={() => trackBlur('role')} />
        </Field>

        <Field label="Nome da empresa" full>
          <input type="text" value={form.companyName} placeholder="Ex: Delta Academy" className={inputClass}
            onChange={(e) => update({ companyName: e.target.value })}
            onBlur={() => trackBlur('companyName')} />
        </Field>

        <Field label="Funcionários">
          <Select value={form.employeesRange} onChange={(v) => update({ employeesRange: v })}
            onBlur={() => trackBlur('employeesRange')}
            options={employeeRanges} placeholder="Selecione a faixa" />
        </Field>

        <Field label="Faixa de faturamento anual">
          <Select value={form.revenueRange} onChange={(v) => update({ revenueRange: v })}
            onBlur={() => trackBlur('revenueRange')}
            options={revenueRanges} placeholder="Selecione a faixa" />
        </Field>

        <Field label="E-mail">
          <input type="email" value={form.email} placeholder="nome@empresa.com" className={inputClass}
            onChange={(e) => update({ email: e.target.value })}
            onBlur={() => trackBlur('email')} />
        </Field>

        <Field label="WhatsApp">
          <input type="text" value={form.whatsapp} placeholder="(11) 99999-9999" className={inputClass}
            onChange={(e) => update({ whatsapp: e.target.value })}
            onBlur={() => trackBlur('whatsapp')} />
        </Field>

        <Field label="Setor">
          <Select value={form.sector} onChange={(v) => update({ sector: v })}
            onBlur={() => trackBlur('sector')}
            options={sectors} placeholder="Selecione o setor" />
        </Field>

        <Field label="Maior obstáculo hoje">
          <Select value={form.mainChallenge} onChange={(v) => update({ mainChallenge: v })}
            onBlur={() => trackBlur('mainChallenge')}
            options={mainChallenges} placeholder="Selecione o obstáculo" />
        </Field>

        <Field label="Área prioritária para aplicar IA" full>
          <Select value={form.priorityArea} onChange={(v) => update({ priorityArea: v })}
            onBlur={() => trackBlur('priorityArea')}
            options={priorityAreas} placeholder="Selecione a prioridade" />
        </Field>

      </div>

      {error && <p className="mt-4 text-sm font-medium text-rose-600">{error}</p>}

      <div className="mt-8 flex justify-end">
        <button type="submit" disabled={submitting}
          className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition disabled:cursor-not-allowed disabled:opacity-60"
          style={{ backgroundColor: '#0E1815' }}
          onMouseEnter={(e) => { if (!submitting) e.currentTarget.style.backgroundColor = '#1a2e25'; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#0E1815'; }}>
          {submitting ? 'Enviando...' : 'Liberar meu acesso'}
          {!submitting && (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          )}
        </button>
      </div>

      <p className="mt-4 text-center text-xs text-slate-400">Seus dados são protegidos · AI Talks 2026</p>
    </form>
  );
}
